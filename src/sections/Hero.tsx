import { ArrowDown, FileText, MapPin } from 'lucide-react'
import { site } from '../data/site'
import { Button, Container } from '../components/ui'

/** Faint "connected systems" graph behind the hero. Decorative only. */
function SystemGraph() {
  const nodes = [
    [620, 110], [760, 70], [900, 150], [700, 230], [860, 300], [1010, 240], [980, 400], [780, 420], [1100, 120],
  ] as const
  const edges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [2, 5], [4, 5], [4, 7], [5, 6], [6, 7], [2, 8], [5, 8],
  ] as const
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(to_left,black_20%,transparent_75%)] max-md:opacity-25"
    >
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#1e3a4a" strokeWidth="1.2" />
      ))}
      <path d="M620 110 L760 70 L900 150 L1010 240 L980 400" stroke="#2dd4bf" strokeOpacity="0.5" strokeWidth="1.2" fill="none" className="flow-line" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5} fill={i % 3 === 0 ? '#2dd4bf' : '#2a3a5c'} className={i % 3 === 0 ? 'pulse-node' : ''} style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </svg>
  )
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-0 h-[480px] w-[640px] rounded-full bg-accent/10 blur-[120px] max-sm:w-[360px]"
      />
      <SystemGraph />

      <Container className="relative">
        <p className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {site.name} · {site.role}
        </p>

        <h1
          id="hero-title"
          className="hero-in max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          Building reliable software.{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Turning complex workflows into useful products.
          </span>
        </h1>

        <p className="hero-in mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg" style={{ animationDelay: '160ms' }}>
          {site.heroIntro}
        </p>

        <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
          <Button to="/#products">
            Explore my work
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button to="/#contact" variant="secondary">
            Contact me
          </Button>
          {site.resumeUrl && (
            <Button href={site.resumeUrl} variant="ghost">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Download resume
            </Button>
          )}
        </div>

        <dl className="hero-in mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3" style={{ animationDelay: '320ms' }}>
          {[
            ['Experience', 'Around 7 years in software'],
            ['Focus', '.NET · ERP · APIs · Mobile'],
            ['Building', 'MoneyPlant & Recall'],
          ].map(([k, v]) => (
            <div key={k} className="bg-bg/90 px-5 py-4">
              <dt className="font-mono text-[11px] tracking-wider text-faint uppercase">{k}</dt>
              <dd className="mt-1 text-sm text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="hero-in mt-6 flex items-center gap-2 text-sm text-faint" style={{ animationDelay: '380ms' }}>
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {site.location}
        </p>
      </Container>
    </section>
  )
}
