import { BookOpenCheck, Code2, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SITE } from '../config/site'
import { Reveal } from './Reveal'

interface AboutCard {
  icon: LucideIcon
  title: string
  text: string
  index: string
}

const CARDS: AboutCard[] = [
  {
    icon: Code2,
    index: '01',
    title: 'Frontend Development',
    text: 'Building responsive, accessible, and engaging interfaces.',
  },
  {
    icon: Server,
    index: '02',
    title: 'Backend Development',
    text: 'Designing APIs, server-side logic, and database-driven applications.',
  },
  {
    icon: BookOpenCheck,
    index: '03',
    title: 'Continuous Learning',
    text: 'Exploring modern tools, improving code quality, and developing real projects.',
  },
]

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">/ 01 — About</p>
          <h2 id="about-title" className="section__title">
            A Little About Me
          </h2>
        </Reveal>

        <div className="about__layout">
          <Reveal delay={0.05} className="about__intro">
            <p className="lead">
              I&apos;m a developer focused on learning, building, and improving every day. I enjoy
              turning ideas into practical digital products and understanding how applications work
              from the frontend to the backend.
            </p>
            <blockquote className="philosophy">
              <span className="philosophy__mark" aria-hidden="true">
                “
              </span>
              {SITE.tagline}
            </blockquote>
          </Reveal>

          <ul className="about__cards">
            {CARDS.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={0.08 * i} className="card-wrap">
                  <article className="card about-card">
                    <span className="about-card__index mono" aria-hidden="true">
                      {c.index}
                    </span>
                    <span className="about-card__icon">
                      <c.icon size={22} aria-hidden="true" />
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
