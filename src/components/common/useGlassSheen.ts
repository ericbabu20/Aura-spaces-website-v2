import { useEffect } from 'react'

// One listener for the whole site: the glass surface under a mouse pointer gets --sheen-x/--sheen-y,
// which positions its soft highlight (see .glass::after in site.css). Off for touch and reduced motion.
export function useGlassSheen() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last: PointerEvent | null = null

    const apply = () => {
      frame = 0
      if (!last) return
      const target = last.target instanceof Element ? last.target.closest<HTMLElement>('.glass') : null
      if (!target) return
      const r = target.getBoundingClientRect()
      target.style.setProperty('--sheen-x', `${last.clientX - r.left}px`)
      target.style.setProperty('--sheen-y', `${last.clientY - r.top}px`)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !fine.matches || reduce.matches) return
      last = e
      if (!frame) frame = requestAnimationFrame(apply)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
}
