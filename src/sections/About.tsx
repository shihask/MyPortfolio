import { Boxes, CreditCard, Database, GraduationCap, Layers, Smartphone } from 'lucide-react'
import { site } from '../data/site'
import { Section } from '../components/ui'

const areas = [
  { icon: Layers, title: 'Enterprise & ERP', body: 'School management workflows — admissions, enrollment, fees, discounts and reporting.' },
  { icon: CreditCard, title: 'Payments & APIs', body: 'REST API design, KNET and Tap payment integration, and modernizing a legacy web service.' },
  { icon: Database, title: 'Data', body: 'SQL Server modelling, stored procedures and query-driven applications.' },
  { icon: Smartphone, title: 'Mobile & devices', body: 'Xamarin.Android and .NET MAUI apps for handhelds, with Zebra Bluetooth label printing.' },
  { icon: Boxes, title: 'Independent products', body: 'Designing and shipping MoneyPlant and Recall — including applied AI features with guardrails.' },
]

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="I build software that holds up after launch."
      className="border-t border-line/60"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg" data-reveal>
          <p>
            I'm a software engineer based in Kozhikode with {site.experienceYears} of professional experience, mostly in the
            .NET ecosystem. Most of my work has been on enterprise systems — ERP modules for schools, online registration and
            payment flows, APIs consumed by other companies' apps, and Android apps for warehouse handhelds.
          </p>
          <p>
            What I enjoy most is the practical middle of a project: turning a requirement into a workflow that behaves correctly
            with real data, keeping code maintainable as it grows, and modernizing older systems without breaking the people who
            depend on them. I've worked across backend, frontend, database and deployment, and I stay involved after release.
          </p>
          <p>
            Outside my day job I build my own products. <span className="text-ink">MoneyPlant</span> helps people understand what
            they can afford to spend; <span className="text-ink">Recall</span> helps them find what they saved online. Building them
            end to end has taught me as much about product decisions as about code.
          </p>
          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface/40 p-4 text-sm">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <p>
              <span className="text-ink">{site.education.degree}</span> — {site.education.school}, {site.education.university}{' '}
              <span className="text-faint">({site.education.period})</span>
            </p>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {areas.map(({ icon: Icon, title, body }) => (
            <li key={title} data-reveal className="flex gap-4 rounded-xl border border-line bg-surface/40 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg text-accent">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
