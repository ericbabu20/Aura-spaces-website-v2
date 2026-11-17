import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/common/ButtonLink'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { Section } from '../components/common/Section'
import { SplitHeading } from '../components/common/SplitHeading'
import { ImageSlot } from '../components/common/ImageSlot'
import { CtaBand, ProcessList } from '../components/common/Blocks'
import { PromoEmbed } from '../components/platform/PromoEmbed'
import { HomeHero } from '../components/home/HomeHero'
import { homeCopy } from '../content/home'
import { IMAGES } from '../content/images'
import { processSteps, styleDirections } from '../content/shared'

const styleImages = [IMAGES.styleWarm, IMAGES.styleMinimal, IMAGES.styleShaker]

export default function HomePage() {
  const { whatWeDo, styles, platform, howItWorks, comingNext, cta } = homeCopy

  return (
    <>
      <Seo title={homeCopy.seo.title} description={homeCopy.seo.description} />

      {/* 1. Hero */}
      <HomeHero />

      {/* 2. What we do (its rounded top rises over the hero) */}
      <Section id="what-we-do" title={whatWeDo.title} className="section-overlap">
        <div className="panel-grid">
          {whatWeDo.items.map((item, i) => (
            <Link key={item.to} to={item.to} className="panel">
              <Reveal delay={i * 0.12}>
                <ImageSlot image={IMAGES[item.image]} sizes="(min-width: 900px) 33vw, 100vw" />
                <h3 className="h3 panel-title">{item.title}</h3>
                <p className="panel-text">{item.text}</p>
                <span className="link-arrow">Explore {item.title.toLowerCase()} →</span>
              </Reveal>
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. Style directions */}
      <Section id="styles" eyebrow={styles.eyebrow} title={styles.title}>
        <div className="panel-grid">
          {styleDirections.map((style, i) => (
            <div key={style.name} className="panel">
              <Reveal delay={i * 0.12}>
                <ImageSlot image={styleImages[i]} sizes="(min-width: 900px) 33vw, 100vw" />
                <h3 className="h3 panel-title">{style.name}</h3>
                <p className="panel-text">{style.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. The Aura Platform (dark band; the promo is the only motion here) */}
      <section className="platform-band" aria-labelledby="platform-title" data-header-tone="dark">
        <div className="wrap">
          <div className="platform-head">
            <Reveal>
              <span className="eyebrow eyebrow-light">{platform.eyebrow}</span>
            </Reveal>
            <SplitHeading as="h2" text={platform.title} className="h2" />
            <Reveal delay={0.2}>
              <p className="lead lead-light">{platform.text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <PromoEmbed />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="platform-cta">
              <ButtonLink to={platform.cta.to} variant="light">
                {platform.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. How it works */}
      <Section id="how-it-works" title={howItWorks.title}>
        <ProcessList steps={processSteps} />
      </Section>

      {/* 6. Coming next (footer and this strip only; never in the header) */}
      <section className="coming-strip" aria-labelledby="coming-title">
        <div className="wrap coming-inner">
          <h2 id="coming-title" className="eyebrow">
            {comingNext.label}
          </h2>
          <ul className="coming-list">
            {comingNext.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <span className="coming-badge">Coming soon</span>
                  <span className="coming-name">{item.title}</span>
                  <span className="coming-text">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Consultation call to action */}
      <CtaBand
        title={cta.title}
        text={cta.text}
        primary={cta.primary}
        secondary={cta.secondary}
      />
    </>
  )
}
