import { useId, useState } from 'react'
import { Briefcase, ChevronDown, MapPin } from 'lucide-react'
import { experience, type Role } from '../data/experience'
import { Section, TagList } from '../components/ui'

const PREVIEW = 4

function RoleItem({ role, current }: { role: Role; current: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const hasMore = role.highlights.length > PREVIEW
  const shown = expanded ? role.highlights : role.highlights.slice(0, PREVIEW)

  return (
    <li className="relative pl-10 sm:pl-14" data-reveal>
      <span
        aria-hidden="true"
        className={`absolute top-1.5 left-0 flex h-7 w-7 items-center justify-center rounded-full border sm:left-2 ${
          current ? 'border-accent bg-accent/15 text-accent' : 'border-line-strong bg-surface text-muted'
        }`}
      >
        <Briefcase className="h-3.5 w-3.5" />
      </span>

      <article className="rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div>
            <h3 className="text-lg font-semibold text-ink">{role.title}</h3>
            <p className="text-sm text-accent">{role.company}</p>
          </div>
          <p className="font-mono text-xs text-muted">
            <time dateTime={role.start}>{role.period.split('–')[0].trim()}</time> –{' '}
            {role.end ? <time dateTime={role.end}>{role.period.split('–')[1].trim()}</time> : 'Present'}
          </p>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-faint">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {role.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{role.summary}</p>

        <ul id={listId} className="mt-4 space-y-2.5">
          {shown.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/90">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={listId}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm text-accent hover:text-accent-2"
          >
            {expanded ? 'Show less' : `Show all ${role.highlights.length} responsibilities`}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}

        <div className="mt-5 border-t border-line/60 pt-4">
          <TagList items={role.tech} />
        </div>
      </article>
    </li>
  )
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Two companies, one steady thread: business workflows done properly."
      intro="From e-commerce and healthcare APIs to ERP modules, payment integrations and handheld apps."
      className="border-t border-line/60"
    >
      <div className="relative">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent sm:left-[21px]" />
        <ol className="relative space-y-8">
          {experience.map((role, i) => (
            <RoleItem key={role.company} role={role} current={i === 0} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
