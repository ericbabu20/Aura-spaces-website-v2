import { Fragment } from 'react'
import { PageHero } from '../components/common/PageHero'
import { Seo } from '../components/common/Seo'
import type { PolicyPage as PolicyPageData } from '../content/policies'

// Splits text so that [TO CONFIRM: ...] markers are highlighted for review.
function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\[TO CONFIRM[^\]]*\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[TO CONFIRM') ? (
          <mark key={i} className="to-confirm">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

export default function PolicyPage({ policy }: { policy: PolicyPageData }) {
  return (
    <>
      <Seo title={policy.seo.title} description={policy.seo.description} />

      <PageHero eyebrow="Policies" title={policy.title} lead={policy.intro} />

      <section className="section policy" aria-label={policy.title}>
        <div className="wrap policy-body">
          {policy.sections.map((section) => (
            <div key={section.heading} className="policy-section">
              <h2 className="h3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>
                  <Highlighted text={p} />
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
