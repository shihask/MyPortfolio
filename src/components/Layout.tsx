import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useReveal } from '../lib/useReveal'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Scrolls to the hash target after navigation, or to the top on a new page. */
function useRouteScroll() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const frame = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
          // Move focus for keyboard and screen-reader users without a second scroll.
          el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        }
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])
}

export function Layout() {
  const { pathname } = useLocation()
  useRouteScroll()
  useReveal(pathname)

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
