import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, ExternalLink, X } from 'lucide-react'
import type { Project } from '../types'
import { GitHubIcon } from './Icons'
import { ProjectThumb } from './ProjectThumb'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          className="icon-btn modal__close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <ProjectThumb project={project} className="modal__thumb" />

        <div className="modal__body">
          <p className="eyebrow mono">
            {project.kind} · {project.status}
          </p>
          <h3 id="modal-title">{project.title}</h3>
          <p className="modal__desc">{project.description}</p>

          <h4 className="modal__h">Features</h4>
          <ul className="checklist">
            {project.features.map((f) => (
              <li key={f}>
                <Check size={16} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <h4 className="modal__h">Built with</h4>
          <ul className="tags">
            {project.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          <div className="modal__actions">
            {project.demoUrl ? (
              <a
                className="btn btn--primary btn--sm"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="soon">Demo coming soon</span>
            )}
            {project.repoUrl ? (
              <a
                className="btn btn--ghost btn--sm"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon size={16} /> Source Code
              </a>
            ) : (
              <span className="soon">Source code not public yet</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
