import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/common/ButtonLink'
import { FeatureText } from '../components/common/Blocks'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { SplitHeading } from '../components/common/SplitHeading'
import { PromoEmbed } from '../components/platform/PromoEmbed'
import { siteConfig } from '../config/site.config'
import { platformCopy } from '../content/platform'

export default function PlatformPage() {
  const { hero, whatItIs, features, who, howToStart, partners, interiorsLink, portal } = platformCopy
  const live = features.filter((f) => f.status === 'live')
  const coming = features.filter((f) => f.status === 'coming')

  return (
    <>
      <Seo title={platformCopy.seo.title} description={platformCopy.seo.description} />

      {/* Hero: heading, one line, promo, then the portal button */}
      <section className="page-hero tone-dark" aria-labelledby="page-title">
        <div className="wrap">
          <SplitHeading as="h1" text={hero.title} className="h1 page-hero-title" />
          <Reveal delay={0.4}>
            <p className="lead lead-light page-hero-lead">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <PromoEmbed />
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-actions">
              {siteConfig.portalUrl ? (
                <ButtonLink to={siteConfig.portalUrl} variant="light" external>
                  {portal.label}
                </ButtonLink>
              ) : (
                <ButtonLink to={portal.fallbackTo} variant="light">
                  {portal.fallbackLabel}
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="wrap split-layout">
          <FeatureText title={whatItIs.title}>{whatItIs.text}</FeatureText>
          <FeatureText title={who.title} delay={0.1}>
            {who.text}
          </FeatureText>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="wrap">
          <h2 id="features-title" className="h2">
            What you can do
          </h2>
          <ul className="feature-list">
            {live.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.08}>
                <h3 className="h3">{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </ul>

          {coming.length > 0 ? (
            <div className="on-the-way">
              <h3 className="eyebrow">On the way</h3>
              <ul className="feature-list feature-list-muted">
                {coming.map((f) => (
                  <li key={f.title}>
                    <span className="coming-badge">Coming soon</span>
                    <h4 className="h3">{f.title}</h4>
                    <p>{f.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" aria-labelledby="start-title">
        <div className="wrap">
          <h2 id="start-title" className="h2">
            {howToStart.title}
          </h2>
          <ol className="process">
            {howToStart.steps.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 0.1}>
                <span className="process-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="process-text">{step}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Works with">
        <div className="wrap split-layout">
          <FeatureText title={partners.title}>{partners.text}</FeatureText>
          <Reveal delay={0.1}>
            <div className="feature-text">
              <p>{interiorsLink.text}</p>
              <p className="link-line">
                <Link to={interiorsLink.cta.to} className="link-arrow">
                  {interiorsLink.cta.label} →
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
