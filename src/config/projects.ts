import type { Project } from '../types'

/**
 * Add new projects here. Rules:
 *  - repoUrl / demoUrl: only set when a real, public URL exists.
 *  - screenshot: put an image in /public/projects and reference it, e.g. '/projects/ustatop.webp'.
 *  - features: list only what is actually implemented.
 */
export const PROJECTS: Project[] = [
  {
    id: 'ustatop',
    title: 'UstaTop',
    category: 'Full Stack',
    kind: 'Full Stack Web Application',
    status: 'In progress',
    summary: 'A platform concept for connecting users with service professionals.',
    description:
      'UstaTop is a services marketplace idea: people looking for help find skilled professionals, and professionals present what they offer. It is the project where I practise the whole stack together — interface, API and database.',
    features: [
      'Separate user and service-provider roles',
      'Backend API with database integration',
      'Service categories and listings',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    accent: ['#8B5CF6', '#38BDF8'],
  },
  {
    id: 'restaurant-management',
    title: 'Restaurant Management System',
    category: 'MERN',
    kind: 'MERN Stack Application',
    status: 'In progress',
    summary: 'Manage menu items and categories from a responsive dashboard.',
    description:
      'A management interface for a restaurant: create, read, update and delete menu items, organise them into categories, and see category data populated on each item through Mongoose relations.',
    features: [
      'Menu item CRUD',
      'Category management',
      'Category relationships with populated data',
      'Responsive management dashboard',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Mongoose'],
    accent: ['#38BDF8', '#22D3A6'],
  },
  {
    id: 'full-stack-store',
    title: 'Full Stack Store',
    category: 'E-commerce',
    kind: 'E-commerce Application',
    status: 'Concept',
    summary: 'An online store with product listings, categories and authentication.',
    description:
      'An e-commerce practice project covering the core of a store: browsing products by category, user authentication and product management on the backend.',
    features: ['Product listings', 'Categories', 'Authentication', 'Product management'],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    accent: ['#A78BFA', '#F472B6'],
  },
]

export const PROJECT_CATEGORIES = ['All', 'Full Stack', 'MERN', 'E-commerce'] as const
