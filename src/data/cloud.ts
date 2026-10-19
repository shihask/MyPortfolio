// Cloud & hosting skills. Only list what is backed by real, hands-on use.
//
// Verified (Oct 2026) against the MoneyPlant and Recall repositories:
// vercel.json configs, supabase/migrations (RLS, storage buckets, cron.schedule),
// supabase/functions/*, Sentry.init in moneyplant/src/main.tsx, and Cloudflare
// DNS noted in moneyplant/CLAUDE.md.
//
// Azure: no Azure code, config, deployment or certification was found in any
// repository or resume, so it is listed as "learning" only.
// When that changes, move it to 'hands-on' (with what you built) or add a
// `certification` entry once the exam is actually passed.

export type CloudStatus = 'hands-on' | 'learning'

export interface CloudSkill {
  name: string
  detail: string
  status: CloudStatus
  /** Where it was used — keeps claims traceable. */
  usedIn?: string
}

export const cloudSkills: CloudSkill[] = [
  {
    name: 'Vercel',
    status: 'hands-on',
    detail: 'Git-based deployments, SPA routing, security headers and custom domains.',
    usedIn: 'MoneyPlant, Recall, this site',
  },
  {
    name: 'Supabase (managed Postgres)',
    status: 'hands-on',
    detail: 'Schema migrations, Row Level Security, Postgres functions, Auth (email, OTP, Google OAuth, guest sessions) and Storage buckets.',
    usedIn: 'MoneyPlant, Recall',
  },
  {
    name: 'Serverless functions',
    status: 'hands-on',
    detail: 'Supabase Edge Functions (Deno) for AI proxying, background processing, imports and push notifications.',
    usedIn: 'MoneyPlant, Recall',
  },
  {
    name: 'Scheduled jobs',
    status: 'hands-on',
    detail: 'pg_cron schedules for reminders, retries and storage cleanup.',
    usedIn: 'MoneyPlant, Recall',
  },
  {
    name: 'Cloudflare DNS',
    status: 'hands-on',
    detail: 'Domain DNS, including records for transactional email.',
    usedIn: 'MoneyPlant',
  },
  {
    name: 'Monitoring',
    status: 'hands-on',
    detail: 'Sentry error tracking and Vercel Analytics.',
    usedIn: 'MoneyPlant',
  },
  {
    name: 'Microsoft Azure fundamentals',
    status: 'learning',
    detail: 'Studying AZ-900 topics — cloud concepts, core Azure services, security and governance. Not certified yet.',
  },
]
