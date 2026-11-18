import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { portalCopy } from '../../content/portal'

const d = portalCopy.diagram

// The system, drawn in the site's own type rather than as a picture.
// Connector dashes move once the diagram is on screen, and stay still when motion is reduced.
export function PortalDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  return (
    <div ref={ref} className={`portal-diagram${live ? ' is-live' : ''}`}>
      <div className="portal-diagram-row">
        <article className="glass glass-panel glass-frost portal-box">
          <p className="eyebrow">{d.homeLabel}</p>
          <h3 className="h3">{d.devicesTitle}</h3>
          <p>{d.devicesText}</p>
          <span className="portal-down" aria-hidden="true" />
          <h3 className="h3">{d.hubTitle}</h3>
          <p>{d.hubText}</p>
        </article>

        <div className="portal-bridge" aria-hidden="true">
          <svg className="portal-secure" viewBox="0 0 120 16" focusable="false">
            <line x1="0" y1="8" x2="120" y2="8" />
          </svg>
          <span>{d.linkLabel}</span>
          <svg className="portal-secure" viewBox="0 0 120 16" focusable="false">
            <line x1="0" y1="8" x2="120" y2="8" />
          </svg>
        </div>

        <div className="portal-online">
          <article className="glass glass-panel glass-frost portal-box">
            <p className="eyebrow">{d.portalLabel}</p>
            <ul>
              {d.portalItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <p className="portal-octopus">
            <strong>{d.octopusTitle}</strong>
            <span>{d.octopusText}</span>
          </p>
        </div>
      </div>

      <p className="portal-you">{d.you}</p>

      <ul className="portal-points">
        {d.points.map((point) => (
          <li key={point.title}>
            <h3 className="h3">{point.title}</h3>
            <p>
              {point.text}{' '}
              {point.title === 'Your data' ? (
                <Link to={d.privacyTo}>{d.privacyLabel}</Link>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
