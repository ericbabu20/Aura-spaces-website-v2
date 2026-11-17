import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ButtonLink } from '../common/ButtonLink'
import { EASE } from '../common/Reveal'
import { HeroDock } from './HeroDock'
import { homeCopy } from '../../content/home'
import { HERO_IMAGES, heroFile, heroSrcSet, type HeroImage, type Hotspot } from '../../content/images'

const { hero } = homeCopy

const ENTRANCE = 1.8 // seconds for the image to settle
const EVENING_HOLD = 4 // seconds of day light after the entrance
const EVENING_FADE = 2.5

function useMedia(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

const MOBILE_MEDIA = '(max-width: 700px)'

// AVIF, then WebP, then JPEG. A separate portrait image is used on phones when one is supplied.
function HeroPicture({ desktop, mobile, priority }: { desktop: HeroImage; mobile: HeroImage | null; priority?: boolean }) {
  const largest = desktop.widths[desktop.widths.length - 1]
  return (
    <picture>
      {mobile ? (
        <>
          <source media={MOBILE_MEDIA} type="image/avif" srcSet={heroSrcSet(mobile, 'avif')} sizes="116vw" />
          <source media={MOBILE_MEDIA} type="image/webp" srcSet={heroSrcSet(mobile, 'webp')} sizes="116vw" />
          <source media={MOBILE_MEDIA} srcSet={heroSrcSet(mobile, 'jpg')} sizes="116vw" />
        </>
      ) : null}
      <source type="image/avif" srcSet={heroSrcSet(desktop, 'avif')} sizes="116vw" />
      <source type="image/webp" srcSet={heroSrcSet(desktop, 'webp')} sizes="116vw" />
      <img
        src={heroFile(desktop, largest, 'jpg')}
        srcSet={heroSrcSet(desktop, 'jpg')}
        sizes="116vw"
        width={desktop.width}
        height={desktop.height}
        alt={desktop.alt}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : { loading: 'lazy' as const })}
      />
    </picture>
  )
}

// Geometry shared by the photo and the hotspot layer, so markers stay pinned to the picture.
function frameStyle(desktop: HeroImage | null, mobile: HeroImage | null): CSSProperties {
  const parse = (value = '50% 50%') => value.split(' ').map((v) => parseFloat(v) / 100)
  const [dx, dy] = parse(desktop?.focus?.desktop)
  const phone = mobile ?? desktop
  const [mx, my] = mobile ? parse(mobile.focus?.desktop) : parse(desktop?.focus?.mobile)
  return {
    '--ratio-d': desktop ? desktop.width / desktop.height : 16 / 9,
    '--ratio-m': phone ? phone.width / phone.height : 9 / 16,
    '--fx-d': dx,
    '--fy-d': dy,
    '--fx-m': mx,
    '--fy-m': my,
  } as CSSProperties
}

interface LayerProps {
  scrollY: MotionValue<number>
  x: MotionValue<number>
  y: MotionValue<number>
  className?: string
  children: ReactNode
  style?: CSSProperties
}

