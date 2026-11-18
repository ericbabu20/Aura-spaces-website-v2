// Policy page structure. Items marked [TO CONFIRM] need legal details from Aura before launch.
// Do not publish these pages until those markers are resolved.

export interface PolicySection {
  heading: string
  paragraphs: string[]
}

export interface PolicyPage {
  slug: 'privacy' | 'cookies' | 'terms'
  title: string
  seo: { title: string; description: string }
  intro: string
  sections: PolicySection[]
}

export const policyPages: Record<'privacy' | 'cookies' | 'terms', PolicyPage> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Notice',
    seo: {
      title: 'Privacy Notice | Aura Spaces',
      description: 'How Aura Spaces collects and uses personal information on this website.',
    },
    intro: 'This notice explains how Aura Spaces handles personal information when you use this website.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: ['Aura Spaces, Leicester, United Kingdom. [TO CONFIRM: legal entity name and company number]'],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'When you use the contact form, we collect the details you give us: your name, email address, phone number (optional), postcode, project details and contact preferences.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use these details to respond to your enquiry and to arrange a consultation. We do not use them for marketing unless you ask us to. [TO CONFIRM: marketing and consent approach]',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: ['[TO CONFIRM: retention period for enquiries]'],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can ask to see, correct or delete the personal information we hold about you. [TO CONFIRM: contact route for requests]',
        ],
      },
      {
        heading: 'Aura Portal',
        paragraphs: [
          'To be confirmed: what energy data the Aura Portal collects when a household connects an Octopus Energy account.',
          'To be confirmed: what device data is processed through the household hub and the Aura Portal.',
          'To be confirmed: how Aura AI conversations are stored, and who can see them.',
          'To be confirmed: which third-party services process Aura Portal data.',
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    seo: {
      title: 'Cookie Policy | Aura Spaces',
      description: 'How Aura Spaces uses cookies and similar technologies on this website.',
    },
    intro: 'This page explains how this website uses cookies.',
    sections: [
      {
        heading: 'What are cookies',
        paragraphs: ['Cookies are small files stored on your device when you visit a website.'],
      },
      {
        heading: 'Cookies we use',
        paragraphs: ['[TO CONFIRM: list of essential and any analytics cookies in use, if any]'],
      },
      {
        heading: 'Managing cookies',
        paragraphs: ['You can control or delete cookies through your browser settings.'],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    seo: {
      title: 'Terms of Use | Aura Spaces',
      description: 'Terms for using the Aura Spaces website.',
    },
    intro: 'These terms apply when you use the Aura Spaces website.',
    sections: [
      {
        heading: 'Information on this site',
        paragraphs: [
          'Images marked “Design concept” are illustrations and are not photographs of completed Aura Spaces projects.',
          'Information on this site is for general guidance. [TO CONFIRM: full terms wording]',
        ],
      },
      {
        heading: 'Aura Portal',
        paragraphs: [
          'The Aura Portal is a separate, optional service. To be confirmed: terms for the Aura Portal and any third-party services it connects to.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: ['[TO CONFIRM: governing law and jurisdiction]'],
      },
    ],
  },
}
