import { motion } from 'framer-motion'
import { Database, LayoutTemplate, Server, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SKILL_CATEGORIES } from '../config/skills'
import type { SkillCategoryId } from '../types'
import { Reveal } from './Reveal'

const ICONS: Record<SkillCategoryId, LucideIcon> = {
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  tools: Wrench,
}

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">/ 02 — Tech stack</p>
          <h2 id="skills-title" className="section__title">
            Tools I Build With
          </h2>
          <p className="section__sub">
            The technologies I use in my projects, grouped by where they fit in an application.
          </p>
        </Reveal>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.id]
            return (
              <Reveal key={cat.id} delay={0.07 * i} className="card-wrap">
                <article className={`card skill-card skill-card--${cat.id}`}>
                  <header className="skill-card__head">
                    <span className="skill-card__icon">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{cat.title}</h3>
                      <p className="muted">{cat.blurb}</p>
                    </div>
                  </header>
                  <ul className="chips">
                    {cat.items.map((name) => (
                      <motion.li
                        key={name}
                        className="chip"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      >
                        <span className="chip__dot" aria-hidden="true" />
                        {name}
                      </motion.li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
