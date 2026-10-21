import type { JourneyStep } from '../types'

// No dates are shown on purpose: exact dates have not been verified.
export const JOURNEY: JourneyStep[] = [
  {
    id: 'foundations',
    title: 'Web foundations',
    text: 'Started with the building blocks of the web: semantic HTML, modern CSS and JavaScript.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'frontend',
    title: 'Frontend development',
    text: 'Moved into component-based interfaces with React and TypeScript, focusing on structure, state and responsive layouts.',
    tags: ['React', 'TypeScript', 'React Router'],
  },
  {
    id: 'backend',
    title: 'Backend development',
    text: 'Learned to build REST APIs with Node.js and Express, add authentication with JWT and model data in MongoDB.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    id: 'projects',
    title: 'Personal projects',
    text: 'Putting everything together in real projects: UstaTop, a restaurant management system and an online store.',
    tags: ['MERN', 'REST', 'Git'],
  },
  {
    id: 'learning',
    title: 'Ongoing learning',
    text: 'Still improving every day: code quality, new tools and a deeper understanding of how the frontend and backend fit together.',
    tags: ['PostgreSQL', 'Clean code'],
  },
]
