import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitHeading } from './SplitHeading'

interface PageHeroProps {
  eyebrow: string
  title: string
  lead?: string
  actions?: ReactNode
  tone?: 'cream' | 'dark'
  children?: ReactNode
}

// Top section of an inner page: eyebrow, large heading, lead copy and optional buttons.
export function PageHero({ eyebrow, title, lead, actions, tone = 'cream', children }: PageHeroProps) {
  return (
    <section className={`page-hero tone-${tone}`} aria-labelledby="page-title">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <SplitHeading as="h1" text={title} className="h1 page-hero-title" delay={0.1} />
        {lead ? (
          <Reveal delay={0.4}>
            <p className="lead page-hero-lead">{lead}</p>
          </Reveal>
        ) : null}
        {actions ? (
          <Reveal delay={0.55}>
            <div className="hero-actions">{actions}</div>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  )
}
