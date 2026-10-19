// Project & product content. Every claim here is sourced from the CV, the
// portfolio brief, or (for MoneyPlant and Recall) verified against the actual
// source code, migrations and tests. Edit freely — the UI renders from this file.
//
// Confidentiality:
//   - Set `anonymize: true` on any employer project to show `anonymizedTitle`
//     instead of the product name everywhere on the site.
//   - Client names are intentionally omitted.
import mpDashboard from '../assets/moneyplant/dashboard.webp'
import mpBudget from '../assets/moneyplant/budget-health.webp'
import mpChallenge from '../assets/moneyplant/daily-challenge.webp'
import mpLogo from '../assets/moneyplant/logo.svg'
import recallLogo from '../assets/recall/logo.svg'

export type ProjectKind = 'product' | 'enterprise' | 'training'
export type FeatureStatus = 'implemented' | 'beta' | 'experimental' | 'partial' | 'planned'
export type CardVisual = 'screens' | 'pipeline' | 'device' | 'flow' | 'stack'

export interface DiagramNode {
  label: string
  detail?: string
}

export interface Diagram {
  title: string
  nodes: DiagramNode[]
  /** A side component attached to one node (e.g. a Bluetooth printer). */
  aside?: { attachTo: number; label: string; detail?: string }
  /** True unless the diagram mirrors verified, published architecture. */
  conceptual: boolean
  note?: string
}

export interface Feature {
  name: string
  status: FeatureStatus
  detail: string
}

export interface Decision {
  title: string
  body: string
}

export interface Screenshot {
  src: string
  alt: string
  caption: string
}

export interface Project {
  slug: string
  title: string
  anonymizedTitle: string
  anonymize: boolean
  kind: ProjectKind
  category: string
  tagline?: string
  context: string // e.g. employer + period, or "Independent product"
  summary: string
  problem: string
  role: string
  contributions: string[]
  approach?: string[]
  themes: string[]
  tech: string[]
  cardVisual: CardVisual
  diagrams?: Diagram[]
  features?: Feature[]
  decisions?: Decision[]
  limitations?: string[]
  learnings?: string[]
  screenshots?: Screenshot[]
  logo?: string
  accent?: string
  links?: { label: string; url: string }[]
  disclaimer?: string
}

