export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'journey' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'telegram' | 'email'
  label: string
  handle: string
  href: string
  external: boolean
}

export type SkillCategoryId = 'frontend' | 'backend' | 'database' | 'tools'

export interface SkillCategory {
  id: SkillCategoryId
  title: string
  blurb: string
  items: string[]
}

export type ProjectCategory = 'Full Stack' | 'MERN' | 'E-commerce'

export type ProjectStatus = 'In progress' | 'Concept' | 'Completed'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  kind: string
  status: ProjectStatus
  summary: string
  description: string
  /** Only list features that are actually implemented. */
  features: string[]
  tags: string[]
  /** Accent hue pair used by the generated preview when no screenshot exists. */
  accent: [string, string]
  /** Path or URL of a genuine screenshot. Leave undefined until you have one. */
  screenshot?: string
  /** Leave undefined if there is no public repository / demo. Never invent URLs. */
  repoUrl?: string
  demoUrl?: string
}

export interface JourneyStep {
  id: string
  title: string
  text: string
  tags: string[]
}

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  location: string | null
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  updated_at: string
}
