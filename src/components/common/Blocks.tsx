import type { ReactNode } from 'react'
import { ButtonLink } from './ButtonLink'
import { Reveal } from './Reveal'

// A text block with a heading and body copy. Used for feature rows on inner pages.
export function FeatureText({ title, children, delay = 0 }: { title: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="feature-text">
        <h3 className="h3">{title}</h3>
        <p>{children}</p>
      </div>
    </Reveal>
  )
}

// Numbered steps for a process. Used on the homepage and the kitchens page.
export function ProcessList({ steps }: { steps: ReadonlyArray<{ title: string }> }) {
  return (
    <ol className="process">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.1}>
          <span className="process-num" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="process-text">{step.title}</span>
        </Reveal>
      ))}
    </ol>
  )
}

interface CtaBandProps {
  title: string
  text?: string
  primary: { label: string; to: string }
  secondary?: { label: string; to: string }
}

// Closing call to action at the bottom of a page.
export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="cta-band section" aria-labelledby="cta-title">
      <div className="wrap cta-inner">
        <Reveal>
          <h2 id="cta-title" className="h2">
            {title}
          </h2>
        </Reveal>
        {text ? (
          <Reveal delay={0.15}>
            <p className="lead">{text}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.3}>
          <div className="hero-actions">
            <ButtonLink to={primary.to}>{primary.label}</ButtonLink>
            {secondary ? (
              <ButtonLink to={secondary.to} variant="secondary">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
