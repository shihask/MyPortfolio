import { useEffect } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Fades [data-reveal] elements in as they scroll into view.
 * Content stays visible without JS, without IntersectionObserver,
 * and when the user prefers reduced motion.
 */
export function useReveal(routeKey: string) {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const frame = requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el))
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [routeKey])
}
