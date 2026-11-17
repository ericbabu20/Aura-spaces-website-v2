import { ButtonLink } from '../components/common/ButtonLink'
import { ImageSlot } from '../components/common/ImageSlot'
import { PageHero } from '../components/common/PageHero'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { comingSoonPages, type ComingSoonKey } from '../content/comingSoon'
import { IMAGES } from '../content/images'

// One designed template for Aura Studio, Aura Furniture and Aura Decor.
// No upload, 3D or pricing functionality is built here.
export default function ComingSoonPage({ pageKey }: { pageKey: ComingSoonKey }) {
  const page = comingSoonPages[pageKey]

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        actions={
          <>
            <span className="status-pill">Coming soon</span>
            <ButtonLink to={page.cta.to} variant="secondary">
              {page.cta.label}
            </ButtonLink>
          </>
        }
      >
        <Reveal delay={0.3}>
          <div className="page-hero-media">
            <ImageSlot image={IMAGES[page.imageKey]} ratio="16 / 9" priority sizes="100vw" />
          </div>
        </Reveal>
      </PageHero>

      {page.steps.length > 0 ? (
        <section className="section" aria-labelledby="steps-title">
          <div className="wrap">
            <h2 id="steps-title" className="h2">
              How it will work
            </h2>
            <ol className="process">
              {page.steps.map((step, i) => (
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
      ) : null}
    </>
  )
}
