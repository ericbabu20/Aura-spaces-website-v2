// Aura Portal copy. Only features with status "live" are presented as available now.
// A feature with status "coming" is listed as on the way, never as something you can do today.
// The monthly-fee answer stays empty until Aura confirms it. An empty answer is not shown.

export type FeatureStatus = 'live' | 'coming'

export interface PortalFeature {
  title: string
  text: string
  status: FeatureStatus
  icon: 'energy' | 'home' | 'ai' | 'charge'
}

export const portalCopy = {
  seo: {
    title: 'Aura Portal | Smart Home and Energy App | Aura Spaces',
    description:
      'See your home energy use, control your devices and ask Aura AI in one app. Built on Home Assistant, for Octopus Energy customers.',
  },
  hero: {
    eyebrow: 'Aura Portal',
    title: 'Your whole home, in one place.',
    lead: 'See your energy, control your devices and ask Aura AI, all from one app.',
    builtOn: 'Built on Home Assistant',
    howLabel: 'How it works',
    howTo: '#how-it-works',
  },
  open: {
    label: 'Open the Aura Portal',
    fallbackLabel: 'Register your interest',
    fallbackTo: '/contact',
  },
  featuresTitle: 'What you can do',
  features: [
    {
      title: 'See your energy',
      text: 'Electricity and gas use by day, week and month.',
      status: 'live',
      icon: 'energy',
    },
    {
      title: 'Control your home',
      text: 'Lights, plugs, heating and more, through Home Assistant.',
      status: 'live',
      icon: 'home',
    },
    {
      title: 'Ask Aura AI',
      text: 'Plain-English answers from your own data.',
      status: 'live',
      icon: 'ai',
    },
    {
      title: 'Charge smarter',
      text: 'See the cost of an EV charge and schedule it for off-peak hours.',
      status: 'live',
      icon: 'charge',
    },
  ] as PortalFeature[],
  diagram: {
    id: 'how-it-works',
    title: 'How it works',
    homeLabel: 'In your home',
    devicesTitle: 'Your devices',
    devicesText: 'Lights, plugs, sensors, EV charger',
    hubTitle: 'Home Assistant Green',
    hubText: 'Local hub and automations, with an optional Zigbee radio.',
    linkLabel: 'secure',
    portalLabel: 'Aura Portal, online',
    portalItems: ['Energy dashboard', 'Device control', 'Aura AI'],
    octopusTitle: 'Octopus Energy',
    octopusText: 'Smart meter and tariff',
    you: 'You, on a phone or in a web browser, connected to the Aura Portal.',
    points: [
      { title: 'Local first', text: 'Automations run in your home, and they keep working if the internet drops.' },
      { title: 'One app', text: 'Energy and devices together.' },
      {
        title: 'Your data',
        text: 'Your energy data comes from your Octopus account, with your permission. Device control runs through your own hub. You can disconnect at any time.',
      },
    ],
    privacyLabel: 'Privacy notice',
    privacyTo: '/privacy',
  },
  hardware: {
    title: 'The hub behind it: Home Assistant Green.',
    text: 'A small, quiet box that sits next to your router and connects your devices. Set it up once and it runs in the background.',
    maker: 'Home Assistant Green is made by Nabu Casa. It connects to the router by Ethernet.',
    specs: [
      'Quad-core processor',
      '4 GB memory',
      '32 GB storage',
      'Ethernet connection',
      '2 USB ports for add-ons',
      'Low power, about 2–3 W',
      '112 × 112 × 32 mm',
    ],
    radio: 'Zigbee and Thread devices need an add-on USB radio. Wi-Fi and Matter-over-Wi-Fi devices do not.',
  },
  ai: {
    title: 'Ask Aura AI.',
    text: 'Ask about your usage, your tariff or your devices and get an answer based on your own data.',
    exampleLabel: 'Example conversation',
    user: 'How much electricity did I use this week?',
    reply: 'You used 31.6 kWh of electricity this week, mostly in the evenings.',
    caution: 'Aura AI can make mistakes. Check important figures in your dashboard.',
  },
  who: {
    title: 'Who it is for today',
    cards: [
      {
        title: 'Available now',
        text: 'Households with an Octopus Energy account and a smart meter.',
      },
      {
        title: 'What you need',
        text: 'A Home Assistant Green hub, a broadband router with a free Ethernet port, and the Aura Portal app.',
      },
    ],
  },
  start: {
    title: 'Getting started',
    // Step 1 wording and its button come from siteConfig.portalHardwareOffer.
    later: [
      'Create your Aura Portal account and connect Octopus Energy.',
      'Add your devices and start exploring.',
    ],
    offers: {
      'aura-supplied': {
        step: "We'll supply and set up your hub.",
        cta: { label: 'Book a set-up call', to: '/contact?project=aura-portal' },
      },
      'customer-buys': {
        step: 'Buy a Home Assistant Green from a retailer.',
        cta: null,
      },
      '': {
        step: 'Get your hub set up.',
        cta: { label: 'Talk to us', to: '/contact' },
      },
    },
  },
  faq: {
    title: 'Questions',
    items: [
      { q: 'Do I need an Aura kitchen to use the Aura Portal?', a: 'No. It works in any home.' },
      {
        q: 'Does it work if my internet goes down?',
        a: 'Automations keep running on the hub. The portal app needs internet.',
      },
      { q: 'Which energy suppliers work?', a: 'Octopus Energy today.' },
      {
        q: 'Which devices can I connect?',
        a: 'Most Wi-Fi and Matter devices, and Zigbee devices with an add-on radio. Ask us about yours.',
      },
      // Leave the answer empty until a fee is confirmed. The question is hidden while this is empty.
      { q: 'Is there a monthly fee?', a: '' },
    ],
  },
  close: {
    title: 'Ready to make your home smarter?',
    primary: 'Open the Aura Portal',
    secondary: { label: 'Plan a kitchen with it built in', to: '/contact' },
  },
  trademark:
    'Home Assistant and Home Assistant Green are trademarks of their respective owners. Aura Spaces is not affiliated with or endorsed by them.',
}
