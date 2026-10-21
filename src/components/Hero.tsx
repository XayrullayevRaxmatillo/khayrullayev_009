import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { getSocial } from '../config/site'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { Magnetic } from './Magnetic'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const BADGES = [
  { label: 'React', cls: 'badge--a' },
  { label: 'TypeScript', cls: 'badge--b' },
  { label: 'Node.js', cls: 'badge--c' },
  { label: 'Express', cls: 'badge--d' },
  { label: 'MongoDB', cls: 'badge--e' },
]

function HeroVisual() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 18 })
  const sy = useSpring(my, { stiffness: 70, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-7, 7])
  const rotX = useTransform(sy, [-1, 1], [6, -6])
  const bx = useTransform(sx, [-1, 1], [-14, 14])
  const by = useTransform(sy, [-1, 1], [-10, 10])

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      mx.set(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2)))
      my.set(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2)))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, mx, my])

  return (
    <div className="hero-visual" ref={ref} aria-hidden="true">
      <div className="hero-visual__aura" />

      <svg className="hero-visual__lines" viewBox="0 0 520 460" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <path className="flow flow--1" d="M70 60 C 150 120, 170 170, 250 220" />
        <path className="flow flow--2" d="M460 80 C 390 130, 350 170, 300 220" />
        <path className="flow flow--3" d="M60 390 C 140 340, 190 290, 250 250" />
        <path className="flow flow--4" d="M455 395 C 400 350, 350 300, 300 255" />
        <path className="flow flow--5" d="M260 20 C 262 90, 258 140, 262 200" />
      </svg>

      <motion.div
        className="editor float"
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      >
        <div className="editor__bar">
          <span className="dot dot--r" />
          <span className="dot dot--y" />
          <span className="dot dot--g" />
          <span className="editor__file mono">developer.ts</span>
        </div>
        <pre className="editor__code mono">
          <code>
            <span className="k">const</span> <span className="v">developer</span> = {'{'}
            {'\n'}  name: <span className="s">&quot;Rahmatilloh&quot;</span>,
            {'\n'}  role: <span className="s">&quot;Full Stack&quot;</span>,
            {'\n'}  stack: [<span className="s">&quot;React&quot;</span>, <span className="s">&quot;Node.js&quot;</span>],
            {'\n'}  learning: <span className="k">true</span>,
            {'\n'}{'}'}
            {'\n\n'}
            <span className="c">{'// Write clean code.'}</span>
            {'\n'}
            <span className="k">await</span> <span className="f">build</span>(<span className="v">ideas</span>)
            <span className="caret" />
          </code>
        </pre>
      </motion.div>

      {BADGES.map((b, i) => (
        <motion.span
          key={b.label}
          className={`tech-badge ${b.cls}`}
          style={reduce ? undefined : { x: bx, y: by }}
        >
          <span className="tech-badge__inner" style={{ animationDelay: `${i * -1.1}s` }}>
            {b.label}
          </span>
        </motion.span>
      ))}
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const github = getSocial('github')
  const linkedin = getSocial('linkedin')

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--v" />
        <div className="hero__orb hero__orb--b" />
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__copy"
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          <motion.p variants={item} className="status-badge">
            <span className="status-badge__dot" aria-hidden="true" />
            FULL STACK DEVELOPER · OPEN TO OPPORTUNITIES
          </motion.p>

          <motion.h1 variants={item} id="hero-title" className="hero__title">
            Building <span className="gradient-text">Digital Experiences</span> That Matter.
          </motion.h1>

          <motion.p variants={item} className="hero__lead">
            I&apos;m Rahmatilloh Xayrullayev, a developer passionate about building modern web
            applications, intuitive interfaces, and reliable backend systems.
          </motion.p>

          <motion.div variants={item} className="hero__cta">
            <Magnetic>
              <a href="#projects" className="btn btn--primary">
                Explore My Work <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn--ghost">
                Let&apos;s Connect
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="hero__social">
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn tooltip"
              aria-label="GitHub profile (opens in a new tab)"
              data-tip="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn tooltip"
              aria-label="LinkedIn profile (opens in a new tab)"
              data-tip="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__art"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll to the about section">
        <span className="scroll-hint__label mono">SCROLL</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  )
}
