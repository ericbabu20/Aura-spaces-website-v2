import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { useGlassSheen } from '../common/useGlassSheen'

// Shared frame for every page: header, page content and footer.
export function SiteLayout() {
  const { pathname, hash } = useLocation()
  useGlassSheen()

  // Start each new page at the top, unless the URL points at an anchor on the page.
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
