// Image manifest: one named slot per image on the site.
// - `src` points at resized files in src/assets/web (800px and 1600px wide).
// - Slots without `src` render a brand-coloured placeholder that keeps the right aspect ratio.
// - `concept: true` adds a "Design concept" label. Every current image is labelled this way,
//   because none of them is confirmed as a completed Aura project.

const files = import.meta.glob('../assets/web/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function findWeb(prefix: string, width: 800 | 1600): string {
  const key = Object.keys(files).find((k) => k.includes(`/${prefix}`) && k.endsWith(`-${width}.jpg`))
  if (!key) throw new Error(`Missing web image for ${prefix} at ${width}px`)
  return files[key]
}

export interface ImageSlot {
  id: string
  alt: string
  ratio: string
  src?: { w800: string; w1600: string }
  concept?: boolean
  need?: string
}

function photo(
  id: string,
  alt: string,
  ratio: string,
  prefix: string,
  concept = true,
): ImageSlot {
  return {
    id,
    alt,
    ratio,
    src: { w800: findWeb(prefix, 800), w1600: findWeb(prefix, 1600) },
    concept,
  }
}

function placeholder(id: string, alt: string, ratio: string, need: string): ImageSlot {
  return { id, alt, ratio, need }
}

export const IMAGES = {
  heroKitchen: photo('heroKitchen', 'Modern kitchen with warm timber tones and soft daylight', '3 / 2', '7b6c416f'),
  heroPortrait: placeholder(
    'heroPortrait',
    'Portrait kitchen image for phones',
    '4 / 5',
    'Portrait kitchen photo, 1200 × 1500 px (4:5). Not a crop of the desktop hero.',
  ),

  panelKitchens: photo('panelKitchens', 'Kitchen with island and pendant lighting', '4 / 5', 'c6a77b7e'),
  panelInteriors: photo('panelInteriors', 'Calm bedroom with fitted storage', '4 / 5', '3ce57230'),
  panelRefurb: photo('panelRefurb', 'Refurbished kitchen with natural light', '4 / 5', 'f18022a4'),

  styleWarm: photo('styleWarm', 'Warm contemporary kitchen concept', '4 / 5', 'e340cd65'),
  styleMinimal: photo('styleMinimal', 'Modern minimal kitchen concept', '4 / 5', '1d109309'),
  styleShaker: photo('styleShaker', 'Timeless shaker kitchen concept', '4 / 5', '0a1b1f74'),

  kitchensMaterials: photo('kitchensMaterials', 'Close view of kitchen materials and finishes', '4 / 3', '5f6d55fe'),
  interiorsHero: photo('interiorsHero', 'Contemporary bedroom with built-in storage', '4 / 3', 'b83d6146'),
  interiorsWardrobe: photo('interiorsWardrobe', 'Floor-to-ceiling fitted wardrobe', '4 / 5', '3ce57230'),
  interiorsFurniture: photo('interiorsFurniture', 'Bedroom with bespoke furniture', '4 / 5', '6f1176ff'),

  decorAccessories: photo('decorAccessories', 'Soft furnishings and textiles', '4 / 3', '7673a174'),
  decorWall: photo('decorWall', 'Wall and accent decor', '4 / 3', 'a9c58f63'),
  decorLighting: photo('decorLighting', 'Lighting and decorative objects', '4 / 5', '1c8ddcad'),

  studioHero: photo('studioHero', 'Kitchen layout planning concept', '4 / 3', '1d109309'),

  refurbHero: placeholder(
    'refurbHero',
    'Refurbishment project in progress',
    '4 / 3',
    'Refurbishment project, 1600 × 1200 px (4:3), a real or clearly labelled concept render.',
  ),
  aboutHero: placeholder(
    'aboutHero',
    'Aura Spaces team',
    '4 / 3',
    'Founder-led photo, 1600 × 1200 px (4:3). Only use real, consented photos of the people shown.',
  ),
} satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof IMAGES

// Full-bleed homepage hero. Files live in public/images/hero (built by scripts/hero-images.mjs)
// so index.html can preload them by a fixed URL. Each file exists as .avif, .webp and .jpg.
// A slot set to null has not been supplied yet; the hero copes with any of them missing.

// A marker pinned to a real, visible feature. x and y are percentages of the full image.
export interface Hotspot {
  x: number
  y: number
  label: string
}

export interface HeroImage {
  id: string
  alt: string
  width: number
  height: number
  widths: number[]
  concept: boolean
  // Crop focus as "x% y%", used when the image has to be cropped. `mobile` applies when phones
  // fall back to this image because no portrait image has been supplied.
  focus?: { desktop?: string; mobile?: string }
  // Text colour over this photo. 'light' (default): Paper text with a soft shade behind it.
  // 'dark': Night text with no shade, for photos that are bright where the text sits.
  textTone?: 'light' | 'dark'
  // Only shown where positions are supplied. Hotspots never show on phones.
  hotspots?: { desktop?: Hotspot[] }
}

export interface HeroSlotBrief {
  size: string
  brief: string
  status: string
}

export const HERO_IMAGES: Record<'desktopDay' | 'desktopEvening' | 'mobileDay' | 'mobileEvening', HeroImage | null> = {
  desktopDay: {
    id: 'hero-desktop-day',
    alt: 'Bright kitchen with sage cabinetry, an island with oak stools, open oak shelves and morning light from a tall window',
    width: 1024,
    height: 576,
    widths: [960, 1024],
    concept: true,
    focus: { desktop: '30% 50%', mobile: '72% 50%' },
    textTone: 'dark',
    hotspots: {},
  },
  desktopEvening: null,
  mobileDay: null,
  mobileEvening: null,
}

export const HERO_SLOT_BRIEFS: Record<keyof typeof HERO_IMAGES, HeroSlotBrief> = {
  desktopDay: {
    size: '2880 × 1620 or larger',
    brief: 'Bright daylight kitchen, subject weighted right, calm left third.',
    status: 'Supplied at 1024 × 576. Too small: it will look soft on large screens. Composition is right.',
  },
  desktopEvening: {
    size: 'Same framing as the day image',
    brief: 'Same kitchen at dusk with the lights on. Optional; without it the day-to-evening crossfade is skipped.',
    status: 'Not supplied.',
  },
  mobileDay: {
    size: '1440 × 2560 or larger',
    brief: 'Portrait framing, calm lower third for the text.',
    status: 'Not supplied. Phones show the desktop day image cropped to its right-hand side.',
  },
  mobileEvening: {
    size: 'Same framing as the mobile day image',
    brief: 'Optional.',
    status: 'Not supplied.',
  },
}

// Suggested markers for the day image, pinned to features that are really in the photo.
// Not shown until approved: move them into HERO_IMAGES.desktopDay.hotspots.desktop.
export const PROPOSED_DAY_HOTSPOTS: Hotspot[] = [
  { x: 61.8, y: 25.5, label: 'Pendant lighting' },
  { x: 56, y: 36.5, label: 'Open oak shelving' },
  { x: 67, y: 60, label: 'Island with seating' },
]

export const heroFile = (image: HeroImage, width: number, ext: 'avif' | 'webp' | 'jpg') =>
  `/images/hero/${image.id}-${width}.${ext}`

export const heroSrcSet = (image: HeroImage, ext: 'avif' | 'webp' | 'jpg') =>
  image.widths.map((w) => `${heroFile(image, w, ext)} ${w}w`).join(', ')
