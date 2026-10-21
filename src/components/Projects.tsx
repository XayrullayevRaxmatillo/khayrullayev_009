import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { Search } from 'lucide-react'
import { PROJECTS, PROJECT_CATEGORIES } from '../config/projects'
import type { Project } from '../types'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { Reveal } from './Reveal'

type Filter = (typeof PROJECT_CATEGORIES)[number]

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      if (filter !== 'All' && p.category !== filter) return false
      if (!q) return true
      const haystack = [p.title, p.summary, p.kind, ...p.tags].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [filter, query])

  const close = useCallback(() => setSelected(null), [])

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">/ 03 — Projects</p>
          <h2 id="projects-title" className="section__title">
            Featured Projects
          </h2>
          <p className="section__sub">
            Projects I&apos;m building to learn the full stack. Links appear only where a public
            repository or demo exists.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="toolbar">
          <div className="filters" role="group" aria-label="Filter projects by category">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter ${filter === c ? 'is-active' : ''}`}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects or tech…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </Reveal>

        <p className="sr-only" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
        </p>

        <LayoutGroup>
          <div className="projects__grid">
            <AnimatePresence initial={false}>
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {visible.length === 0 && (
          <div className="empty">
            <p>No projects match your search.</p>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                setFilter('All')
                setQuery('')
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
