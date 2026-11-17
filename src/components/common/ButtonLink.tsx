import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// primary: Night fill, for light backgrounds. paper: Paper fill, for dark backgrounds and imagery.
// secondary: 1px outline on light. glass: liquid-glass capsule over imagery. light: alias of paper.
type Variant = 'primary' | 'secondary' | 'light' | 'paper' | 'glass'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  external?: boolean
  className?: string
  tabIndex?: number
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  light: 'btn-paper',
  paper: 'btn-paper',
  glass: 'btn-glass glass glass-bar',
}

// Internal links use the router. External links open in a new tab with safe rel attributes.
export function ButtonLink({ to, children, variant = 'primary', external = false, className = '', tabIndex }: ButtonLinkProps) {
  const classes = `btn ${VARIANT_CLASSES[variant]} ${className}`.trim()
  if (external) {
    return (
      <a className={classes} href={to} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>
        {children}
      </a>
    )
  }
  return (
    <Link className={classes} to={to} tabIndex={tabIndex}>
      {children}
    </Link>
  )
}
