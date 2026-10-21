import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { JOURNEY } from '../config/journey'
import { Reveal } from './Reveal'

export function Journey() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 })

  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">/ 04 — Journey</p>
          <h2 id="journey-title" className="section__title">
            My Developer Journey
          </h2>
          <p className="section__sub">
            A learning path rather than a job history — the stages I&apos;ve moved through while
            growing as a developer.
          </p>
        </Reveal>

        <ol className="timeline" ref={ref}>
          <span className="timeline__track" aria-hidden="true" />
          <motion.span
            className="timeline__fill"
            aria-hidden="true"
            style={reduce ? { scaleY: 1 } : { scaleY: progress }}
          />
          {JOURNEY.map((step, i) => (
            <li key={step.id} className={`timeline__item ${i % 2 ? 'is-right' : ''}`}>
              <span className="timeline__node" aria-hidden="true" />
              <Reveal delay={0.04} y={20}>
                <article className="card timeline__card">
                  <span className="mono timeline__step">Step 0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.text}</p>
                  <ul className="tags">
                    {step.tags.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
