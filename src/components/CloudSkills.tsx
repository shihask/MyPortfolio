import { BookOpen, Cloud } from 'lucide-react'
import { cloudSkills } from '../data/cloud'

export function CloudSkills() {
  const handsOn = cloudSkills.filter((s) => s.status === 'hands-on')
  const learning = cloudSkills.filter((s) => s.status === 'learning')

  return (
    <div id="cloud" className="mt-14 scroll-mt-24" data-reveal>
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg text-accent">
          <Cloud className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-ink">Cloud & hosting</h3>
          <p className="mt-1 text-sm text-muted">
            Platforms I've used hands-on to build, deploy and run my own products.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <ul className="grid gap-3 sm:grid-cols-2" aria-label="Hands-on cloud experience">
          {handsOn.map((s) => (
            <li key={s.name} className="rounded-xl border border-line bg-surface/40 p-4">
              <p className="text-sm font-semibold text-ink">{s.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.detail}</p>
              {s.usedIn && <p className="mt-2 font-mono text-[11px] text-faint">Used in: {s.usedIn}</p>}
            </li>
          ))}
        </ul>

        {learning.length > 0 && (
          <section aria-labelledby="learning-title" className="self-start rounded-xl border border-dashed border-line-strong p-5">
            <h4 id="learning-title" className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-accent uppercase">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Currently learning
            </h4>
            <ul className="mt-4 space-y-4">
              {learning.map((s) => (
                <li key={s.name}>
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
