import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitHeading } from './SplitHeading'

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  lead?: string
  children?: ReactNode
  tone?: 'cream' | 'dark'
  labelledBy?: string
  className?: string
}

// A standard page section: optional eyebrow, animated heading, optional lead, then content.
export function Section({ id, eyebrow, title, lead, children, tone = 'cream', className = '' }: SectionProps) {
  const headingId = `${id ?? 'section'}-title`
  return (
    <section id={id} className={`section tone-${tone} ${className}`.trim()} aria-labelledby={headingId}>
      <div className="wrap">
        <div className="section-head">
          {eyebrow ? (
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          ) : null}
          <SplitHeading as="h2" text={title} className="h2" />
          {lead ? (
            <Reveal delay={0.2}>
              <p className="lead">{lead}</p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
