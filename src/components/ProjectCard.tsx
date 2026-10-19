import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { displayTitle, type Project } from '../data/projects'
import { TagList } from './ui'
import { CardArt } from './visuals'

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const title = displayTitle(project)
  return (
    <article
      data-reveal
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 transition-colors duration-300 hover:border-line-strong hover:bg-surface/70"
    >
      <div className="relative h-36 border-b border-line bg-bg/60 px-6 py-3">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative h-full">
          <CardArt kind={project.cardVisual} />
        </div>
        {project.kind === 'training' && (
          <span className="absolute top-3 right-3 rounded-full border border-line-strong bg-bg/80 px-2 py-0.5 font-mono text-[10px] text-muted uppercase">
            Training project
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-wide text-accent">{project.category}</p>
        <H className="mt-2 text-lg font-semibold text-ink">
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </H>
        <p className="mt-1 text-xs text-faint">{project.context}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.problem}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/90">
          <span className="text-faint">My role · </span>
          {project.role}
        </p>
        <div className="mt-5">
          <TagList items={project.tech} max={5} />
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          View case study
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
