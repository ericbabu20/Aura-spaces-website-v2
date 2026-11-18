import { useEffect } from 'react'
import { ButtonLink } from '../components/common/ButtonLink'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { SplitHeading } from '../components/common/SplitHeading'
import { PortalDiagram } from '../components/portal/PortalDiagram'
import { PortalFaq } from '../components/portal/PortalFaq'
import { PortalIcon } from '../components/portal/PortalIcons'
import { PromoEmbed } from '../components/portal/PromoEmbed'
import { siteConfig, type PortalHardwareOffer } from '../config/site.config'
import { IMAGES } from '../content/images'
import { portalCopy } from '../content/portal'
import { ImageSlot } from '../components/common/ImageSlot'

function OpenPortal({ variant }: { variant: 'light' | 'paper' }) {
  if (siteConfig.portalUrl) {
    return (
      <ButtonLink to={siteConfig.portalUrl} variant={variant} external>
        {portalCopy.open.label}
      </ButtonLink>
    )
  }
  return (
    <ButtonLink to={portalCopy.open.fallbackTo} variant={variant}>
      {portalCopy.open.fallbackLabel}
    </ButtonLink>
  )
}

// No Home Assistant logo, badge or product photo unless Aura has approved it and supplied the file.
const HOME_ASSISTANT_LOGO = ''

function HomeAssistantMark() {
  if (!siteConfig.homeAssistantLogoApproved || !HOME_ASSISTANT_LOGO) return null
  return <img src={HOME_ASSISTANT_LOGO} alt="" />
}

export default function PortalPage() {
  const { hero, features, diagram, hardware, ai, who, start, faq, close } = portalCopy
  const offer = siteConfig.portalHardwareOffer as PortalHardwareOffer
  const first = start.offers[offer]
  const live = features.filter((f) => f.status === 'live')
  const coming = features.filter((f) => f.status === 'coming')

  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Aura Portal',
      description: portalCopy.seo.description,
      applicationCategory: 'HomeApplication',
      url: siteConfig.portalUrl || `${siteConfig.url}/portal`,
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'portal-jsonld'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  return (
    <>
      <Seo title={portalCopy.seo.title} description={portalCopy.seo.description} />
      <HomeAssistantMark />

      <section className="page-hero tone-dark portal-hero" aria-labelledby="page-title" data-header-tone="dark">
        <div className="wrap portal-hero-grid">
          <div>
            <p className="eyebrow eyebrow-light">{hero.eyebrow}</p>
            <SplitHeading as="h1" text={hero.title} className="h1 page-hero-title" />
            <Reveal delay={0.15}>
              <p className="lead lead-light page-hero-lead">{hero.lead}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="hero-actions">
                <OpenPortal variant="light" />
                <a className="btn btn-glass glass glass-bar" href={hero.howTo}>
                  {hero.howLabel}
                </a>
              </div>
              <p className="portal-built">{hero.builtOn}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <PromoEmbed cut />
          </Reveal>
        </div>
      </section>

      <section className="section portal-field" aria-labelledby="features-title">
        <div className="wrap">
          <h2 id="features-title" className="h2">
            {portalCopy.featuresTitle}
          </h2>
          <ul className="portal-features">
            {live.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={i * 0.06}>
                <article className="glass glass-panel glass-frost portal-card">
                  <PortalIcon name={feature.icon} />
                  <h3 className="h3">{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
          {coming.length > 0 ? (
            <div className="on-the-way">
              <h3 className="eyebrow">On the way</h3>
              <ul className="portal-features">
                {coming.map((feature) => (
                  <li key={feature.title} className="glass glass-panel glass-frost portal-card">
                    <span className="coming-badge">Coming soon</span>
                    <h4 className="h3">{feature.title}</h4>
                    <p>{feature.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section portal-field" id={diagram.id} aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="h2">
            {diagram.title}
          </h2>
          <PortalDiagram />
        </div>
      </section>

      <section className="section portal-field" aria-labelledby="hub-title">
        <div className="wrap split-layout">
          <figure className="portal-hub glass glass-panel">
            <p className="eyebrow" role="img" aria-label="Hub photo placeholder">
              Hub photo to be added
            </p>
          </figure>
          <div>
            <h2 id="hub-title" className="h2">
              {hardware.title}
            </h2>
            <p className="lead">{hardware.text}</p>
            <p>{hardware.maker}</p>
            <ul className="portal-specs">
              {hardware.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <p className="portal-note">{hardware.radio}</p>
          </div>
        </div>
      </section>

      <section className="section portal-ai" aria-labelledby="ai-title" data-header-tone="dark">
        <div className="wrap portal-ai-grid">
          <div>
            <h2 id="ai-title" className="h2">
              {ai.title}
            </h2>
            <p className="lead lead-light">{ai.text}</p>
            <p className="portal-fine">{ai.caution}</p>
          </div>
          <div className="glass glass-panel portal-chat">
            <p className="eyebrow eyebrow-light">{ai.exampleLabel}</p>
            <div className="portal-bubble is-user">
              <span>You</span>
              {ai.user}
            </div>
            <div className="portal-bubble is-ai">
              <span>Aura AI</span>
              {ai.reply}
            </div>
          </div>
        </div>
      </section>

      <section className="section portal-field" aria-labelledby="who-title">
        <div className="wrap">
          <h2 id="who-title" className="h2">
            {who.title}
          </h2>
          <ul className="portal-who">
            {who.cards.map((card) => (
              <li key={card.title} className="glass glass-panel glass-frost portal-card">
                <h3 className="h3">{card.title}</h3>
                <p>{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section portal-field" aria-labelledby="start-title">
        <div className="wrap">
          <h2 id="start-title" className="h2">
            {start.title}
          </h2>
          <ol className="portal-steps">
            <li>
              <span className="portal-step-num glass glass-bar glass-frost" aria-hidden="true">
                1
              </span>
              <p>{first.step}</p>
              {first.cta ? (
                <ButtonLink to={first.cta.to} variant="primary">
                  {first.cta.label}
                </ButtonLink>
              ) : null}
            </li>
            {start.later.map((step, i) => (
              <li key={step}>
                <span className="portal-step-num glass glass-bar glass-frost" aria-hidden="true">
                  {i + 2}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap portal-faq-wrap">
          <h2 id="faq-title" className="h2">
            {faq.title}
          </h2>
          <PortalFaq />
        </div>
      </section>

      <section className="portal-close" aria-labelledby="close-title" data-header-tone="dark">
        <ImageSlot image={IMAGES.panelKitchens} className="portal-close-img" sizes="100vw" />
        <div className="portal-close-scrim" aria-hidden="true" />
        <div className="wrap">
          <h2 id="close-title" className="h2">
            {close.title}
          </h2>
          <div className="hero-actions">
            <OpenPortal variant="paper" />
            <ButtonLink to={close.secondary.to} variant="glass">
              {close.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <p className="portal-trademark wrap">{portalCopy.trademark}</p>
    </>
  )
}
