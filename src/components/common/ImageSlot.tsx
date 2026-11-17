import type { ImageSlot as ImageSlotData } from '../../content/images'

interface ImageSlotProps {
  image: ImageSlotData
  sizes?: string
  priority?: boolean
  ratio?: string
  className?: string
}

// Renders a responsive image with a fixed aspect ratio (no layout shift), or a branded
// placeholder when the image has not been supplied yet.
export function ImageSlot({ image, sizes = '100vw', priority = false, ratio, className = '' }: ImageSlotProps) {
  const style = { aspectRatio: ratio ?? image.ratio }

  if (!image.src) {
    return (
      <div className={`img-slot ${className}`} role="img" aria-label={image.alt}>
        <span>{image.need ?? 'Image needed'}</span>
      </div>
    )
  }

  return (
    <figure className={`img-wrap ${className}`} style={style}>
      <img
        src={image.src.w1600}
        srcSet={`${image.src.w800} 800w, ${image.src.w1600} 1600w`}
        sizes={sizes}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {image.concept ? <span className="concept-tag">Design concept</span> : null}
    </figure>
  )
}