// Scroll parallax > entrance scale > slow drift > pointer parallax > picture frame.
function ImageStack({ scrollY, x, y, className = '', children, style }: LayerProps) {
  return (
    <div className={`hero-clip ${className}`.trim()}>
      <motion.div className="hero-layer" style={{ y: scrollY }}>
        <motion.div
          className="hero-bleed"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: ENTRANCE, ease: EASE }}
        >
          <div className="hero-drift">
            <motion.div className="hero-pointer" style={{ x, y }}>
              <div className="hero-frame" style={style}>
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Hotspots({ spots }: { spots: Hotspot[] }) {
  const reduce = useReducedMotion()
  return (
    <>
      {spots.map((spot, i) => (
        <motion.span
          key={spot.label}
          className="hotspot"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          tabIndex={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0.3 } : { duration: 0.6, ease: EASE, delay: ENTRANCE - 0.4 + i * 0.25 }}
        >
          <span className="hotspot-dot" aria-hidden="true" />
          <span className="hotspot-label glass glass-chip">{spot.label}</span>
        </motion.span>
      ))}
    </>
  )
}

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const finePointer = useMedia('(hover: hover) and (pointer: fine)')
  const isPhone = useMedia(MOBILE_MEDIA)
  const pointerOn = finePointer && !reduce

  const { desktopDay, desktopEvening, mobileDay, mobileEvening } = HERO_IMAGES
  // Evening only plays when it exists for the current screen shape.
  const evening = isPhone ? (mobileDay ? mobileEvening : desktopEvening) : desktopEvening
  const [eveningOn, setEveningOn] = useState(false)
  useEffect(() => {
    if (!evening) return
    const t = window.setTimeout(() => setEveningOn(true), (ENTRANCE + EVENING_HOLD) * 1000)
    return () => window.clearTimeout(t)
  }, [evening])
  // Once the evening light is in, the header switches to its dark glass.
  useEffect(() => {
    if (!eveningOn) return
    const t = window.setTimeout(() => window.dispatchEvent(new Event('scroll')), EVENING_FADE * 500)
    return () => window.clearTimeout(t)
  }, [eveningOn])

  // With reduced motion the entrance collapses to one short fade with no stagger.
  const enter = (duration: number, delay = 0) => (reduce ? { duration: 0.3 } : { duration, ease: EASE, delay })

  // Scroll: the photo moves at half the page speed.
  const { scrollY } = useScroll()
  const imageScrollY = useTransform(scrollY, (v) => (reduce ? 0 : Math.min(v, 2000) * 0.5))

  // Pointer: the photo shifts up to 12px away from the pointer, hotspots up to 6px.
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const sx = useSpring(nx, { stiffness: 60, damping: 20 })
  const sy = useSpring(ny, { stiffness: 60, damping: 20 })
  const imgX = useTransform(sx, (v) => v * -12)
  const imgY = useTransform(sy, (v) => v * -12)
  const spotX = useTransform(sx, (v) => v * -6)
  const spotY = useTransform(sy, (v) => v * -6)

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!pointerOn || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    nx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    ny.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const onPointerLeave = () => {
    nx.set(0)
    ny.set(0)
  }

  const frame = frameStyle(desktopDay, mobileDay)
  const spots = desktopDay?.hotspots?.desktop ?? []
  const showSpots = spots.length > 0 && !isPhone

  // Phones: a slim booking bar appears once the hero has scrolled away.
  const [pastHero, setPastHero] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section
        ref={ref}
        className={`hero-full${desktopDay ? '' : ' is-placeholder'}${desktopDay?.textTone === 'dark' && !eveningOn ? ' is-dark-text' : ''}`}
        aria-label="Introduction"
        data-header-tone={eveningOn ? 'dark' : undefined}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <ImageStack scrollY={imageScrollY} x={imgX} y={imgY} style={frame}>
          <motion.div
            className="hero-photo"
            initial={reduce ? false : { filter: 'blur(14px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={enter(ENTRANCE * 0.8)}
          >
            {desktopDay ? <HeroPicture desktop={desktopDay} mobile={mobileDay} priority /> : <div className="hero-placeholder" />}
          </motion.div>
          {evening && desktopEvening ? (
            <motion.div
              className="hero-photo"
              initial={{ opacity: 0 }}
              animate={{ opacity: eveningOn ? 1 : 0 }}
              transition={{ duration: EVENING_FADE, ease: 'easeInOut' }}
            >
              <HeroPicture desktop={desktopEvening} mobile={mobileEvening} />
            </motion.div>
          ) : null}
        </ImageStack>

        <div className="hero-scrim" aria-hidden="true" />

        {showSpots ? (
          <ImageStack scrollY={imageScrollY} x={spotX} y={spotY} className="hero-hotspots" style={frame}>
            <Hotspots spots={spots} />
          </ImageStack>
        ) : null}

        <div className="hero-content">
          <div className="hero-copy">
            <motion.span
              className="eyebrow hero-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.6, 0.1)}
            >
              {hero.eyebrow}
            </motion.span>

            <h1 className="hero-title">
              <span className="sr-only">{hero.title}</span>
              <span aria-hidden="true">
                {hero.titleLines.map((line, i) => (
                  <span key={line} className="hero-line">
                    <motion.span
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={enter(0.9, 0.15 + i * 0.12)}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.7, 0.3)}
            >
              {hero.lead}
            </motion.p>

            <motion.div
              className="hero-actions hero-full-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(0.7, 0.4)}
            >
              <ButtonLink to={hero.primary.to} variant={desktopDay?.textTone === 'dark' && !eveningOn ? 'primary' : 'paper'}>
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink to={hero.secondary.to} variant="glass">
                {hero.secondary.label}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            className="hero-dock-wrap"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.8, 0.9)}
          >
            <HeroDock />
          </motion.div>
        </div>

        {desktopDay?.concept ? (
          <motion.span
            className="glass glass-chip hero-concept"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={enter(0.6, 1)}
          >
            Design concept
          </motion.span>
        ) : null}
      </section>

      <div className={`sticky-book${pastHero ? ' is-visible' : ''}`} aria-hidden={!pastHero}>
        <ButtonLink to={hero.stickyCta.to} variant="glass" className="sticky-book-btn" tabIndex={pastHero ? 0 : -1}>
          {hero.stickyCta.label}
          <span aria-hidden="true">→</span>
        </ButtonLink>
      </div>
    </>
  )
}
