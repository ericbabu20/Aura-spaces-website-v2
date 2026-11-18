import { portalCopy } from '../../content/portal'

// Native disclosure: keyboard, screen readers and the collapsed state come from the browser.
// A question with an empty answer is not rendered.
export function PortalFaq() {
  const items = portalCopy.faq.items.filter((item) => item.a.trim())

  return (
    <div className="portal-faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
