import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { navItems, site } from '../data/site'
import { LinkedInIcon, Logo } from './icons'
import { Container } from './ui'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-bg-soft">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-semibold text-ink">{site.name}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Software engineer — .NET, enterprise applications and independent products.
            </p>
            <p className="mt-4 font-mono text-xs text-faint">{site.footerLine}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
              {navItems.map((n) => (
                <li key={n.id}>
                  <Link to={`/#${n.id}`} className="text-muted hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/projects" className="text-muted hover:text-ink">
                  All projects
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-3">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted hover:border-accent/60 hover:text-ink"
            >
              <LinkedInIcon />
              <span className="sr-only">LinkedIn (opens in a new tab)</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted hover:border-accent/60 hover:text-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Email {site.email}</span>
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-line/60 pt-6 text-xs text-faint">
          © {year} {site.name}. Built with React, TypeScript and Tailwind CSS.
        </p>
      </Container>
    </footer>
  )
}
