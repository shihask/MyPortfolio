export interface Role {
  company: string
  title: string
  period: string
  start: string // ISO month, for <time>
  end: string | null
  location: string
  summary: string
  highlights: string[]
  tech: string[]
}

export const experience: Role[] = [
  {
    company: 'AppSure Software Solutions Pvt. Ltd.',
    title: 'Software Engineer',
    period: 'April 2021 – Present',
    start: '2021-04',
    end: null,
    location: 'ULCCS LTD SEZ, Kozhikode, Kerala',
    summary:
      'ERP development with a focus on school management, payments, API modernization and mobile applications for handheld devices.',
    highlights: [
      'Designed and optimized ERP functionality using ASP.NET Core and Microsoft SQL Server.',
      'Worked extensively on school management modules covering student management, fee processing, discounts and reporting.',
      'Developed online registration, enrollment and re-enrollment workflows.',
      'Integrated online payment gateways for secure transaction processing.',
      'Contributed across backend, frontend and database design.',
      'Developed mobile applications using Xamarin.Android and .NET MAUI.',
      'Enhanced shared framework components to improve maintainability, scalability and performance.',
      'Worked on background jobs, automated notifications and bulk processing using Hangfire.',
      'Collaborated with cross-functional teams on requirements, deployment and post-release support.',
    ],
    tech: ['ASP.NET Core', 'C#', 'SQL Server', 'Hangfire', '.NET MAUI', 'Xamarin.Android', 'JWT'],
  },
  {
    company: 'Sysboon Technologies',
    title: 'Software Developer',
    period: 'January 2019 – March 2021',
    start: '2019-01',
    end: '2021-03',
    location: 'Calicut, Kerala',
    summary: 'E-commerce customization, mobile-facing Web APIs and a healthcare service platform.',
    highlights: [
      'Developed and customized e-commerce applications using ASP.NET Core and nopCommerce.',
      'Built Web APIs for mobile applications supporting vendors, agents and delivery personnel.',
      'Designed SQL Server solutions using stored procedures, views and triggers.',
      'Contributed to GoPath, a healthcare service platform, using ASP.NET MVC, Web API and SQL Server.',
      'Participated in client discussions, requirement analysis and project estimation.',
    ],
    tech: ['ASP.NET Core', 'ASP.NET MVC', 'Web API', 'nopCommerce', 'SQL Server', 'Angular 7'],
  },
]
