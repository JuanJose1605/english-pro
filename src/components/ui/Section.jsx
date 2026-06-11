import Reveal from './Reveal'

/**
 * Standard section wrapper with consistent vertical rhythm, optional
 * surface background, and an optional centered header (eyebrow/title/subtitle).
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  surface = false,
  className = '',
  children,
  headingCenter = true,
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${surface ? 'bg-surface' : 'bg-white'} ${className}`}
    >
      <div className="container-pro">
        {(eyebrow || title || subtitle) && (
          <Reveal className={`mb-12 max-w-3xl ${headingCenter ? 'mx-auto text-center' : ''}`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
