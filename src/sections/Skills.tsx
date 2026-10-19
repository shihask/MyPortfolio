import { skillGroups, tierLabel, type Tier } from '../data/skills'
import { Section } from '../components/ui'

const tierDot: Record<Tier, string> = {
  core: 'bg-accent',
  working: 'bg-accent-2/60',
  exploratory: 'border border-muted',
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with."
      intro="Grouped by area. No percentages — just an honest split between what I use every day, what I've used on real projects, and what I use in my own products."
      className="border-t border-line/60"
    >
      <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted" aria-label="Legend" data-reveal>
        {(Object.keys(tierLabel) as Tier[]).map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tierDot[t]}`} />
            {tierLabel[t]}
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <section key={g.title} data-reveal className="rounded-2xl border border-line bg-surface/40 p-5" aria-label={g.title}>
            <h3 className="text-sm font-semibold text-ink">{g.title}</h3>
            {g.note && <p className="mt-1 text-xs text-faint">{g.note}</p>}
            <ul className="mt-4 space-y-2">
              {g.skills.map((s) => (
                <li key={s.name} className="flex items-center gap-2.5 text-sm text-muted">
                  <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${tierDot[s.tier]}`} />
                  <span className="text-ink/90">{s.name}</span>
                  <span className="sr-only">— {tierLabel[s.tier]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  )
}
