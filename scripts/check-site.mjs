// End-to-end site checks against the production build.
//   npm run build && npm run check:site [-- <screenshot-dir>]
//
// Starts `vite preview`, then for every route at phone / tablet / desktop
// widths checks: no horizontal overflow, no console errors, images load,
// internal links and hash targets resolve. Also checks the mobile menu,
// keyboard focus visibility, reduced motion, and that the phone number is
// not rendered while hidden.
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const PORT = 4179
const BASE = `http://localhost:${PORT}`
const shotDir = process.argv[2]
if (shotDir) mkdirSync(shotDir, { recursive: true })

const slugs = [
  'moneyplant', 'recall', 'smartapp-mobile-inventory', 'smartschoolapi', 'smartsuite-erp',
  'online-payment-enrollment', 'ecommerce-applications', 'gopath', 'taxgenie',
]
const routes = ['/', '/projects', ...slugs.map((s) => `/projects/${s}`)]
const widths = [
  ['phone', 360, 780],
  ['tablet', 768, 1024],
  ['desktop', 1280, 860],
]

const failures = []
const fail = (msg) => {
  failures.push(msg)
  console.log(`  ✗ ${msg}`)
}
const ok = (msg) => console.log(`  ✓ ${msg}`)

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'])
    const timer = setTimeout(() => reject(new Error('preview did not start')), 20000)
    proc.stdout.on('data', (d) => {
      if (String(d).includes(String(PORT))) {
        clearTimeout(timer)
        resolve(proc)
      }
    })
    proc.stderr.on('data', (d) => process.stderr.write(d))
  })
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(150)
}

// Prefer Playwright's bundled Chromium; fall back to an installed Edge/Chrome
// so the check runs without `npx playwright install`.
async function launchBrowser() {
  for (const opts of [{}, { channel: 'msedge' }, { channel: 'chrome' }]) {
    try {
      return await chromium.launch(opts)
    } catch {
      // try the next option
    }
  }
  throw new Error('No browser available — run `npx playwright install chromium`.')
}

const browser = await launchBrowser()
const preview = await startPreview()
const internalLinks = new Set()
const externalLinks = new Set()

