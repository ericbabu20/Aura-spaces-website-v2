import { ButtonLink } from '../components/common/ButtonLink'
import { PageHero } from '../components/common/PageHero'
import { Seo } from '../components/common/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | Aura Spaces"
        description="The page you were looking for could not be found."
        noindex
      />

      <PageHero
        eyebrow="Error 404"
        title="This page is not here."
        lead="The link may be out of date, or the page may have moved. You can head back to the homepage or explore our kitchens and interiors."
        actions={
          <>
            <ButtonLink to="/">Back to the homepage</ButtonLink>
            <ButtonLink to="/kitchens" variant="secondary">
              Explore kitchens
            </ButtonLink>
          </>
        }
      />
    </>
  )
}
