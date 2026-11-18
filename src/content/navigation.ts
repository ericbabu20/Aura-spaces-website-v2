// Site navigation. Coming-soon items are footer-only, so they are not in primaryNav.

export const primaryNav = [
  { label: 'Kitchens', to: '/kitchens' },
  { label: 'Interiors', to: '/interiors' },
  { label: 'Refurbishment', to: '/refurbishment' },
  { label: 'Aura Portal', to: '/portal' },
  { label: 'About', to: '/about' },
] as const

export const headerCta = { label: 'Book a consultation', to: '/contact' } as const

export const comingSoonLinks = [
  { label: 'Aura Studio', to: '/studio' },
  { label: 'Aura Furniture', to: '/furniture' },
  { label: 'Aura Decor', to: '/decor' },
] as const

export const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Cookies', to: '/cookies' },
  { label: 'Terms', to: '/terms' },
] as const
