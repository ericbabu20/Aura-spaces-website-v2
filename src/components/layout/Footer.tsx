import { Link } from 'react-router-dom'
import logoUrl from '../../assets/brand/AuraSpaces-Logo-H-Black.svg'
import { siteConfig } from '../../config/site.config'
import { comingSoonLinks, legalLinks, primaryNav } from '../../content/navigation'

// Social links are only rendered when a URL has been filled in.
const socialLinks = Object.entries(siteConfig.socials).filter(([, url]) => url) as [string, string][]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logoUrl} alt="Aura Spaces" className="foot-logo" />
            <p>Kitchens and interiors for UK homes, designed in Leicester.</p>
            {socialLinks.length > 0 ? (
              <ul className="socials">
                {socialLinks.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="foot-col">
            <h2 className="foot-heading">Explore</h2>
            <ul>
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h2 className="foot-heading">Coming soon</h2>
            <ul>
              {comingSoonLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h2 className="foot-heading">Get in touch</h2>
            <ul>
              {siteConfig.email ? (
                <li>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
              ) : null}
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="foot-legal">
          <nav aria-label="Legal">
            <ul>
              {legalLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>
            &copy; {year} {siteConfig.name}
            {siteConfig.legalEntity ? `, ${siteConfig.legalEntity}` : ''}
          </p>
        </div>
      </div>
    </footer>
  )
}
