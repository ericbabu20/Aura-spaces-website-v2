import { ButtonLink } from '../components/common/ButtonLink'
import { CtaBand, FeatureText } from '../components/common/Blocks'
import { ImageSlot } from '../components/common/ImageSlot'
import { PageHero } from '../components/common/PageHero'
import { Reveal } from '../components/common/Reveal'
import { Section } from '../components/common/Section'
import { Seo } from '../components/common/Seo'
import { IMAGES } from '../content/images'
import { interiorsCopy } from '../content/pages'

export default function InteriorsPage() {
  const { hero, items, planning } = interiorsCopy

  return (
    <>
      <Seo title={interiorsCopy.seo.title} description={interiorsCopy.seo.description} />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        actions={<ButtonLink to="/contact">Book a free design consultation</ButtonLink>}
      >
        <Reveal delay={0.3}>
          <div className="page-hero-media">
            <ImageSlot image={IMAGES.interiorsHero} ratio="16 / 9" priority sizes="100vw" />
          </div>
        </Reveal>
      </PageHero>

      <Section id="rooms" title="Built-in storage, planned for each room.">
        <ol className="item-list">
          {items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.08}>
                <span className="item-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <section className="section" aria-label="Planning and an example">
        <div className="wrap split-layout">
          <Reveal>
            <ImageSlot image={IMAGES.interiorsWardrobe} sizes="(min-width: 900px) 50vw, 100vw" />
          </Reveal>
          <FeatureText title={planning.title} delay={0.1}>
            {planning.text}
          </FeatureText>
        </div>
      </section>

      <CtaBand
        title="Let's plan the room you have in mind."
        text="Tell us the room, what you need it to do and how you use it day to day."
        primary={{ label: 'Book a free design consultation', to: '/contact' }}
        secondary={{ label: 'See kitchens', to: '/kitchens' }}
      />
    </>
  )
}