try {
  // ── Routes × widths ──────────────────────────────────────────────
  for (const [label, width, height] of widths) {
    console.log(`\n[${label} ${width}px]`)
    const context = await browser.newContext({ viewport: { width, height } })
    const page = await context.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))

    for (const route of routes) {
      errors.length = 0
      await page.goto(BASE + route, { waitUntil: 'networkidle' })
      await scrollThrough(page)

      const r = await page.evaluate(() => {
        const notFound = !!document.querySelector('h1')?.textContent?.includes('doesn’t exist')
        const overflow = document.documentElement.scrollWidth - window.innerWidth
        const wide = [...document.querySelectorAll('body *')]
          .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
          .filter((el) => !el.closest('[aria-hidden="true"], svg'))
          .slice(0, 3)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`)
        // Images hidden by CSS (display:none) are lazy and never load — not broken.
        const brokenImgs = [...document.images]
          .filter((i) => i.getClientRects().length > 0)
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src)
        const h1s = document.querySelectorAll('h1').length
        const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
        const ids = [...document.querySelectorAll('[id]')].map((e) => e.id)
        return { notFound, overflow, wide, brokenImgs, h1s, links, ids, text: document.body.innerText }
      })

      const tag = `${route} @${width}`
      if (r.notFound) fail(`${tag}: rendered NotFound`)
      if (r.overflow > 0) fail(`${tag}: horizontal overflow ${r.overflow}px ${r.wide.join(' | ')}`)
      if (r.brokenImgs.length) fail(`${tag}: broken images ${r.brokenImgs.join(', ')}`)
      if (r.h1s !== 1) fail(`${tag}: expected 1 <h1>, found ${r.h1s}`)
      if (errors.length) fail(`${tag}: console errors: ${errors.join(' | ')}`)
      if (/9544495694/.test(r.text)) fail(`${tag}: phone number rendered while hidden`)

      for (const href of r.links) {
        if (href.startsWith('#')) {
          if (href.length > 1 && !r.ids.includes(href.slice(1))) fail(`${tag}: missing hash target ${href}`)
        } else if (href.startsWith('/')) internalLinks.add(href)
        else if (/^https?:/.test(href)) externalLinks.add(href)
      }

      if (shotDir) {
        const name = route === '/' ? 'home' : route.replaceAll('/', '_').replace(/^_/, '')
        await page.screenshot({ path: `${shotDir}/${label}-${name}.png`, fullPage: true })
      }
    }
    if (!failures.some((f) => f.includes(`@${width}`))) ok(`${routes.length} routes clean (overflow, images, h1, console, phone)`)
    await context.close()
  }

  // ── Internal links + hash targets ────────────────────────────────
  console.log('\n[links]')
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 860 } })
    const page = await context.newPage()
    for (const href of internalLinks) {
      const [path, hash] = href.split('#')
      await page.goto(BASE + (path || '/'), { waitUntil: 'networkidle' })
      const res = await page.evaluate((h) => ({
        notFound: !!document.querySelector('h1')?.textContent?.includes('doesn’t exist'),
        hasHash: h ? !!document.getElementById(h) : true,
      }), hash)
      if (res.notFound) fail(`link ${href} → NotFound`)
      if (!res.hasHash) fail(`link ${href} → missing #${hash}`)
    }
    ok(`${internalLinks.size} unique internal links checked`)

    await page.goto(`${BASE}/this-does-not-exist`, { waitUntil: 'networkidle' })
    const nf = await page.evaluate(() => document.querySelector('h1')?.textContent ?? '')
    nf.includes('doesn’t exist') ? ok('unknown route shows NotFound') : fail('unknown route did not show NotFound')

    await page.goto(`${BASE}/projects/not-a-project`, { waitUntil: 'networkidle' })
    const nf2 = await page.evaluate(() => document.querySelector('h1')?.textContent ?? '')
    nf2.includes('doesn’t exist') ? ok('unknown project slug shows NotFound') : fail('unknown slug did not show NotFound')

    // Hash navigation from another page lands on the section.
    await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle' })
    await page.click('footer a[href="/#skills"]')
    await page.waitForTimeout(800)
    const top = await page.evaluate(() => document.getElementById('skills')?.getBoundingClientRect().top ?? 9999)
    Math.abs(top) < 120 ? ok('cross-page hash link scrolls to section') : fail(`cross-page hash link landed ${top}px from section`)
    await context.close()
  }
  console.log(`  external links found: ${[...externalLinks].join(', ')}`)

  // ── Mobile menu ──────────────────────────────────────────────────
  console.log('\n[mobile menu]')
  {
    const context = await browser.newContext({ viewport: { width: 360, height: 780 } })
    const page = await context.newPage()
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    const toggle = page.locator('button[aria-controls="mobile-menu"]')
    await toggle.click()
    ;(await toggle.getAttribute('aria-expanded')) === 'true' ? ok('toggle sets aria-expanded=true') : fail('aria-expanded not true')
    ;(await page.locator('#mobile-menu').isVisible()) ? ok('menu panel visible') : fail('menu panel not visible')
    const firstFocused = await page.evaluate(() => document.activeElement?.closest('#mobile-menu') !== null)
    firstFocused ? ok('focus moves into menu') : fail('focus did not move into menu')
    // Focus trap: tabbing many times stays within header.
    for (let i = 0; i < 12; i++) await page.keyboard.press('Tab')
    const trapped = await page.evaluate(() => !!document.activeElement?.closest('header'))
    trapped ? ok('focus is trapped while open') : fail('focus escaped open menu')
    await page.keyboard.press('Escape')
    ;(await page.locator('#mobile-menu').count()) === 0 ? ok('Escape closes menu') : fail('Escape did not close menu')
    const focusBack = await page.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'mobile-menu')
    focusBack ? ok('focus returns to toggle') : fail('focus did not return to toggle')
    await toggle.click()
    await page.click('#mobile-menu a[href="/#contact"]')
    await page.waitForTimeout(800)
    const closed = (await page.locator('#mobile-menu').count()) === 0
    const top = await page.evaluate(() => document.getElementById('contact')?.getBoundingClientRect().top ?? 9999)
    closed && Math.abs(top) < 120 ? ok('menu link closes menu and scrolls to section') : fail(`menu link: closed=${closed} top=${top}`)
    await context.close()
  }

  // ── Keyboard focus visibility ────────────────────────────────────
  console.log('\n[keyboard]')
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 860 } })
    const page = await context.newPage()
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    await page.keyboard.press('Tab')
    const skip = await page.evaluate(() => {
      const el = document.activeElement
      const r = el.getBoundingClientRect()
      return { text: el.textContent, visible: r.width > 1 && r.height > 1 }
    })
    skip.text?.includes('Skip') && skip.visible ? ok('first Tab shows skip link') : fail(`first Tab focused ${JSON.stringify(skip)}`)
    let missing = 0
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab')
      const s = await page.evaluate(() => {
        const cs = getComputedStyle(document.activeElement)
        return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0
      })
      if (!s) missing++
    }
    missing === 0 ? ok('25 tab stops all show a focus outline') : fail(`${missing}/25 tab stops without visible outline`)
    await context.close()
  }

  // ── Reduced motion ───────────────────────────────────────────────
  console.log('\n[reduced motion]')
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 860 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    const r = await page.evaluate(() => ({
      readyClass: document.documentElement.classList.contains('reveal-ready'),
      hidden: [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity !== '1').length,
    }))
    !r.readyClass && r.hidden === 0 ? ok('all content visible without animation') : fail(`reduced motion: ${JSON.stringify(r)}`)
    await context.close()
  }
} finally {
  await browser.close()
  preview.kill()
}

console.log(failures.length ? `\n${failures.length} FAILURE(S)` : '\nAll checks passed.')
process.exit(failures.length ? 1 : 0)
