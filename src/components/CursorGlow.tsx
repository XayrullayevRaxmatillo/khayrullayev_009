import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** Soft ambient glow that follows the pointer. Desktop (fine pointer) only. */
export function CursorGlow() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches && !reduce)
    const onChange = () => setEnabled(mq.matches && !reduce)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 260)
      y.set(e.clientY - 260)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />
}
