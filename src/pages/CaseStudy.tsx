import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, ArrowRight, ExternalLink, Info } from 'lucide-react'
import { displayTitle, getProject, projects, type Project } from '../data/projects'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { FlowDiagram } from '../components/FlowDiagram'
import { ConceptualBadge, Container, StatusBadge, TagList } from '../components/ui'
import { CardArt, PhoneFrame, RecallPipelineArt } from '../components/visuals'
import NotFound from './NotFound'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24 border-t border-line/60 py-10 sm:py-12" data-reveal>
      <h2 id={id} className="mb-5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-relaxed text-ink/90">
          <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  )
}

function HeroVisual({ p }: { p: Project }) {
  if (p.screenshots?.length) {
    return (
      <div className="relative">
        <p className="mb-3 text-right font-mono text-[10px] tracking-wider text-faint uppercase">Real screens · seeded demo account</p>
        <div className="flex items-start justify-center gap-3 sm:gap-5">
          {p.screenshots.map((s, i) => (
            <PhoneFrame key={s.src} shot={s} eager className={`w-1/3 max-w-[210px] ${i === 1 ? 'mt-8' : ''}`} />
          ))}
        </div>
      </div>
    )
  }
  if (p.slug === 'recall') {
    return (
      <div className="rounded-2xl border border-line bg-bg/60 p-5">
        <div className="mb-2 flex justify-end">
          <ConceptualBadge label="Conceptual illustration" />
        </div>
        <RecallPipelineArt className="w-full" />
      </div>
    )
  }
  return (
    <div className="relative h-56 rounded-2xl border border-line bg-bg/60 p-6" aria-hidden="true">
      <div className="grid-bg absolute inset-0 rounded-2xl" />
      <div className="relative h-full">
        <CardArt kind={p.cardVisual} />
      </div>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const p = getProject(slug)
  useDocumentMeta(p ? displayTitle(p) : 'Page not found', p?.summary)
  if (!p) return <NotFound />

  const title = displayTitle(p)
  const index = projects.indexOf(p)
  const next = projects[(index + 1) % projects.length]
  const accent = p.accent ?? 'var(--color-accent)'
  const isProduct = p.kind === 'product'

  const toc = [
    { id: 'overview', label: 'Overview' },
    p.features && { id: 'features', label: 'Features' },
    { id: 'contribution', label: isProduct ? 'What I built' : 'My contribution' },
    p.diagrams && { id: 'architecture', label: isProduct ? 'Architecture' : 'How it fits together' },
    p.decisions && { id: 'decisions', label: 'Engineering decisions' },
    p.limitations && { id: 'limitations', label: 'Limitations' },
    p.learnings && { id: 'learnings', label: 'What I learned' },
    { id: 'stack', label: 'Technology' },
  ].filter(Boolean) as { id: string; label: string }[]

  return (
    <article className="pb-24">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 h-[380px] w-[560px] rounded-full blur-[120px]"
          style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)` }}
        />
        <Container className="relative">
          <Link to={isProduct ? '/#products' : '/projects'} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {isProduct ? 'Back to products' : 'All projects'}
          </Link>

          <div className={`mt-6 grid items-center gap-10 ${p.screenshots ? 'lg:grid-cols-[1fr_1.05fr]' : 'lg:grid-cols-[1.3fr_1fr]'}`}>
            <div className="hero-in">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`, color: accent }}
                >
                  {isProduct ? 'Personal product' : p.kind === 'training' ? 'Training project' : 'Professional work'}
                </span>
                <span className="font-mono text-[11px] text-faint">{p.category}</span>
              </div>
              <div className="mt-5 flex items-center gap-4">
                {p.logo && <img src={p.logo} alt="" width={56} height={56} className="h-14 w-14 rounded-2xl" />}
                <h1 className="text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">{title}</h1>
              </div>
              {p.tagline && (
                <p className="mt-4 text-xl font-medium" style={{ color: accent }}>
                  {p.tagline}
                </p>
              )}
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{p.summary}</p>
              <p className="mt-4 text-sm text-faint">{p.context}</p>
              {p.links && p.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg px-5 text-sm font-medium text-bg hover:opacity-90"
                      style={{ background: accent }}
                    >
                      {l.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="hero-in" style={{ animationDelay: '120ms' }}>
              <HeroVisual p={p} />
            </div>
          </div>
        </Container>
      </header>

      <Container className="mt-4">
        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
          {/* Table of contents */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24 pt-10">
              <p className="mb-3 font-mono text-[11px] tracking-wider text-faint uppercase">On this page</p>
              <ul className="space-y-1 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-muted hover:border-accent hover:text-ink">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0 max-w-3xl">
            <Block id="overview" title="Overview">
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[11px] tracking-wider text-faint uppercase">The problem</dt>
                  <dd className="mt-2 leading-relaxed text-ink/90">{p.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-wider text-faint uppercase">My role</dt>
                  <dd className="mt-2 leading-relaxed text-ink/90">{p.role}</dd>
                </div>
              </dl>
              {p.approach && (
                <div className="mt-8">
                  <h3 className="font-mono text-[11px] tracking-wider text-faint uppercase">Product approach</h3>
                  <div className="mt-3">
                    <Bullets items={p.approach} />
                  </div>
                </div>
              )}
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Engineering themes">
                {p.themes.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-surface/50 px-3 py-1 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            {p.features && (
              <Block id="features" title="Features and their status">
                <p className="mb-5 text-sm text-muted">
                  Classified from the current codebase. “Beta” and “Experimental” match the labels shown in the product.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f.name} className="rounded-xl border border-line bg-surface/40 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-ink">{f.name}</h3>
                        <StatusBadge status={f.status} />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{f.detail}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block id="contribution" title={isProduct ? 'What I built' : 'My contribution'}>
              <Bullets items={p.contributions} />
            </Block>

            {p.diagrams && (
              <Block id="architecture" title={isProduct ? 'Architecture' : 'How it fits together'}>
                <div className="space-y-5">
                  {p.diagrams.map((d) => (
                    <FlowDiagram key={d.title} diagram={d} accent={accent} />
                  ))}
                </div>
              </Block>
            )}

            {p.decisions && (
              <Block id="decisions" title="Engineering decisions">
                <div className="grid gap-4">
                  {p.decisions.map((d, i) => (
                    <section key={d.title} className="rounded-xl border border-line bg-surface/40 p-5" aria-label={d.title}>
                      <h3 className="flex items-baseline gap-3 font-semibold text-ink">
                        <span className="font-mono text-xs" style={{ color: accent }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {d.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
                    </section>
                  ))}
                </div>
              </Block>
            )}

            {p.limitations && (
              <Block id="limitations" title="Current limitations">
                <Bullets items={p.limitations} />
              </Block>
            )}

            {p.learnings && (
              <Block id="learnings" title="What I learned">
                <Bullets items={p.learnings} />
              </Block>
            )}

            <Block id="stack" title="Technology">
              <TagList items={p.tech} />
            </Block>

            {p.disclaimer && (
              <aside className="mt-2 flex gap-3 rounded-xl border border-line bg-surface/40 p-4 text-sm text-muted">
                {isProduct ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                ) : (
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                )}
                <p>{p.disclaimer}</p>
              </aside>
            )}
            {!isProduct && (
              <p className="mt-4 text-xs leading-relaxed text-faint">
                Employer and client systems are described at a high level. Diagrams are conceptual; no proprietary code, data,
                endpoints or branding are shown.
              </p>
            )}

            <nav aria-label="Next project" className="mt-12 border-t border-line pt-8">
              <Link
                to={`/projects/${next.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface/40 p-5 hover:border-line-strong"
              >
                <span>
                  <span className="block font-mono text-[11px] tracking-wider text-faint uppercase">Next</span>
                  <span className="mt-1 block text-lg font-semibold text-ink">{displayTitle(next)}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </article>
  )
}
