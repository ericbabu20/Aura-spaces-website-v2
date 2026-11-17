import { ButtonLink } from '../components/common/ButtonLink'
import { CtaBand, FeatureText } from '../components/common/Blocks'
import { ImageSlot } from '../components/common/ImageSlot'
import { PageHero } from '../components/common/PageHero'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { IMAGES } from '../content/images'
import { refurbishmentCopy } from '../content/pages'

export default function RefurbishmentPage() {
  const { hero, refresh, kitchenLed, trades, larger } = refurbishmentCopy

  return (
    <>
      <Seo title={refurbishmentCopy.seo.title} description={refurbishmentCopy.seo.description} />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        actions={<ButtonLink to="/contact">Book a free design consultation</ButtonLink>}
      >
        <Reveal delay={0.3}>
          <div className="page-hero-media">
            <ImageSlot image={IMAGES.refurbHero} ratio="16 / 9" priority sizes="100vw" />
          </div>
        </Reveal>
      </PageHero>

      <section className="section" aria-label="Refurbishment services">
        <div className="wrap split-layout">
          <FeatureText title={refresh.title}>{refresh.text}</FeatureText>
          <FeatureText title={kitchenLed.title} delay={0.1}>
            {kitchenLed.text}
          </FeatureText>
        </div>
        <div className="wrap feature-single">
          <FeatureText title={trades.title}>{trades.text}</FeatureText>
        </div>
      </section>

      <section className="section" aria-labelledby="larger-title">
        <div className="wrap">
          <Reveal>
            <div className="note-block">
              <h2 id="larger-title" className="h3">
                {larger.title}
              </h2>
              <p>{larger.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Tell us what needs refreshing."
        text="Share the rooms you have in mind and we will talk through what is involved."
        primary={{ label: 'Book a free consultation', to: '/contact' }}
        secondary={{ label: 'See kitchens', to: '/kitchens' }}
      />
    </>
  )
}
