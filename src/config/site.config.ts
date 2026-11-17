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
  // Aura Platform web portal. Empty means the "Open the Aura portal" button is hidden
  // and "Register your interest" (linking to /contact) is shown instead.
  portalUrl: '',
  // Contact form endpoint (Google Apps Script). Can be overridden with VITE_CONTACT_ENDPOINT.
  contactEndpoint:
    (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ||
    'https://script.google.com/macros/s/AKfycbyHZ9F5ykPQNhLzRXroqz0VAkrYbsy0JNsEzhNM4QbiBA/exec',
  // Self-contained promo animation, served from /public.
  promoPath: '/promo/aura-promo.html',
} as const
