import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(true)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Advanced physics-based spring tracker
  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 })
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouchDevice || prefersReducedMotion) return

    setHidden(false)

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, [data-cursor-hover]')) {
        setHovered(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, [data-cursor-hover]')) {
        setHovered(false)
      }
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)
    
    const onMouseLeaveWindow = () => setHidden(true)
    const onMouseEnterWindow = () => setHidden(false)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
    }
  }, [mouseX, mouseY])

  if (hidden) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 72 : 16,
          height: hovered ? 72 : 16,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ 
          width: { type: 'spring', stiffness: 300, damping: 20 },
          height: { type: 'spring', stiffness: 300, damping: 20 },
          scale: { type: 'spring', stiffness: 400, damping: 25 }
        }}
      />
    </>
  )
}
