import { Fragment } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import type { Diagram } from '../data/projects'
import { ConceptualBadge } from './ui'

/**
 * Reusable architecture / workflow diagram.
 * Horizontal on wide screens, vertical on phones; text-based so it stays
 * readable, selectable and accessible.
 */
export function FlowDiagram({ diagram, accent = 'var(--color-accent)' }: { diagram: Diagram; accent?: string }) {
  const { nodes, aside } = diagram
  const cols = nodes.length
  return (
    <figure className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <figcaption className="text-sm font-medium text-ink">{diagram.title}</figcaption>
        {diagram.conceptual && <ConceptualBadge />}
      </div>

      <ol
        className="flex flex-col items-stretch gap-2 lg:grid lg:items-stretch lg:gap-0"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {nodes.map((node, i) => (
          <Fragment key={node.label}>
            <li className="relative flex flex-col lg:flex-row lg:items-stretch">
              <div
                className="relative flex-1 rounded-xl border border-line-strong bg-bg/70 p-3.5"
                style={{ boxShadow: i === 0 ? `inset 0 0 0 1px color-mix(in srgb, ${accent} 30%, transparent)` : undefined }}
              >
                <span className="mb-1 block font-mono text-[10px] text-faint">{String(i + 1).padStart(2, '0')}</span>
                <span className="block text-sm font-medium text-ink">{node.label}</span>
                {node.detail && <span className="mt-1 block text-xs leading-relaxed text-muted">{node.detail}</span>}
              </div>
              {i < nodes.length - 1 && (
                <>
                  <span aria-hidden="true" className="flex justify-center py-1 lg:hidden" style={{ color: accent }}>
                    <ArrowDown className="h-4 w-4" />
                  </span>
                  <span aria-hidden="true" className="hidden w-6 shrink-0 items-center justify-center lg:flex" style={{ color: accent }}>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </>
              )}
            </li>
          </Fragment>
        ))}
      </ol>

      {aside && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-line-strong p-3 text-xs">
          <span className="font-mono text-faint">↳ attached to {nodes[aside.attachTo]?.label}</span>
          <span className="font-medium text-ink">{aside.label}</span>
          {aside.detail && <span className="text-muted">{aside.detail}</span>}
        </div>
      )}

      {diagram.note && <p className="mt-4 text-xs leading-relaxed text-faint">{diagram.note}</p>}
    </figure>
  )
}
