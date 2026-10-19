// Grouped skills. Tiers are deliberately coarse — no percentages.
//   core        — used professionally over several years
//   working     — used professionally or in shipped work, less depth
//   exploratory — used in personal products / experiments

export type Tier = 'core' | 'working' | 'exploratory'

export interface SkillGroup {
  title: string
  note?: string
  skills: { name: string; tier: Tier }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'C#', tier: 'core' },
      { name: 'ASP.NET Core', tier: 'core' },
      { name: 'ASP.NET MVC', tier: 'core' },
      { name: 'RESTful Web APIs', tier: 'core' },
      { name: 'JWT authentication', tier: 'working' },
      { name: 'Role-based authorization', tier: 'working' },
      { name: 'Hangfire background jobs', tier: 'working' },
    ],
  },
  {
    title: 'Database & Data Access',
    skills: [
      { name: 'Microsoft SQL Server', tier: 'core' },
      { name: 'Stored procedures, views, triggers', tier: 'core' },
      { name: 'Entity Framework', tier: 'core' },
      { name: 'LINQ', tier: 'core' },
    ],
  },
  {
    title: 'Enterprise Systems',
    skills: [
      { name: 'ERP development', tier: 'core' },
      { name: 'School management workflows', tier: 'core' },
      { name: 'Registration & enrollment', tier: 'core' },
      { name: 'Fee processing & financial workflows', tier: 'core' },
      { name: 'Payment gateway integration (KNET, Tap)', tier: 'working' },
      { name: 'E-commerce customization (nopCommerce)', tier: 'working' },
      { name: 'Legacy service modernization', tier: 'working' },
    ],
  },
  {
    title: 'Mobile & Devices',
    skills: [
      { name: '.NET MAUI (Android)', tier: 'working' },
      { name: 'Xamarin.Android', tier: 'working' },
      { name: 'Zebra SDK', tier: 'working' },
      { name: 'Bluetooth printing', tier: 'working' },
      { name: 'ZPL barcode labels', tier: 'working' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML & CSS', tier: 'core' },
      { name: 'JavaScript', tier: 'working' },
      { name: 'jQuery', tier: 'working' },
      { name: 'Bootstrap', tier: 'working' },
      { name: 'Angular 7', tier: 'working' },
    ],
  },
  {
    title: 'Independent Product Development',
    note: 'Verified in the MoneyPlant and Recall codebases.',
    skills: [
      { name: 'React & TypeScript', tier: 'exploratory' },
      { name: 'Progressive Web Apps', tier: 'exploratory' },
      { name: 'Postgres & Row Level Security', tier: 'exploratory' },
      { name: 'pgvector & hybrid search', tier: 'exploratory' },
      { name: 'LLM API integration (Groq)', tier: 'exploratory' },
    ],
  },
  {
    title: 'Tools & Practices',
    skills: [
      { name: 'Visual Studio', tier: 'core' },
      { name: 'VS Code', tier: 'core' },
      { name: 'Git', tier: 'core' },
      { name: 'TFS', tier: 'working' },
      { name: 'Requirement analysis', tier: 'working' },
      { name: 'Deployment & post-release support', tier: 'working' },
    ],
  },
]

export const tierLabel: Record<Tier, string> = {
  core: 'Core',
  working: 'Working knowledge',
  exploratory: 'Product work',
}
