// Coming-soon pages. Each is a designed page, not an empty placeholder.

export const comingSoonPages = {
  studio: {
    slug: 'studio',
    seo: {
      title: 'Aura Studio (Coming Soon) | Aura Spaces',
      description: 'Aura Studio is a planned tool to explore kitchen layouts from a floor plan.',
    },
    eyebrow: 'Coming soon',
    title: 'Aura Studio',
    lead:
      'A planned tool to explore kitchen layouts and indicative costs from a floor plan.',
    imageKey: 'studioHero' as const,
    steps: ['Floor plan', '3D kitchen', 'Your space'],
    cta: { label: 'Explore fitted kitchens', to: '/kitchens' },
  },
  furniture: {
    slug: 'furniture',
    seo: {
      title: 'Aura Furniture (Coming Soon) | Aura Spaces',
      description: 'Aura Furniture will offer freestanding and selected bespoke pieces.',
    },
    eyebrow: 'Coming soon',
    title: 'Aura Furniture',
    lead: 'Freestanding and selected bespoke pieces, designed to sit alongside your interiors.',
    imageKey: 'interiorsFurniture' as const,
    steps: [],
    cta: { label: 'Explore fitted interiors now', to: '/interiors' },
  },
  decor: {
    slug: 'decor',
    seo: {
      title: 'Aura Decor (Coming Soon) | Aura Spaces',
      description: 'Aura Decor will offer curated décor and room bundles.',
    },
    eyebrow: 'Coming soon',
    title: 'Aura Decor',
    lead: 'Curated décor and room bundles that complete a space with texture, light and personality.',
    imageKey: 'decorAccessories' as const,
    steps: [],
    cta: { label: 'Explore fitted interiors now', to: '/interiors' },
  },
}

export type ComingSoonKey = keyof typeof comingSoonPages
