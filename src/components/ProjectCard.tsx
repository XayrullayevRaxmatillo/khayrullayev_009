import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '../types'
import { GitHubIcon } from './Icons'
import { ProjectThumb } from './ProjectThumb'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      layout
      className="card project-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="project-card__media">
        <ProjectThumb project={project} />
        <span className={`status status--${project.status.toLowerCase().replace(' ', '-')}`}>
          {project.status}
        </span>
      </div>

      <div className="project-card__body">
        <p className="eyebrow mono">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="muted">{project.summary}</p>

        <ul className="tags" aria-label={`Technologies used in ${project.title}`}>
          {project.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onOpen(project)}>
            Details <ArrowUpRight size={16} aria-hidden="true" />
          </button>

          {project.demoUrl ? (
            <a
              className="btn btn--ghost btn--sm"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : (
            <span className="soon">Demo coming soon</span>
          )}

          {project.repoUrl && (
            <a
              className="icon-btn tooltip"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code (opens in a new tab)`}
              data-tip="Source code"
            >
              <GitHubIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
