import { ContactForm } from '../components/contact/ContactForm'
import { PageHero } from '../components/common/PageHero'
import { Reveal } from '../components/common/Reveal'
import { Seo } from '../components/common/Seo'
import { siteConfig } from '../config/site.config'
import { contactCopy } from '../content/pages'

export default function ContactPage() {
  const { hero } = contactCopy

  return (
    <>
      <Seo title={contactCopy.seo.title} description={contactCopy.seo.description} />

      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} />

      <section className="section contact-section" aria-labelledby="form-title">
        <div className="wrap contact-grid">
          <Reveal>
            <aside className="contact-aside">
              <h2 id="form-title" className="h3">
                Request a consultation
              </h2>
              <p>Share a few details about your project. We will use them to reply and arrange a call.</p>
              <dl className="contact-details">
                {siteConfig.email ? (
                  <>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                    </dd>
                  </>
                ) : null}
                <dt>Based in</dt>
                <dd>{siteConfig.location}</dd>
              </dl>
            </aside>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
