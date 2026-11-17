import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/site.config'

// Controls exposed by the promo file (same origin, so the parent page can reach them).
type PromoWindow = Window & { __tl?: { play: () => void; pause: () => void } }

// The promo loads only when it scrolls into view, and its space is reserved beforehand so
// nothing shifts. Phones get the 9:16 layout. Reduced-motion users get a play button instead of autoplay.
export function PromoEmbed() {
  const frameRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [vertical, setVertical] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 640px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setVertical(mobile.matches)
      setReduce(motionQuery.matches)
    }
    sync()
    mobile.addEventListener('change', sync)
    motionQuery.addEventListener('change', sync)
    return () => {
      mobile.removeEventListener('change', sync)
      motionQuery.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const loadNow = reduce ? started : inView
  const src = `${siteConfig.promoPath}${vertical ? '?format=vertical' : ''}`

  const togglePlayback = () => {
    const win = iframeRef.current?.contentWindow as PromoWindow | null | undefined
    const tl = win?.__tl
    if (!tl) return
    if (paused) tl.play()
    else tl.pause()
    setPaused(!paused)
  }

  return (
    <figure className="promo">
      <div ref={frameRef} className={`promo-frame${vertical ? ' is-vertical' : ''}`}>
        {loadNow ? (
          <iframe
            ref={iframeRef}
            title="Aura Platform promo animation showing energy use and home devices"
            src={src}
          />
        ) : reduce ? (
          <button type="button" className="promo-poster" onClick={() => setStarted(true)}>
            <span className="promo-play" aria-hidden="true">▶</span>
            <span>Play the Aura Platform animation</span>
          </button>
        ) : null}
      </div>
      <figcaption className="promo-caption">
        {loadNow ? (
          <button type="button" className="promo-toggle" onClick={togglePlayback}>
            {paused ? 'Play animation' : 'Pause animation'}
          </button>
        ) : null}
        <span>Figures shown are illustrative.</span>
      </figcaption>
    </figure>
  )
}
