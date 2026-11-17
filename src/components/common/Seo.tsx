import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../../config/site.config'

interface SeoProps {
  title: string
  description: string
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Sets the title, description, canonical URL, Open Graph tags and robots for each page.
// Note: these are set in the browser. Crawlers that do not run JavaScript will see the
// defaults in index.html. Prerendering is recommended for full SEO (see the report).
export function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${siteConfig.url}${pathname}`)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${siteConfig.url}${pathname}`
  }, [title, description, noindex, pathname])

  return null
}
