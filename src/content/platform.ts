// Aura Platform copy. Only features with status "live" are presented as available now.
// Features with status "coming" appear in the "On the way" list.
// Confirm each status before launch.

export type FeatureStatus = 'live' | 'coming'

export const platformCopy = {
  seo: {
    title: 'Aura Platform | Energy Use and Home Devices',
    description:
      'The Aura Platform is an optional online portal that brings your electricity and gas use and home devices together in one place.',
  },
  hero: {
    title: 'Smarter energy at home.',
    lead:
      'The Aura Platform brings your electricity and gas use and your home devices together in one online portal.',
  },
  whatItIs: {
    title: 'What it is',
    text:
      'An online portal, on web and mobile, that brings a household’s energy information and devices together. It is optional and separate from our interiors service, so you never need it to buy a kitchen or room.',
  },
  features: [
    {
      title: 'Energy use by day, week and month',
      text: 'Electricity and gas use in one view, so you can see when your home uses the most energy.',
      status: 'live' as FeatureStatus,
    },
    {
      title: 'Aura AI',
      text: 'Ask questions and get answers based on your own energy data.',
      status: 'live' as FeatureStatus,
    },
    {
      title: 'EV charging',
      text: 'See the estimated cost of charging and schedule charging for off-peak hours.',
      status: 'live' as FeatureStatus,
    },
    {
      title: 'Tariff',
      text: 'See your current rates and compare other suppliers.',
      status: 'live' as FeatureStatus,
    },
    {
      title: 'Devices',
      text: 'Connect and control your home devices, built on Home Assistant.',
      status: 'coming' as FeatureStatus,
    },
  ],
  who: {
    title: 'Who can use it today',
    text: 'Households with an Octopus Energy account and a smart meter.',
  },
  howToStart: {
    title: 'How to start',
    steps: [
      'Create an account.',
      'Connect your Octopus account.',
      'See your home.',
    ],
  },
  partners: {
    title: 'Works with',
    text:
      'The platform works with Octopus Energy and Home Assistant. These are services it connects to, not partners.',
  },
  interiorsLink: {
    text: 'Planning a kitchen or room with these features in mind? We can plan for them at the design stage.',
    cta: { label: 'Talk to us about your home', to: '/contact' },
  },
  portal: {
    label: 'Open the Aura portal',
    fallbackLabel: 'Register your interest',
    fallbackTo: '/contact',
  },
}
