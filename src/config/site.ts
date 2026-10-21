import type { NavItem, SocialLink } from '../types'

export const SITE = {
  name: 'Rahmatilloh Xayrullayev',
  shortName: 'RH',
  title: 'Full Stack Developer',
  email: 'xayrullayevrahmatilloh@gmail.com',
  githubUser: 'XayrullayevRaxmatillo',
  existingPortfolio: 'https://khayrullayev-009.vercel.app/',
  tagline: 'Write clean code. Solve real problems. Keep learning.',
} as const

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@XayrullayevRaxmatillo',
    href: 'https://github.com/XayrullayevRaxmatillo',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'rahmatilloh-xayrullayev',
    href: 'https://www.linkedin.com/in/rahmatilloh-xayrullayev-a76012444/',
    external: true,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    handle: '@khayrullayev_009',
    href: 'https://t.me/khayrullayev_009',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'xayrullayevrahmatilloh@gmail.com',
    href: 'mailto:xayrullayevrahmatilloh@gmail.com',
    external: false,
  },
]

export function getSocial(id: SocialLink['id']): SocialLink {
  const found = SOCIAL_LINKS.find((s) => s.id === id)
  if (!found) throw new Error(`Unknown social link: ${id}`)
  return found
}
