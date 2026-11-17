import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { PROJECT_PARAM, PROJECT_TYPES, projectSlug } from '../contact/ContactForm'
import { homeCopy } from '../../content/home'

const { dock } = homeCopy.hero

// "What are you planning?" with a segmented choice. Continuing opens /contact with that project type preselected.
export function HeroDock() {
  const [choice, setChoice] = useState<string>(PROJECT_TYPES[0])
  const navigate = useNavigate()
  const name = useId()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/contact?${PROJECT_PARAM}=${projectSlug(choice)}`)
  }

  return (
    <form className="hero-dock glass glass-bar" onSubmit={onSubmit}>
      <span id={`${name}-q`} className="dock-question">
        {dock.question}
      </span>
      <div className="dock-segments" role="radiogroup" aria-labelledby={`${name}-q`}>
        {PROJECT_TYPES.map((type) => {
          const selected = choice === type
          return (
            <label key={type} className={`dock-segment${selected ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                value={type}
                checked={selected}
                onChange={() => setChoice(type)}
                className="sr-only"
              />
              {selected ? (
                <motion.span
                  layoutId={`${name}-indicator`}
                  className="dock-indicator"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              ) : null}
              <span className="dock-label">{type}</span>
            </label>
          )
        })}
      </div>
      <button type="submit" className="dock-go" aria-label={`${dock.submitLabel}: ${choice}`}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}
