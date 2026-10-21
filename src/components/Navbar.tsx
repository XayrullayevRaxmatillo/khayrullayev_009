import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Menu, X } from 'lucide-react'
import { NAV_ITEMS, SITE } from '../config/site'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import type { SectionId } from '../types'
import { ThemeToggle } from './ThemeToggle'

const SECTION_IDS: SectionId[] = NAV_ITEMS.map((n) => n.id)

interface NavbarProps {
  theme: Theme
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="logo" aria-label={`${SITE.name} — home`}>
          <span className="logo__mark">RH</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${active === item.id ? 'is-active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
              {active === item.id && <motion.span layoutId="nav-pill" className="nav__pill" />}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn tooltip nav__palette"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            data-tip="Ctrl / ⌘ + K"
          >
            <Command size={18} aria-hidden="true" />
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="btn btn--primary btn--sm nav__cta">
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="icon-btn nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <nav aria-label="Mobile">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={close}
                  className={`mobile-menu__link ${active === item.id ? 'is-active' : ''}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <span className="mono muted">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={close} className="btn btn--primary btn--block">
                Let&apos;s Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
