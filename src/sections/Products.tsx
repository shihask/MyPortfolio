import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { products, type Project } from '../data/projects'
import { ConceptualBadge, Section, StatusBadge, TagList } from '../components/ui'
import { PhoneFrame, RecallPipelineArt } from '../components/visuals'

function ProductVisual({ product }: { product: Project }) {
  if (product.screenshots?.length) {
    const [first, second] = product.screenshots
    return (
      <div className="relative flex h-full items-start justify-center gap-4 px-6 pt-14 sm:px-10">
        <PhoneFrame shot={first} className="w-[62%] max-w-[260px] sm:w-[48%]" />
        {second && <PhoneFrame shot={second} className="mt-12 w-[44%] max-w-[240px] max-sm:hidden" />}
        <p className="absolute top-4 left-4 font-mono text-[10px] tracking-wider text-faint uppercase">Real screens · demo data</p>
      </div>
    )
  }
  return (
    <div className="relative flex h-full flex-col justify-center p-6 sm:p-8">
      <div className="absolute top-4 left-4">
        <ConceptualBadge label="Conceptual illustration" />
      </div>
      <RecallPipelineArt className="mx-auto mt-4 w-full max-w-lg" />
    </div>
  )
}

function ProductFeature({ product, reverse }: { product: Project; reverse: boolean }) {
  const highlights = (product.features ?? []).slice(0, 5)
  const accent = product.accent ?? 'var(--color-accent)'
  return (
    <article
      data-reveal
      className="relative overflow-hidden rounded-3xl border border-line bg-surface/40"
      style={{ backgroundImage: `radial-gradient(ellipse at ${reverse ? '0%' : '100%'} 0%, color-mix(in srgb, ${accent} 12%, transparent), transparent 60%)` }}
    >
      <div className={`grid lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-3">
            {product.logo && <img src={product.logo} alt="" width={44} height={44} className="h-11 w-11 rounded-xl" />}
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink">{product.title}</h3>
              <p className="font-mono text-xs text-muted">{product.category}</p>
            </div>
          </div>

          {product.tagline && (
            <p className="mt-6 text-xl font-medium text-balance" style={{ color: accent }}>
              {product.tagline}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted sm:text-base">{product.summary}</p>

          <ul className="mt-6 space-y-2.5" aria-label={`${product.title} highlights`}>
            {highlights.map((f) => (
              <li key={f.name} className="flex items-center justify-between gap-3 border-b border-line/60 pb-2.5 text-sm">
                <span className="text-ink/90">{f.name}</span>
                <StatusBadge status={f.status} />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <TagList items={product.tech} max={6} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={`/projects/${product.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              style={{ background: accent }}
            >
              Read the case study
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {product.links?.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm text-ink hover:border-accent/60"
              >
                {l.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <div
          className={`relative overflow-hidden border-t border-line bg-bg/40 lg:border-t-0 lg:border-l ${
            product.screenshots?.length ? 'h-[440px] sm:h-[520px] lg:h-auto lg:min-h-[520px]' : 'min-h-[300px]'
          }`}
        >
          <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
          <ProductVisual product={product} />
        </div>
      </div>
    </article>
  )
}

export function Products() {
  return (
    <Section
      id="products"
      eyebrow="Personal products"
      title="Two products I design, build and run on my own."
      intro="Independent work, separate from my employment. Each one targets a practical, everyday problem and is built end to end — product design, frontend, database, serverless backend and AI features."
      className="border-t border-line/60"
    >
      <div className="space-y-8">
        {products.map((p, i) => (
          <ProductFeature key={p.slug} product={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  )
}
