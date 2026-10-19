import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { FeatureStatus } from '../data/projects'
import { statusLabel } from '../data/projects'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
}: {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-28 ${className}`}>
      <Container>
        <header className="mb-10 max-w-3xl sm:mb-14" data-reveal>
          <p className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-3xl leading-tight font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{intro}</p>}
        </header>
        {children}
      </Container>
    </section>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[11px] leading-5 text-muted">
      {children}
    </span>
  )
}

export function TagList({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items
  const rest = max ? items.length - shown.length : 0
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Tag>+{rest} more</Tag>
        </li>
      )}
    </ul>
  )
}

const statusStyles: Record<FeatureStatus, string> = {
  implemented: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  beta: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  experimental: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300',
  partial: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  planned: 'border-slate-400/30 bg-slate-400/10 text-slate-300',
}

export function StatusBadge({ status }: { status: FeatureStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}>
      {statusLabel[status]}
    </span>
  )
}

export function ConceptualBadge({ label = 'Conceptual' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/80 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-faint uppercase">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full border border-faint" />
      {label}
    </span>
  )
}

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
} & ({ to: string; href?: never } | { href: string; to?: never })

const buttonBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200'
const buttonVariants = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-2',
  secondary: 'border border-line-strong bg-surface/60 text-ink hover:border-accent/60 hover:bg-surface',
  ghost: 'text-muted hover:text-ink',
}

export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  const cls = `${buttonBase} ${buttonVariants[variant]} ${className}`
  if (rest.to !== undefined) {
    return (
      <Link to={rest.to} className={cls}>
        {children}
      </Link>
    )
  }
  const external = /^https?:/.test(rest.href)
  return (
    <a href={rest.href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}
