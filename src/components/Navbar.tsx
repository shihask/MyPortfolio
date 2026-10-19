import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems, site } from '../data/site'
import { useScrollSpy } from '../lib/useScrollSpy'
import { Logo } from './icons'

const sectionIds = navItems.map((n) => n.id)

export function Navbar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useScrollSpy(sectionIds, onHome)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes; Tab is kept inside the open panel; body scroll is locked.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a, button')?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusables = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>('a, button')].filter(
        Boolean,
      ) as HTMLElement[]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 768) close(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  const href = (id: string) => `/#${id}`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line/80 bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 rounded-md text-ink" onClick={() => open && close(false)}>
          <Logo />
          <span className="font-semibold tracking-tight">
            {site.shortName}
            <span className="text-accent">.</span>
          </span>
          <span className="sr-only">— {site.name}, home</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <Link
                  to={href(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`mx-auto mt-0.5 block h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-4 pt-4 pb-10 md:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.id} className="border-b border-line/60">
                <Link
                  to={href(item.id)}
                  onClick={() => close(false)}
                  className="flex items-center justify-between py-4 text-lg text-ink"
                >
                  {item.label}
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${site.email}`} className="mt-8 inline-block text-sm text-accent">
            {site.email}
          </a>
        </div>
      )}
    </header>
  )
}
