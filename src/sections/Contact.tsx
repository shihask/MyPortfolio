import { useState } from 'react'
import { Check, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import { LinkedInIcon } from '../components/icons'
import { Container } from '../components/ui'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — the mailto link still works.
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-strong px-4 text-sm text-muted hover:border-accent/60 hover:text-ink"
    >
      {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}

export function Contact() {
  const channels = [
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
    { icon: LinkedInIcon, label: 'LinkedIn', value: 'muhammed-shihas-k', href: site.linkedin, external: true },
    ...(site.phone.show
      ? [{ icon: Phone, label: 'Phone', value: site.phone.value, href: `tel:${site.phone.value.replace(/\s+/g, '')}`, external: false }]
      : []),
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line/60 py-20 sm:py-28">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div aria-hidden="true" className="absolute -bottom-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">Contact</p>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            Have a software problem worth solving? Let’s talk.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Email is the best way to reach me — about a role, a project, or either of my products.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-medium text-accent-ink hover:bg-accent-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email me
            </a>
            <CopyEmail />
          </div>
        </div>

        <ul className={`mx-auto mt-14 grid max-w-3xl gap-3 ${channels.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label} data-reveal>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-full items-center gap-4 rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-accent/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-faint">{label}</span>
                  <span className="block truncate text-sm text-ink">{value}</span>
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-faint">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {site.location}
        </p>
      </Container>
    </section>
  )
}
