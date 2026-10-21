import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { CursorGlow } from './components/CursorGlow'
import { Footer } from './components/Footer'
import { GitHubActivity } from './components/GitHubActivity'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Navbar } from './components/Navbar'
import { NotFound } from './components/NotFound'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { useTheme } from './hooks/useTheme'

function isHomePath(): boolean {
  const p = window.location.pathname
  return p === '/' || p === '' || p === '/index.html'
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const openPalette = useCallback(() => setPaletteOpen(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!isHomePath()) return <NotFound />

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Navbar theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} onToggleTheme={toggle} />
    </>
  )
}
