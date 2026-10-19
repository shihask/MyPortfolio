// Brand icons are not part of lucide-react, so LinkedIn is drawn here.
export function LinkedInIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="14" fill="#111a2e" stroke="#2a3a5c" />
      <path d="M18 22 L32 16 L46 22 M18 22 L32 34 L46 22 M32 34 L32 48" stroke="#2dd4bf" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="22" r="4" fill="#2dd4bf" />
      <circle cx="46" cy="22" r="4" fill="#2dd4bf" />
      <circle cx="32" cy="16" r="4" fill="#e6eaf2" />
      <circle cx="32" cy="34" r="4" fill="#e6eaf2" />
      <circle cx="32" cy="48" r="4" fill="#2dd4bf" />
    </svg>
  )
}
