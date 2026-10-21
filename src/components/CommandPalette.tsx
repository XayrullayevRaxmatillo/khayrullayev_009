import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CornerDownLeft, Search } from 'lucide-react'
import { NAV_ITEMS, SITE, SOCIAL_LINKS } from '../config/site'

interface Command {
  id: string
  label: string
  group: 'Navigate' | 'Links'
  run: () => void
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onToggleTheme: () => void
}

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function CommandPalette({ open, onClose, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Command[]>(
    () => [
      ...NAV_ITEMS.map<Command>((n) => ({
        id: `nav-${n.id}`,
        label: `Go to ${n.label}`,
        group: 'Navigate',
        run: () => goTo(n.id),
      })),
      {
        id: 'nav-github',
        label: 'Go to GitHub activity',
        group: 'Navigate',
        run: () => goTo('github'),
      },
      {
        id: 'theme',
        label: 'Toggle light / dark theme',
        group: 'Navigate',
        run: onToggleTheme,
      },
      ...SOCIAL_LINKS.map<Command>((s) => ({
        id: `link-${s.id}`,
        label: s.id === 'email' ? `Email ${SITE.email}` : `Open ${s.label}`,
        group: 'Links',
        run: () => {
          if (s.external) window.open(s.href, '_blank', 'noopener,noreferrer')
          else window.location.href = s.href
        },
      })),
    ],
    [onToggleTheme],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      window.setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  const run = (c: Command | undefined) => {
    if (!c) return
    onClose()
    window.setTimeout(c.run, 120)
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(filtered[index])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop modal-backdrop--top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="palette__search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
              />
              <kbd className="kbd">Esc</kbd>
            </div>

            <ul id="palette-list" className="palette__list" role="listbox">
              {filtered.length === 0 && <li className="palette__empty muted">No results.</li>}
              {filtered.map((c, i) => (
                <li
                  key={c.id}
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === index}
                  className={`palette__item ${i === index ? 'is-active' : ''}`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  <span className="palette__group mono muted">{c.group}</span>
                  {i === index && <CornerDownLeft size={14} aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
