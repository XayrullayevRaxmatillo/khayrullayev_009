import type { CSSProperties } from 'react'
import type { Project } from '../types'

interface ProjectThumbProps {
  project: Project
  className?: string
}

/**
 * Shows the real screenshot when one is configured. Otherwise renders an
 * illustrative, clearly generic UI wireframe — not a fake screenshot.
 */
export function ProjectThumb({ project, className }: ProjectThumbProps) {
  if (project.screenshot) {
    return (
      <img
        className={`thumb thumb--img ${className ?? ''}`}
        src={project.screenshot}
        alt={`Screenshot of the ${project.title} application`}
        loading="lazy"
        decoding="async"
        width={800}
        height={500}
      />
    )
  }

  const style = { '--a': project.accent[0], '--b': project.accent[1] } as CSSProperties

  return (
    <div
      className={`thumb thumb--art ${className ?? ''}`}
      style={style}
      role="img"
      aria-label={`Illustrative preview for ${project.title}. A real screenshot has not been added yet.`}
    >
      <div className="thumb__glow" />
      <div className="thumb__window">
        <div className="thumb__bar">
          <i />
          <i />
          <i />
        </div>
        <div className="thumb__body">
          <div className="thumb__side">
            <b />
            <b />
            <b />
            <b />
          </div>
          <div className="thumb__main">
            <div className="thumb__row thumb__row--title" />
            <div className="thumb__tiles">
              <span />
              <span />
              <span />
            </div>
            <div className="thumb__row" />
            <div className="thumb__row thumb__row--short" />
          </div>
        </div>
      </div>
      <span className="thumb__label mono">{project.kind}</span>
    </div>
  )
}
