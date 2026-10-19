// Visuals for project cards and case-study headers.
// Everything here except PhoneFrame (which shows real screenshots) is an
// abstract illustration and is labelled as such where it appears.
import type { CardVisual, Screenshot } from '../data/projects'

export function PhoneFrame({ shot, className = '', eager = false }: { shot: Screenshot; className?: string; eager?: boolean }) {
  return (
    <div className={`relative rounded-[2rem] border border-line-strong bg-[#05080f] p-2 shadow-2xl shadow-black/40 ${className}`}>
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        <img
          src={shot.src}
          alt={shot.alt}
          width={585}
          height={1266}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    </div>
  )
}

/** Conceptual illustration of Recall's save → process → find pipeline. */
export function RecallPipelineArt({ className = '' }: { className?: string }) {
  const stages = [
    { x: 60, label: 'Save', sub: 'link' },
    { x: 180, label: 'Fetch', sub: 'oEmbed' },
    { x: 300, label: 'Enrich', sub: 'AI tags' },
    { x: 420, label: 'Embed', sub: 'vector' },
  ]
  return (
    <svg viewBox="10 48 500 260" role="img" aria-labelledby="recall-art-title" className={className}>
      <title id="recall-art-title">Conceptual illustration: a saved link flows through fetch, enrich and embed stages into a searchable memory</title>
      <defs>
        <linearGradient id="rc-line" x1="0" x2="1">
          <stop offset="0" stopColor="#6d6cf0" stopOpacity="0.2" />
          <stop offset="1" stopColor="#6d6cf0" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="rc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6d6cf0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6d6cf0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M60 90 H420" stroke="url(#rc-line)" strokeWidth="2" fill="none" className="flow-line" />
      {stages.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x - 44} y={62} width={88} height={56} rx={12} fill="#111a2e" stroke="#2a3a5c" />
          <text x={s.x} y={86} textAnchor="middle" fill="#e6eaf2" fontSize="13" fontWeight="600" fontFamily="var(--font-sans)">
            {s.label}
          </text>
          <text x={s.x} y={104} textAnchor="middle" fill="#9aa8bd" fontSize="10" fontFamily="var(--font-mono)">
            {s.sub}
          </text>
          <circle cx={s.x} cy={62} r={3.5} fill="#6d6cf0" className="pulse-node" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}

      <path d="M420 118 C420 160 260 150 260 190" stroke="#6d6cf0" strokeOpacity="0.6" strokeWidth="2" fill="none" className="flow-line" />

      <circle cx="260" cy="232" r="70" fill="url(#rc-glow)" />
      <circle cx="260" cy="232" r="46" fill="none" stroke="#6d6cf0" strokeOpacity="0.45" strokeWidth="10" />
      <circle cx="260" cy="232" r="24" fill="none" stroke="#6d6cf0" strokeOpacity="0.8" strokeWidth="10" />
      <circle cx="260" cy="232" r="8" fill="#e6eaf2" />

      <g fontFamily="var(--font-mono)" fontSize="10" fill="#9aa8bd">
        <rect x="336" y="206" width="160" height="26" rx="13" fill="#111a2e" stroke="#2a3a5c" />
        <text x="350" y="223">"that reel about…"</text>
        <rect x="24" y="222" width="150" height="26" rx="13" fill="#111a2e" stroke="#2a3a5c" />
        <text x="38" y="239">keyword + semantic</text>
      </g>
    </svg>
  )
}

function DeviceArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full">
      <rect x="70" y="20" width="70" height="140" rx="12" fill="#0b1120" stroke="#2a3a5c" />
      <rect x="78" y="34" width="54" height="80" rx="4" fill="#16213a" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="84" y={42 + i * 17} width={i % 2 ? 30 : 42} height="6" rx="3" fill="#2a3a5c" />
      ))}
      <rect x="92" y="124" width="26" height="22" rx="4" fill="#16213a" />
      <path d="M150 90 C180 90 180 70 205 70" stroke="#2dd4bf" strokeWidth="1.5" fill="none" className="flow-line" />
      <rect x="205" y="50" width="70" height="50" rx="8" fill="#111a2e" stroke="#2a3a5c" />
      <rect x="215" y="100" width="50" height="34" fill="#e6eaf2" opacity="0.9" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect key={i} x={219 + i * 4.3} y="106" width={i % 3 ? 1.5 : 2.5} height="18" fill="#0b1120" />
      ))}
      <text x="240" y="80" textAnchor="middle" fontSize="9" fill="#9aa8bd" fontFamily="var(--font-mono)">ZPL</text>
    </svg>
  )
}

function FlowArt() {
  const xs = [40, 120, 200, 280]
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full">
      <path d="M40 90 H280" stroke="#2a3a5c" strokeWidth="1.5" />
      <path d="M40 90 H280" stroke="#2dd4bf" strokeWidth="1.5" className="flow-line" />
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 26} y={66} width={52} height={48} rx={10} fill="#111a2e" stroke={i === 1 ? '#2dd4bf' : '#2a3a5c'} />
          <rect x={x - 14} y={82} width={28} height={5} rx={2.5} fill="#2a3a5c" />
          <rect x={x - 10} y={93} width={20} height={5} rx={2.5} fill="#2a3a5c" />
        </g>
      ))}
    </svg>
  )
}

function StackArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 30})`}>
          <path
            d={`M160 ${40} L240 ${62} L160 ${84} L80 ${62} Z`}
            fill={i === 0 ? '#16213a' : '#111a2e'}
            stroke={i === 0 ? '#2dd4bf' : '#2a3a5c'}
            strokeOpacity={i === 0 ? 0.8 : 1}
          />
        </g>
      ))}
      <circle cx="160" cy="62" r="3" fill="#2dd4bf" className="pulse-node" />
    </svg>
  )
}

export function CardArt({ kind }: { kind: CardVisual }) {
  switch (kind) {
    case 'device':
      return <DeviceArt />
    case 'flow':
      return <FlowArt />
    case 'stack':
      return <StackArt />
    case 'pipeline':
      return <RecallPipelineArt className="h-full w-full" />
    default:
      return null
  }
}
