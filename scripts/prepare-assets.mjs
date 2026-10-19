// Copies and optimises real product assets from the sibling product repos,
// and renders the portfolio's social-sharing image.
// Run once (or after updating screenshots): `node scripts/prepare-assets.mjs`
//
// MoneyPlant screenshots come from a seeded demo account
// (moneyplant/marketing/instagram/out/app-dashboard-scroll), never from the
// git-ignored `private/` folder that holds real-account recordings.
import sharp from 'sharp'
import { copyFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const MP = 'D:/Shihas/moneyplant'
const RC = 'D:/Shihas/Recall'
const OUT = 'src/assets'

await mkdir(`${OUT}/moneyplant`, { recursive: true })
await mkdir(`${OUT}/recall`, { recursive: true })

const screens = [
  ['00', 'dashboard'],
  ['27', 'budget-health'],
  ['54', 'daily-challenge'],
]

for (const [frame, name] of screens) {
  const src = `${MP}/marketing/instagram/out/app-dashboard-scroll/${frame}.jpg`
  if (!existsSync(src)) {
    console.warn(`missing ${src}`)
    continue
  }
  await sharp(src).resize({ width: 585 }).webp({ quality: 82 }).toFile(`${OUT}/moneyplant/${name}.webp`)
  console.log(`moneyplant/${name}.webp`)
}

await copyFile(`${MP}/public/favicon.svg`, `${OUT}/moneyplant/logo.svg`)
await copyFile(`${RC}/public/pwa.svg`, `${OUT}/recall/logo.svg`)

// Social card: simple, text-only, no product screenshots.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="80%" cy="10%" r="80%">
      <stop offset="0%" stop-color="#0f2a3a"/>
      <stop offset="100%" stop-color="#0b1120"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g stroke="#1e3a4a" stroke-width="2" fill="none">
    <path d="M820 120 L960 200 L1080 140 M960 200 L940 340 L1080 420 M940 340 L800 400"/>
  </g>
  <g fill="#2dd4bf">
    <circle cx="820" cy="120" r="7"/><circle cx="960" cy="200" r="9"/><circle cx="1080" cy="140" r="6"/>
    <circle cx="940" cy="340" r="8"/><circle cx="1080" cy="420" r="6"/><circle cx="800" cy="400" r="6"/>
  </g>
  <text x="80" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="700" fill="#e6eaf2">Muhammed Shihas K</text>
  <text x="80" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#94a3b8">.NET Developer · Software Engineer</text>
  <text x="80" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#94a3b8">Enterprise Applications &amp; Product Development</text>
  <rect x="80" y="430" width="120" height="6" rx="3" fill="#2dd4bf"/>
</svg>`
await sharp(Buffer.from(og)).png().toFile('public/og-image.png')
console.log('public/og-image.png')
