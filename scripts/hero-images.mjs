// Builds responsive AVIF, WebP and JPEG files for one homepage hero slot.
//
//   SHARP_DIR=/tmp/aura-img node scripts/hero-images.mjs hero-desktop-day path/to/photo.jpg
//
// sharp is not a site dependency. Install it somewhere temporary first:
//   mkdir -p /tmp/aura-img && npm i --prefix /tmp/aura-img sharp
//
// Output goes to public/images/hero/<slot>-<width>.<ext>. Widths larger than the source are
// skipped (no upscaling). Paste the printed widths into HERO_IMAGES in src/content/images.ts.
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const [slot, source] = process.argv.slice(2)
const WIDTHS = {
  'hero-desktop-day': [960, 1440, 1920, 2880],
  'hero-desktop-evening': [960, 1440, 1920, 2880],
  'hero-mobile-day': [720, 1080, 1440],
  'hero-mobile-evening': [720, 1080, 1440],
}
if (!WIDTHS[slot] || !source) {
  console.error(`Usage: node scripts/hero-images.mjs <${Object.keys(WIDTHS).join('|')}> <source image>`)
  process.exit(1)
}

const require = createRequire(path.join(process.env.SHARP_DIR || process.cwd(), 'noop.js'))
const sharp = require('sharp')

const outDir = path.resolve('public/images/hero')
mkdirSync(outDir, { recursive: true })

const meta = await sharp(source).metadata()
const widths = [...new Set([...WIDTHS[slot].filter((w) => w < meta.width), Math.min(meta.width, Math.max(...WIDTHS[slot]))])]

for (const w of widths) {
  const base = path.join(outDir, `${slot}-${w}`)
  const img = sharp(source).resize({ width: w })
  await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${base}.avif`)
  await img.clone().webp({ quality: 74 }).toFile(`${base}.webp`)
  await img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${base}.jpg`)
}

const minWanted = { desktop: [2880, 1620], mobile: [1440, 2560] }[slot.includes('mobile') ? 'mobile' : 'desktop']
console.log(JSON.stringify({ slot, source: `${meta.width}x${meta.height}`, widths, height: Math.round((meta.height / meta.width) * widths.at(-1)) }))
if (meta.width < minWanted[0] || meta.height < minWanted[1]) {
  console.warn(`Warning: source is ${meta.width}x${meta.height}; this slot wants at least ${minWanted.join('x')}.`)
}
