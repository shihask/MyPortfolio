import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Button, Container } from '../components/ui'

export default function NotFound() {
  useDocumentMeta('Page not found')
  return (
    <div className="flex min-h-[70vh] items-center pt-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">This page doesn’t exist.</h1>
        <p className="mt-3 text-muted">The link may be outdated, or the project may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Go home</Button>
          <Button to="/projects" variant="secondary">
            Browse projects
          </Button>
        </div>
      </Container>
    </div>
  )
}
