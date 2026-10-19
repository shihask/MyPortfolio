// Central site configuration. Edit this file to change personal details.
//
// Privacy: the phone number is deliberately NOT stored here. It is read from
// VITE_CONTACT_PHONE and only rendered when VITE_SHOW_PHONE is "true"
// (see .env.example). When unset, it never reaches the bundle.

const env = import.meta.env

export interface SocialLink {
  label: string
  url: string
}

export const site = {
  name: 'Muhammed Shihas K',
  shortName: 'Shihas',
  role: 'Software Engineer',
  headline: '.NET Developer · Software Engineer · Enterprise Applications & Product Development',
  heroTitle: 'Building reliable software. Turning complex workflows into useful products.',
  heroIntro:
    "I'm Muhammed Shihas K, a software engineer with around seven years of experience building enterprise applications, ERP modules, APIs, payment workflows, and mobile solutions. Alongside my professional work, I build independent products focused on practical problems.",
  experienceYears: 'around seven years',
  location: 'Kozhikode, Kerala, India',
  email: 'm.shihask@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/muhammed-shihas-k-70960b18a/',

  /** Empty on purpose — set a real profile URL to show it. Never guess one. */
  github: '' as string,

  /** Path or URL to a resume PDF without personal details (DOB/address). Empty hides the button. */
  resumeUrl: '' as string,

  phone: {
    show: env.VITE_SHOW_PHONE === 'true' && Boolean(env.VITE_CONTACT_PHONE),
    value: (env.VITE_SHOW_PHONE === 'true' ? env.VITE_CONTACT_PHONE : '') ?? '',
  },

  /** Deployed origin, used for absolute URLs. */
  siteUrl: (env.VITE_SITE_URL || 'https://shihas.online') as string,

  education: {
    degree: 'B.Tech in Mechanical Engineering',
    school: 'MES College of Engineering, Kuttippuram',
    university: 'University of Calicut',
    period: '2014 – 2018',
  },

  seo: {
    title: 'Muhammed Shihas K — .NET Developer & Software Engineer',
    description:
      'Software engineer with around seven years of experience building enterprise applications, ERP modules, APIs, payment workflows and mobile solutions — and the builder of MoneyPlant and Recall.',
  },

  footerLine: 'Building useful software, one workflow at a time.',
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'products', label: 'Products' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const
