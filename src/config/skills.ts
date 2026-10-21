import type { SkillCategory } from '../types'

/**
 * Configurable list of technologies. This is a list of tools used in
 * projects, not a claim of expert-level proficiency in each one.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Responsive, accessible interfaces.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'React Router', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs and server-side logic.',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Auth & authorization', 'JWT', 'Middleware'],
  },
  {
    id: 'database',
    title: 'Database',
    blurb: 'Modelling and querying data.',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL'],
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'Everyday developer workflow.',
    items: ['Git', 'GitHub', 'Postman', 'npm', 'Vite'],
  },
]
