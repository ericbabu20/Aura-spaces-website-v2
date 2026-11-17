import { ButtonLink } from '../components/common/ButtonLink'
import { FeatureText, CtaBand, ProcessList } from '../components/common/Blocks'
import { ImageSlot } from '../components/common/ImageSlot'
import { PageHero } from '../components/common/PageHero'
import { Reveal } from '../components/common/Reveal'
import { Section } from '../components/common/Section'
import { Seo } from '../components/common/Seo'
import { IMAGES } from '../content/images'
import { kitchensCopy } from '../content/pages'
import { processSteps, styleDirections } from '../content/shared'

const styleImages = [IMAGES.styleWarm, IMAGES.styleMinimal, IMAGES.styleShaker]

export default function KitchensPage() {
  const { hero, layout, planning, materials, makers } = kitchensCopy

  return (
    <>
      <Seo title={kitchensCopy.seo.title} description={kitchensCopy.seo.description} />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        actions={
          <>
            <ButtonLink to="/contact">Book a free design consultation</ButtonLink>
            <ButtonLink to="#styles" variant="secondary">
              See style directions
            </ButtonLink>
          </>
        }
      >
        <Reveal delay={0.3}>
          <div className="page-hero-media">
            <ImageSlot image={IMAGES.panelKitchens} ratio="16 / 9" priority sizes="100vw" />
          </div>
        </Reveal>
      </PageHero>

      <Section id="styles" title="Three style directions.">
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

      <section className="section" aria-label="Layout, planning and materials">
        <div className="wrap split-layout">
          <FeatureText title={layout.title}>{layout.text}</FeatureText>
          <FeatureText title={planning.title} delay={0.1}>
            {planning.text}
          </FeatureText>
        </div>
        <div className="wrap split-layout split-reverse">
          <Reveal>
            <ImageSlot image={IMAGES.kitchensMaterials} sizes="(min-width: 900px) 50vw, 100vw" />
          </Reveal>
          <FeatureText title={materials.title} delay={0.1}>
            {materials.text}
          </FeatureText>
        </div>
        <div className="wrap feature-single">
          <FeatureText title={makers.title}>{makers.text}</FeatureText>
        </div>
      </section>

      <Section id="process" title="From your idea to your new space.">
        <ProcessList steps={processSteps} />
      </Section>

      <CtaBand
        title="Let's plan your kitchen."
        text="Tell us about your room and how you use it. We will talk through the layout, storage and finish."
        primary={{ label: 'Book a free design consultation', to: '/contact' }}
        secondary={{ label: 'Explore fitted interiors', to: '/interiors' }}
      />
    </>
  )
}
