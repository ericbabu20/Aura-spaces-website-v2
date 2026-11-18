export const homeCopy = {
  seo: {
    title: 'Aura Spaces | Kitchens and Interiors in Leicester',
    description:
      'Beautiful, practical kitchens and fitted interiors for UK homes, designed in Leicester by Aura Spaces.',
  },
  hero: {
    eyebrow: 'Kitchens & interiors · Leicester',
    title: 'Interiors designed for the way you live.',
    // Desktop line breaks for the headline. Joined, they must match `title`.
    titleLines: ['Interiors designed', 'for the way you live.'],
    lead: 'Beautiful kitchens and fitted interiors, planned around how you live.',
    dock: {
      question: 'What are you planning?',
      submitLabel: 'Continue to the consultation form',
    },
    stickyCta: { label: 'Book a consultation', to: '/contact' },
    primary: { label: 'Book a free design consultation', to: '/contact' },
    secondary: { label: 'Explore kitchens', to: '/kitchens' },
  },
  whatWeDo: {
    title: 'What we do',
    items: [
      {
        title: 'Kitchens',
        text: 'Storage-led, beautifully finished kitchens planned around how you cook and live.',
        to: '/kitchens',
        image: 'panelKitchens' as const,
      },
      {
        title: 'Fitted interiors',
        text: 'Wardrobes, media walls, home offices and built-in storage planned for your room.',
        to: '/interiors',
        image: 'panelInteriors' as const,
      },
      {
        title: 'Refurbishment',
        text: 'Room refreshes and kitchen-led projects, with the trades coordinated for you.',
        to: '/refurbishment',
        image: 'panelRefurb' as const,
      },
    ],
  },
  styles: {
    eyebrow: 'Style directions',
    title: 'Spaces that work beautifully.',
  },
  portal: {
    eyebrow: 'For smarter homes',
    title: "Your home's energy, finally clear.",
    text:
      'The Aura Portal shows your electricity and gas use in one place and lets you connect your home devices. It is optional, and it is ready to use today.',
    builtOn: 'Built on Home Assistant, with Aura AI.',
    cta: { label: 'Explore the Aura Portal', to: '/portal' },
  },
  howItWorks: {
    title: 'From your idea to your new space.',
  },
  comingNext: {
    label: 'Coming next',
    items: [
      { title: 'Aura Studio', text: 'Explore kitchen layouts from a floor plan.', to: '/studio' },
      { title: 'Aura Furniture', text: 'Freestanding and selected bespoke pieces.', to: '/furniture' },
      { title: 'Aura Decor', text: 'Curated décor and room bundles.', to: '/decor' },
    ],
  },
  cta: {
    title: "Let's create a home that works for you.",
    text: 'Tell us about your space, your style and what you would like to improve.',
    primary: { label: 'Book a free consultation', to: '/contact' },
    secondary: { label: 'Get in touch', to: '/contact' },
  },
}
