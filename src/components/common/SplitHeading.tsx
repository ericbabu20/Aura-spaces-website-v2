import { Fragment } from 'react'
import { motion } from 'motion/react'
import { EASE } from './Reveal'

interface SplitHeadingProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

// Headings rise word by word from a mask.
// The trigger sits on the heading itself. Each word inherits it through variants. Watching the
// words directly does not work, because they start outside their clipping box and never intersect.
// Spaces sit outside the masked wrapper, because browsers drop trailing spaces inside it.
// Screen readers get the full sentence once; the animated words are hidden from assistive tech.
export function SplitHeading({ text, as = 'h2', className, delay = 0 }: SplitHeadingProps) {
  const words = text.split(' ')
  const Heading = as === 'h1' ? motion.h1 : as === 'h3' ? motion.h3 : motion.h2

  return (
    <Heading
      className={className}
      variants={{ hidden: {}, visible: {} }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="split-word">
              <motion.span
                style={{ display: 'inline-block' }}
                variants={{
                  hidden: { y: '110%' },
                  visible: {
                    y: '0%',
                    transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.07 },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </Heading>
  )
}
