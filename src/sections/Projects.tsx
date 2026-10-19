import { ArrowRight } from 'lucide-react'
import { workProjects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Button, Section } from '../components/ui'

const FEATURED = 4

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Professional work"
      title="Enterprise case studies."
      intro="Projects from my employment at AppSure and Sysboon. These are employer or client systems; I describe my own contributions, without client names, internal endpoints or proprietary data."
      className="border-t border-line/60"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {workProjects.slice(0, FEATURED).map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {workProjects.length > FEATURED && (
        <div className="mt-10 flex justify-center" data-reveal>
          <Button to="/projects" variant="secondary">
            View all {workProjects.length} professional projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </Section>
  )
}