export const projects: Project[] = [
  // ───────────────────────────── Personal products ─────────────────────────────
  {
    slug: 'moneyplant',
    title: 'MoneyPlant',
    anonymizedTitle: 'MoneyPlant',
    anonymize: false,
    kind: 'product',
    category: 'Personal finance · Financial planning',
    tagline: 'Know Before You Spend.',
    context: 'Independent product · designed and built by me',
    summary:
      'A personal finance app for Indian users that combines transaction tracking, budgets, recurring commitments, savings and lending into one picture of what you can actually afford — with an AI assistant, Mint, that explains numbers the app has already worked out.',
    problem:
      'Most people know their salary but not where it goes. Spending trackers record the past; they rarely answer the question that matters day to day: how much can I safely spend today, once bills, EMIs, credit-card dues and savings commitments are accounted for?',
    role: 'Solo founder and developer — product design, frontend, database, serverless backend, AI integration, deployment and marketing assets.',
    contributions: [
      'Designed the data model and Postgres functions behind accounts, transactions, credit cards, commitments, savings, borrowings and goals (Supabase, 60+ migrations).',
      'Built the installable React + TypeScript PWA with offline transaction entry and push notifications.',
      'Wrote a single day-by-day cash-flow engine that powers the forecast, the "Can I afford this?" checker and safe-to-spend guidance.',
      'Built Mint, an AI assistant on Supabase Edge Functions and Groq, with per-user daily limits and call logging.',
      'Added receipt and bank-statement extraction that pre-fills forms for the user to confirm.',
      'Shipped a Kakeibo-inspired monthly reflection workspace.',
    ],
    approach: [
      'Put every transaction, commitment and savings plan in one ledger so the app can compute real "free money" instead of showing a raw balance.',
      'Let deterministic code compute every number; let the AI explain and categorise, never calculate.',
      'Make entry fast enough to be a habit — quick add, offline entry, receipt pre-fill — then reward it with a daily spending challenge.',
    ],
    themes: ['Product design', 'Financial correctness', 'Offline-first PWA', 'Applied AI with guardrails', 'Serverless Postgres'],
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'PWA (Workbox)',
      'Supabase Postgres',
      'Row Level Security',
      'Supabase Edge Functions (Deno)',
      'pg_cron',
      'Groq API',
      'Vercel',
      'Vitest',
      'Playwright',
    ],
    cardVisual: 'screens',
    logo: mpLogo,
    accent: '#16C98A',
    screenshots: [
      {
        src: mpDashboard,
        alt: 'MoneyPlant dashboard showing cycle budget remaining, free money, cycle spend and an upcoming EMI reminder',
        caption: 'Dashboard — budget remaining, free money and an upcoming EMI',
      },
      {
        src: mpBudget,
        alt: 'MoneyPlant budget health card splitting spending into needs, wants and savings with on-track indicators',
        caption: 'Budget health — Needs / Wants / Savings split',
      },
      {
        src: mpChallenge,
        alt: 'MoneyPlant daily challenge card and the "Can I afford this?" entry point',
        caption: 'Daily challenge and the affordability checker',
      },
    ],
    features: [
      { name: 'Expense & income tracking', status: 'implemented', detail: 'Quick add, categories, daily/weekly/monthly summaries and trends.' },
      { name: 'Accounts, balances & transfers', status: 'implemented', detail: 'Bank, cash, wallet and credit-card accounts with transfers between them.' },
      { name: 'Credit-card double counting', status: 'implemented', detail: 'Card spend counts when you swipe; paying the bill is a system entry excluded from spend and budgets. Statement cycles and partial payments are handled.' },
      { name: 'Budgets', status: 'implemented', detail: 'Daily, weekly, monthly or income-cycle budgets, plus a Needs / Wants / Savings split.' },
      { name: 'Safe-to-spend', status: 'implemented', detail: 'A safe daily amount and a "Can I afford this?" checker, both driven by the forecast engine.' },
      { name: 'Daily spending challenge', status: 'implemented', detail: 'Easy / medium / hard targets; yesterday’s overspend is spread across the remaining days of the cycle.' },
      { name: 'Bills, EMIs & recurring commitments', status: 'implemented', detail: 'Tracks due dates and which due a payment covers, with reminder notifications.' },
      { name: 'Savings & investments', status: 'implemented', detail: 'SIPs / mutual funds, gold schemes, RD, FD, PPF / NPS and chit funds (kuri). Contributions are tracked manually — no live market prices.' },
      { name: 'Lending & borrowing', status: 'implemented', detail: 'Money lent and borrowed, with repayments recorded as transactions.' },
      { name: 'Assets & liabilities', status: 'partial', detail: 'A wealth summary of invested amounts, chit payouts and money lent versus borrowings — not a full balance sheet.' },
      { name: 'Receipt extraction', status: 'implemented', detail: 'A vision model reads a receipt and pre-fills the expense form; the user reviews before saving.' },
      { name: 'Statement import', status: 'implemented', detail: 'PDF and image bank statements are parsed into reviewable transactions, with daily limits and automatic cleanup.' },
      { name: 'Kakeibo reflection', status: 'implemented', detail: 'A monthly reflection and four-pillar workspace inspired by the Japanese budgeting method. Newest area of work.' },
      { name: 'Mint AI assistant', status: 'beta', detail: 'Chat, categorisation and insights. Labelled Beta in the app.' },
      { name: 'Cash-flow forecasting', status: 'beta', detail: '"Planned" mode is stable; "Smart" mode, which adds typical daily spending, is labelled Beta.' },
      { name: 'Bank sync (Account Aggregator)', status: 'experimental', detail: 'Built against a sandbox only. Shown as "Coming soon" until production bank-data access is available.' },
    ],
    diagrams: [
      {
        title: 'How the pieces fit',
        conceptual: true,
        nodes: [
          { label: 'User', detail: 'Installable PWA on phone or desktop' },
          { label: 'React + TypeScript app', detail: 'Offline queue · service worker cache' },
          { label: 'Supabase', detail: 'Auth · Postgres functions · Row Level Security' },
          { label: 'Edge Functions', detail: 'AI proxy · push · imports · email' },
          { label: 'Groq', detail: 'Text and vision models (optional)' },
        ],
        note: 'Simplified. AI features are optional and metered; the core app works without them.',
      },
    ],
    decisions: [
      {
        title: 'Offline entry that can’t double-count',
        body: 'Transactions entered offline are queued on the device and their balance changes are shown immediately. Each entry gets its final id on the client, and the Postgres function that saves it uses that id as an idempotency key (ON CONFLICT DO NOTHING). A retry after a dropped connection can never apply the same balance change twice.',
      },
      {
        title: '"Free money", not "balance"',
        body: 'Free Money = liquid cash − emergency fund − mandatory bills due before the next income. Bills are classified as mandatory (cards, loans, received chits) or flexible (SIPs, unreceived chits) in exactly one place, so every screen agrees on the number.',
      },
      {
        title: 'One forecast engine',
        body: 'A single simulation walks the balance forward day by day. The cash-flow forecast, the affordability checker and safe-to-spend all read from it, instead of three slightly different calculations drifting apart.',
      },
      {
        title: 'Code decides, AI explains',
        body: 'Mint’s insight cards are computed in code; the model only writes a short explanation, and its output is validated before display. This came from a real bug: given a bare figure like "FreeMoney: ₹-109123", the model described it as weekly spending.',
      },
      {
        title: 'Cost and abuse controls',
        body: 'Every AI request is counted against an atomic per-user daily allowance and logged. Statement imports have a daily cap, a file-size limit and a cleanup job. Statement emails can only be sent to the user’s own confirmed address.',
      },
      {
        title: 'Date and cycle edge cases',
        body: 'Credit-card statement days are clamped for short months (31 → 30 April / 28 February), and dates are kept in local time — serialising to UTC was silently shifting IST dates back a day.',
      },
      {
        title: 'First paint before the bundle',
        body: 'Visitors arriving from social ads on slow phones were leaving before the app loaded. A lightweight boot shell now renders straight from the HTML, and in-app browsers (such as Instagram’s) are detected so Google sign-in can route through the system browser.',
      },
    ],
    limitations: [
      'Receipt scanning depends on a vision model in the provider’s preview tier; a stable multimodal provider would be needed for guaranteed reliability.',
      'A token-based daily AI budget is measured but not yet enforced — only the request limit is.',
      'Investment values are entered by the user; there are no live market prices.',
      'Bank sync is sandbox-only.',
    ],
    learnings: [
      'Financial software is mostly edge cases — card cycles, partial payments, salary-day timing, time zones. Tests around those paid off more than any feature.',
      'LLMs are good at language and unreliable at arithmetic. Keeping the maths in code made the assistant trustworthy.',
      'Distribution problems are engineering problems too: load time and in-app browsers decided whether ad clicks became users.',
    ],
    links: [{ label: 'Visit moneyplant.online', url: 'https://moneyplant.online' }],
    disclaimer:
      'MoneyPlant and Mint are budgeting tools, not regulated financial advice. Forecasts and safe-to-spend figures are estimates based on the data a user enters.',
  },
  {
    slug: 'recall',
    title: 'Recall',
    anonymizedTitle: 'Recall',
    anonymize: false,
    kind: 'product',
    category: 'Personal knowledge · Save for later · Retrieval',
    tagline: 'Remember what you found.',
    context: 'Independent product · designed and built by me',
    summary:
      'A memory layer for things you save online. Share a link from your phone, and Recall fetches its details, summarises and tags it, files it into a collection, and lets you find it later by describing what you remember — not by remembering the URL.',
    problem:
      'People save reels, videos, posts and articles across a dozen apps, then can’t find them when they need them. Bookmarks and "saved" tabs only work if you remember where you saved something and roughly what it was called.',
    role: 'Solo developer — product design, PWA frontend, database and search design, Edge Function pipeline, AI enrichment and testing.',
    contributions: [
      'Built the installable React PWA, including an Android share-sheet target and an iPhone Shortcut fallback for saving from other apps.',
      'Designed the Postgres schema with Row Level Security on every table and a job table for background processing.',
      'Wrote the metadata → enrichment → embedding pipeline as Supabase Edge Functions.',
      'Implemented hybrid search that combines full-text, trigram and vector similarity using Reciprocal Rank Fusion.',
      'Added AI-suggested collections, guest mode with account claiming, and JSON / CSV export.',
      'Ran the real SQL migrations in tests (PGlite with pgvector) to check RLS isolation, search ranking and the job state machine.',
    ],
    themes: ['Information retrieval', 'Hybrid search', 'Background processing', 'Safe server-side fetching', 'Privacy by default'],
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'PWA + Web Share Target',
      'TanStack Query',
      'Supabase Postgres',
      'pgvector (HNSW)',
      'pg_trgm · tsvector',
      'Supabase Edge Functions (Deno)',
      'gte-small embeddings',
      'Groq API',
      'Vitest · PGlite',
      'Vercel',
    ],
    cardVisual: 'pipeline',
    logo: recallLogo,
    accent: '#8B8AF7',
    diagrams: [
      {
        title: 'Save → process → find',
        conceptual: true,
        nodes: [
          { label: 'Save', detail: 'Paste a link · Android share sheet · iPhone Shortcut' },
          { label: 'Background job', detail: 'Saved instantly; processing claimed as an idempotent job' },
          { label: 'Metadata', detail: 'Official oEmbed first, then robots-respecting page metadata' },
          { label: 'Enrichment', detail: 'Summary, category, tags, collection suggestion' },
          { label: 'Embedding', detail: '384-dimension gte-small vector' },
          { label: 'Hybrid search', detail: 'Full-text + trigram + vector, fused with RRF' },
        ],
        note: 'Conceptual illustration of the pipeline implemented in the Edge Functions. Not a product screenshot.',
      },
    ],
    features: [
      { name: 'Save from anywhere', status: 'implemented', detail: 'Paste a URL (with copied-link pickup), share from Android apps, or use an iPhone Shortcut.' },
      { name: 'Source-aware previews', status: 'implemented', detail: 'YouTube, X and Reddit via their official oEmbed endpoints; general websites via page metadata where robots.txt allows.' },
      { name: 'Instagram & Facebook previews', status: 'partial', detail: 'Caption and author are parsed from Meta’s official oEmbed response. This depends on Meta approving the oEmbed app, which is pending; without it, Recall asks the user for a note.' },
      { name: 'AI summary, category & tags', status: 'implemented', detail: 'One model call returns a summary, one of 20 controlled categories and 3–7 tags. Output is strictly validated.' },
      { name: 'Collections & suggestions', status: 'implemented', detail: 'Collections with one level of sub-collections, automatic filing into existing ones, and "Start a new collection?" suggestions.' },
      { name: 'Natural-language search', status: 'implemented', detail: 'Describe what you remember ("that reel about…"); results combine keyword and semantic matches.' },
      { name: 'Guest mode', status: 'implemented', detail: 'Five free saves without an account; signing up moves them into the new account.' },
      { name: 'Export & account deletion', status: 'implemented', detail: 'JSON / CSV export with spreadsheet-formula injection blocked; full account deletion.' },
    ],
    decisions: [
      {
        title: 'A save never fails because of AI',
        body: 'The item is written first and processing runs in the background. The Edge Function answers 202 immediately; if metadata or AI fails, the save ends up "partial", never lost.',
      },
      {
        title: 'Idempotent background jobs',
        body: 'Jobs are claimed atomically with at most one active job per item, stale jobs are reclaimed after five minutes, and failures retry up to three times. The job functions can only be called with the service role.',
      },
      {
        title: 'Safe server-side fetching',
        body: 'Every outbound fetch allows only http(s) on default ports, resolves DNS and rejects private, loopback and link-local addresses, re-validates on every redirect (maximum three), and caps response size and time. It identifies itself honestly and sends no cookies.',
      },
      {
        title: 'Hybrid search with a similarity floor',
        body: 'Keyword and vector rankings are merged with Reciprocal Rank Fusion (k = 60). A result found only by meaning must reach a cosine similarity of 0.80, so semantic search adds relevant matches without flooding results. If the vector side is unavailable, keyword results still return.',
      },
      {
        title: 'No invented content',
        body: 'With fewer than 40 characters of source text the summary is forced to "Summary unavailable." and the app asks the user for a note. Fields the user has edited are never overwritten by later processing.',
      },
      {
        title: 'Private by default',
        body: 'Row Level Security on every table, anonymous access revoked, search executed with the caller’s own token, and a strict Content Security Policy (script-src \'self\').',
      },
    ],
    limitations: [
      'iOS has no Web Share Target, so iPhone users save via paste or a Shortcut.',
      'Instagram and Facebook previews depend on Meta’s oEmbed approval.',
      'Signed Instagram thumbnail URLs expire; "Refresh details" fetches a new one.',
      'The 384-dimension embedding model is small and English-weighted.',
    ],
    learnings: [
      'Retrieval quality comes from combining signals — keyword search still beats embeddings for exact names and titles.',
      'Designing for failure first (partial saves, retries, idempotent jobs) made the AI parts safe to iterate on.',
      'Using official oEmbed APIs means accepting platform gatekeeping; I chose that over scraping.',
    ],
    links: [],
  },

  // ───────────────────────────── Enterprise work ─────────────────────────────
  {
    slug: 'smartapp-mobile-inventory',
    title: 'SmartApp — Mobile Inventory',
    anonymizedTitle: 'Mobile Inventory App for Handheld Devices',
    anonymize: false,
    kind: 'enterprise',
    category: 'Mobile · Inventory · Hardware integration',
    context: 'AppSure Software Solutions · employer project',
    summary:
      'A mobile inventory app for PDAs and Android handhelds used in warehouse operations, including barcode label printing on Zebra Bluetooth printers.',
    problem:
      'The existing Xamarin.Android app needed to move to a supported platform, and every new transaction screen required a lot of repetitive, hand-written setup.',
    role: 'Developer responsible for the migration, the shared screen architecture, a code-generation tool and printer integration.',
    contributions: [
      'Migrated the legacy Xamarin.Android application to .NET MAUI Android on .NET 9.',
      'Designed a reusable BaseTransactionActivity that removes duplicated code across transaction screens.',
      'Built SmartApp.TransactionGenerator, a console tool that generates transaction classes and XML layouts from menu reference IDs and API names.',
      'Integrated Zebra SDK Bluetooth printing with ZPL barcode label generation.',
      'Implemented stock-taking, local and foreign receipts, local and foreign purchase orders, price checking and preliminary stock counts.',
      'Developed dynamic field rendering, custom adapters and floating action menus.',
    ],
    // CV note: the generator reportedly cut manual setup time by ~70%. Add it back
    // to `contributions` only if you can substantiate the figure.
    themes: ['Platform migration', 'Reusable architecture', 'Code generation', 'Hardware integration'],
    tech: ['.NET 9', '.NET MAUI (Android)', 'C#', 'REST API', 'SQL Server', 'Zebra SDK', 'Bluetooth', 'ZPL'],
    cardVisual: 'device',
    diagrams: [
      {
        title: 'Device to ERP',
        conceptual: true,
        nodes: [
          { label: 'Android handheld', detail: 'PDA / scanner device' },
          { label: '.NET MAUI app', detail: 'BaseTransactionActivity screens' },
          { label: 'REST API', detail: 'Transaction endpoints' },
          { label: 'ERP database', detail: 'SQL Server' },
        ],
        aside: { attachTo: 1, label: 'Zebra printer', detail: 'Bluetooth · ZPL labels' },
      },
    ],
  },
  {
    slug: 'smartschoolapi',
    title: 'SmartSchoolApi — API Modernization',
    anonymizedTitle: 'School Data API Modernization',
    anonymize: false,
    kind: 'enterprise',
    category: 'API modernization · Backend',
    context: 'AppSure Software Solutions · employer project',
    summary:
      'Replaced a legacy PowerBuilder web service with an ASP.NET Core Web API on .NET 9 for secure data exchange between school client applications and the ERP database.',
    problem:
      'School web and mobile clients — maintained by another company — depended on an ageing PowerBuilder service that was hard to maintain and extend.',
    role: 'Developer who reimplemented the service and its security model.',
    contributions: [
      'Reimplemented the service as an ASP.NET Core Web API on .NET 9.',
      'Developed endpoints for student, parent, teacher and fee-related data.',
      'Implemented JWT authentication and role-based authorization.',
      'Prepared the API for integration with web and mobile clients maintained by a third party.',
      'Improved maintainability by moving to a modern, conventional API architecture.',
    ],
    themes: ['Legacy modernization', 'API design', 'Authentication & authorization', 'Third-party integration'],
    tech: ['.NET 9', 'ASP.NET Core Web API', 'C#', 'SQL Server', 'JWT'],
    cardVisual: 'flow',
    diagrams: [
      {
        title: 'Request path',
        conceptual: true,
        nodes: [
          { label: 'School clients', detail: 'Web and mobile apps' },
          { label: 'ASP.NET Core API', detail: '.NET 9' },
          { label: 'Auth', detail: 'JWT · role-based policies' },
          { label: 'ERP database', detail: 'SQL Server' },
        ],
        note: 'Conceptual. Endpoints, schemas and infrastructure are intentionally not shown.',
      },
    ],
  },
  {
    slug: 'smartsuite-erp',
    title: 'SmartSuite ERP',
    anonymizedTitle: 'Multi-industry ERP Platform',
    anonymize: false,
    kind: 'enterprise',
    category: 'Enterprise ERP · School management',
    context: 'AppSure Software Solutions · employer product',
    summary:
      'A multi-industry ERP product. I contributed mainly to the school and self-service modules — admissions, student records, fees, discounts and reporting.',
    problem:
      'Schools need admissions, student records and fee collection to work as one consistent workflow, with the right people seeing and approving the right data.',
    role: 'Contributor to the school and self-service modules within a larger product, with end-to-end exposure across the development life cycle.',
    contributions: [
      'Developed pre-registration and registration functionality for student inquiries and admissions.',
      'Implemented fee collection, discounts and transaction processing.',
      'Worked on masters, transactions and reports within the ERP modules.',
      'Implemented and maintained role-based access for administrative workflows.',
      'Integrated Hangfire background jobs for bulk email notifications, reminders and data processing.',
      'Contributed changes to the shared framework layer.',
    ],
    themes: ['Enterprise workflows', 'Modular architecture', 'Authorization', 'Financial data', 'Background processing'],
    tech: ['ASP.NET Core 5.0', 'C#', 'SQL Server 2014', 'Hangfire'],
    cardVisual: 'stack',
    diagrams: [
      {
        title: 'Admissions to fees',
        conceptual: true,
        nodes: [
          { label: 'Inquiry', detail: 'Pre-registration' },
          { label: 'Registration', detail: 'Student record' },
          { label: 'Fees & discounts', detail: 'Transactions' },
          { label: 'Reports', detail: 'Administrative views' },
        ],
        aside: { attachTo: 2, label: 'Hangfire jobs', detail: 'Reminders · bulk email' },
      },
    ],
    disclaimer: 'SmartSuite is a product of my employer. I describe only the modules I worked on.',
  },
  {
    slug: 'online-payment-enrollment',
    title: 'Online Payment & Enrollment',
    anonymizedTitle: 'Online Payment & Enrollment',
    anonymize: false,
    kind: 'enterprise',
    category: 'Payment integration · Education technology',
    context: 'AppSure Software Solutions · employer project',
    summary:
      'An online registration and enrollment platform for schools in Kuwait, covering assessment fees, enrollment of accepted students, deposits and other school payments.',
    problem:
      'Families needed to register, pay assessment fees, enroll and pay deposits online, with each step depending on the outcome of the previous one.',
    role: 'Developer of the registration and enrollment workflows and their payment integrations.',
    contributions: [
      'Developed online student registration, including assessment-fee payment and scheduling.',
      'Designed post-registration enrollment workflows for accepted students.',
      'Integrated payment flows for fees, deposits and other school-related expenses.',
      'Integrated the KNET and Tap payment APIs.',
    ],
    themes: ['Payment workflows', 'Enrollment state management', 'API integration', 'Reliable transactions'],
    tech: ['ASP.NET Core', 'Web API', 'C#', 'SQL Server', 'KNET API', 'Tap API'],
    cardVisual: 'flow',
    diagrams: [
      {
        title: 'Enrollment workflow',
        conceptual: true,
        nodes: [
          { label: 'Registration', detail: 'Online application' },
          { label: 'Assessment fee', detail: 'KNET / Tap payment' },
          { label: 'Decision', detail: 'Accepted students proceed' },
          { label: 'Enrollment', detail: 'Completion' },
          { label: 'Deposit & fees', detail: 'KNET / Tap payment' },
        ],
      },
    ],
  },
  {
    slug: 'ecommerce-applications',
    title: 'E-Commerce Applications',
    anonymizedTitle: 'E-Commerce Applications',
    anonymize: false,
    kind: 'enterprise',
    category: 'E-commerce · API development',
    context: 'Sysboon Technologies · client projects',
    summary:
      'Three client e-commerce platforms built on nopCommerce, extended with agents and delivery staff alongside vendors, plus Web APIs for their mobile apps.',
    problem:
      'Clients needed marketplace workflows that nopCommerce does not provide out of the box: agents who place orders, delivery staff who fulfil them, and commissions across roles.',
    role: 'Developer customising the platform and building the mobile-facing APIs.',
    contributions: [
      'Developed client-specific e-commerce features on nopCommerce.',
      'Added custom Agent and Delivery entities alongside the existing Vendor model.',
      'Implemented role-based workflows for order processing and last-mile fulfilment.',
      'Built REST APIs for mobile order placement, agent activity tracking and delivery updates.',
      'Supported commission tracking across roles.',
    ],
    themes: ['Platform customization', 'Multi-role workflows', 'Mobile APIs'],
    tech: ['ASP.NET Core 2.0', 'nopCommerce', 'Web API', 'C#', 'SQL Server 2012'],
    cardVisual: 'stack',
    disclaimer: 'nopCommerce is an open-source platform; I built customizations and APIs on top of it.',
  },
  {
    slug: 'gopath',
    title: 'GoPath — Healthcare Services',
    anonymizedTitle: 'At-home Healthcare Services Platform',
    anonymize: false,
    kind: 'enterprise',
    category: 'Healthcare · Backend APIs',
    context: 'Sysboon Technologies · client project',
    summary:
      'A platform for booking at-home medical check-ups and diagnostic tests, with a mobile app for patients and an admin portal for orders, services, providers, phlebotomists and commissions.',
    problem:
      'Bringing tests to patients’ homes means coordinating bookings, service packages and field staff from a single back office.',
    role: 'Full-stack developer; also took part in client discussions, analysis and estimates.',
    contributions: [
      'Developed backend APIs for booking and service scheduling.',
      'Built and contributed to the admin portal for orders, services, providers and staff.',
      'Developed and tested both frontend and backend in C#, ASP.NET MVC, Web API and SQL Server.',
    ],
    themes: ['Booking workflows', 'Admin tooling', 'Mobile APIs'],
    tech: ['ASP.NET MVC', '.NET Framework 4.5', 'ASP.NET Web API', 'C#', 'SQL Server'],
    cardVisual: 'flow',
  },
  {
    slug: 'taxgenie',
    title: 'TaxGenie',
    anonymizedTitle: 'Personal Tax Organiser',
    anonymize: false,
    kind: 'training',
    category: 'Web application · Training project',
    context: 'Training project · about one year',
    summary:
      'A web application for individuals in the United States to record and calculate their taxes through the year — dashboard, expenses, mileage, donations, income, W-2, 1040, deductions, credits and tax calculation.',
    problem: 'Tax data is scattered across the year; collecting it as it happens makes filing simpler.',
    role: 'Frontend-focused developer during training.',
    contributions: [
      'Developed frontend functionality with Angular 7 and Bootstrap.',
      'Built dynamic forms and validation.',
      'Worked on Web API integration and basic backend logic.',
    ],
    themes: ['Forms & validation', 'SPA development'],
    tech: ['Angular 7', 'Bootstrap', '.NET Framework 4.5', 'ASP.NET Web API', 'SQL Server'],
    cardVisual: 'stack',
  },
]

export const displayTitle = (p: Project) => (p.anonymize ? p.anonymizedTitle : p.title)

export const products = projects.filter((p) => p.kind === 'product')
export const workProjects = projects.filter((p) => p.kind !== 'product')
export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)

export const statusLabel: Record<FeatureStatus, string> = {
  implemented: 'Implemented',
  beta: 'Beta',
  experimental: 'Experimental',
  partial: 'Partial',
  planned: 'Planned',
}
