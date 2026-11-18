// How the customer gets a Home Assistant Green. Empty means it has not been decided.
export type PortalHardwareOffer = 'aura-supplied' | 'customer-buys' | ''

// Business details and integration settings.
// Leave unknown values as empty strings: the footer and pages only show values that are filled in.

export const siteConfig = {
  name: 'Aura Spaces',
  url: 'https://www.auraspaces.uk',
  location: 'Leicester, United Kingdom',
  email: 'hello@auraspaces.co.uk',
  // To confirm before launch:
  legalEntity: '',
  companyNumber: '',
  socials: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  },
  // Aura Portal web app. Empty means "Open the Aura Portal" is replaced by
  // "Register your interest" (linking to /contact) until a real address is set.
  portalUrl: '',
  // How a household gets the hub. Drives step 1 on /portal.
  // "aura-supplied" | "customer-buys" | "" (not decided yet).
  portalHardwareOffer: '' as PortalHardwareOffer,
  // Home Assistant's logo and "Works with" badge stay hidden unless Aura is approved to use them
  // and the approved files have been added. Leave this false.
  homeAssistantLogoApproved: false,
  // Contact form endpoint (Google Apps Script). Can be overridden with VITE_CONTACT_ENDPOINT.
  contactEndpoint:
    (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ||
    'https://script.google.com/macros/s/AKfycbyHZ9F5ykPQNhLzRXroqz0VAkrYbsy0JNsEzhNM4QbiBA/exec',
  // Self-contained promo animation, served from /public.
  promoPath: '/promo/aura-promo.html',
} as const
