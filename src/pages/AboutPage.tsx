import { ButtonLink } from '../components/common/ButtonLink'
import { CtaBand, FeatureText } from '../components/common/Blocks'
import { ImageSlot } from '../components/common/ImageSlot'
import { PageHero } from '../components/common/PageHero'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { IMAGES } from '../content/images'
import { aboutCopy } from '../content/pages'

export default function AboutPage() {
  const { hero, model, vision, founder } = aboutCopy

  return (
    <>
      <Seo title={aboutCopy.seo.title} description={aboutCopy.seo.description} />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        actions={<ButtonLink to="/contact">Book a free design consultation</ButtonLink>}
      >
        <Reveal delay={0.3}>
          <div className="page-hero-media">
            <ImageSlot image={IMAGES.aboutHero} ratio="16 / 9" priority sizes="100vw" />
          </div>
        </Reveal>
      </PageHero>

      <section className="section" aria-labelledby="model-title">
        <div className="wrap">
          <h2 id="model-title" className="h2">
            {model.title}
          </h2>
          <ol className="model-steps">
            {model.steps.map((step, i) => (
              <Reveal as="li" key={step.label} delay={i * 0.12}>
                <h3 className="h3">{step.label}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Vision and founder">
        <div className="wrap split-layout">
          <FeatureText title={vision.title}>{vision.text}</FeatureText>
          <FeatureText title={founder.title} delay={0.1}>
            {founder.text}
          </FeatureText>
        </div>
      </section>

      <CtaBand
        title="Let's talk about your home."
        text="Tell us about your space and what you would like to improve."
        primary={{ label: 'Book a free consultation', to: '/contact' }}
      />
    </>
  )
}
