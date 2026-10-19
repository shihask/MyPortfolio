import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { products, workProjects } from '../data/projects'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { ProjectCard } from '../components/ProjectCard'
import { Container } from '../components/ui'

export default function ProjectsIndex() {
  useDocumentMeta('All projects', 'Personal products and professional case studies by Muhammed Shihas K.')
  return (
    <div className="pt-28 pb-24 sm:pt-36">
      <Container>
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">All projects</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Independent products first, then professional work in reverse-chronological order of employment.
        </p>

        <h2 className="mt-14 font-mono text-xs tracking-[0.2em] text-accent uppercase">Personal products</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/projects/${p.slug}`}
                className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface/40 p-5 transition-colors hover:border-line-strong hover:bg-surface/70"
              >
                {p.logo && <img src={p.logo} alt="" width={48} height={48} className="h-12 w-12 rounded-xl" />}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-lg font-semibold text-ink">{p.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                  <span className="mt-0.5 block text-sm" style={{ color: p.accent }}>{p.tagline}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{p.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-mono text-xs tracking-[0.2em] text-accent uppercase">Professional work</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {workProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </div>
  )
}
