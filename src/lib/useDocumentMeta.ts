import { useEffect } from 'react'
import { site } from '../data/site'

/** Sets the document title and meta description for the current route. */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.seo.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = description ?? site.seo.description
  }, [title, description])
}
