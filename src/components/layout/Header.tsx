import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import logoDarkUrl from '../../assets/brand/AuraSpaces-Logo-H-Black.svg'
import logoLightUrl from '../../assets/brand/AuraSpaces-Logo-H-White.svg'
import { headerCta, primaryNav } from '../../content/navigation'
import { ButtonLink } from '../common/ButtonLink'
import { EASE } from '../common/Reveal'

// Vertical point (px from the top of the viewport) where the header bar sits.
const PROBE_Y = 52

export function Header() {
  const [overDark, setOverDark] = useState(false)
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Dark glass over sections marked data-header-tone="dark" (the hero, dark bands), light glass elsewhere.
  // A layout effect, so the first paint already has the right tone (no light-to-dark flash on load).
  useLayoutEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-header-tone="dark"]')).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= PROBE_Y && r.bottom >= PROBE_Y
      })
      setOverDark(dark)
      setCompact(window.scrollY > 24)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    // Scroll restoration can move the page just after a route change, so check once more.
    const settle = window.setTimeout(check, 60)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(settle)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock page scroll while the mobile menu is open, and close it with Escape.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const dark = overDark || menuOpen

  return (
    <>
    <motion.header
      className={`site-header ${dark ? 'is-dark' : 'is-light'}${compact && !menuOpen ? ' is-compact' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* `layout` morphs the capsule when it shrinks on scroll; children keep their shape. */}
      <motion.div layout transition={{ type: 'spring', stiffness: 260, damping: 32 }} className="header-bar glass glass-bar">
        <motion.span layout="position" className="header-slot">
        <Link to="/" className="logo" aria-label="Aura Spaces, home">
          <img src={logoLightUrl} alt="" className="logo-img logo-on-dark" />
          <img src={logoDarkUrl} alt="" className="logo-img logo-on-light" />
        </Link>
        </motion.span>

        <motion.nav layout="position" className="nav-links" aria-label="Main">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </motion.nav>

        <motion.div layout="position" className="header-actions">
          <ButtonLink to={headerCta.to} variant={dark ? 'paper' : 'primary'} className="header-cta">
            {headerCta.label}
          </ButtonLink>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="menu-lines" aria-hidden="true" />
          </button>
        </motion.div>
      </motion.div>
    </motion.header>

    {/* The menu sits outside the header. A backdrop blur on the header would otherwise
        trap this fixed layer, so the links spill onto the page with no background. */}
    <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' open' : ''}`} hidden={!menuOpen}>
      <nav aria-label="Mobile">
        {primaryNav.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
            {item.label}
          </NavLink>
        ))}
        <NavLink to={headerCta.to} onClick={() => setMenuOpen(false)} className="mobile-cta">
          {headerCta.label}
        </NavLink>
      </nav>
    </div>
    </>
  )
}
