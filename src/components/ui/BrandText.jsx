/**
 * BrandText — renders any string while auto-highlighting the brand name.
 *
 * Wherever "English Pro Academy" or "English Pro" appears inside the text,
 * it is rendered as the brand wordmark: a distinct font (Montserrat) with the
 * logo colors — English (blue), Pro (red), Academy (gray).
 *
 * Usage:
 *   <BrandText>{nosotros.title}</BrandText>
 *   <BrandText>Conoce al equipo de English Pro Academy.</BrandText>
 */

// Longest phrase first so "English Pro Academy" wins over "English Pro".
const BRAND_RE = /(English Pro Academy|English Pro)/g

const WORD_COLOR = {
  English: 'text-primary',
  Pro: 'text-accent',
  Academy: 'text-muted',
}

function Wordmark({ text }) {
  const words = text.split(' ')
  return (
    <span className="font-brand font-extrabold tracking-tight">
      {words.map((word, i) => (
        <span key={i} className={WORD_COLOR[word] || 'text-ink'}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

export default function BrandText({ children }) {
  if (typeof children !== 'string') return children

  // split() with a capturing group keeps the matched brand phrases in the array
  const parts = children.split(BRAND_RE)
  return (
    <>
      {parts.map((part, i) =>
        part === 'English Pro Academy' || part === 'English Pro' ? (
          <Wordmark key={i} text={part} />
        ) : (
          part
        )
      )}
    </>
  )
}
