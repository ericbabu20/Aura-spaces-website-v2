import type { PortalFeature } from '../../content/portal'

// Simple outline icons. They inherit the text colour and carry no brand marks.
export function PortalIcon({ name }: { name: PortalFeature['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    focusable: false,
  }

  if (name === 'energy') {
    return (
      <svg {...common}>
        <path d="M4 19V10M10 19V5M16 19v-7M22 19H2" />
      </svg>
    )
  }
  if (name === 'home') {
    return (
      <svg {...common}>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6.5 10.5V20h11V10.5" />
      </svg>
    )
  }
  if (name === 'ai') {
    return (
      <svg {...common}>
        <path d="M6 16.5 4 20l4.2-1.4A8 8 0 1 0 6 16.5Z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M9 8V3M9 8h6a3 3 0 0 1 3 3v2H9" />
      <rect x="3" y="8" width="6" height="10" rx="2" />
    </svg>
  )
}
