import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { whatsappUrl, trialMessage, cta } from '../data/site'

// WhatsApp glyph (brand SVG — not an emoji)
function WhatsAppIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export default function FloatingButtons({ onTrial }) {
  // Hide until user scrolls a bit so they don't cover the hero CTAs immediately
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 24, pointerEvents: show ? 'auto' : 'none' }}
      transition={{ duration: 0.3 }}
    >
      {/* Clase gratis */}
      <button
        onClick={onTrial}
        className="group flex h-14 items-center gap-2 rounded-full bg-accent pl-4 pr-5 text-white shadow-glow animate-pulse-ring transition-transform duration-200 hover:scale-105 focus-visible:outline-none"
        aria-label={cta.trialFloating}
      >
        <GraduationCap size={24} className="shrink-0" />
        <span className="text-sm font-heading font-semibold">{cta.trialFloating}</span>
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappUrl(trialMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 focus-visible:outline-none"
        aria-label="Escríbenos por WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </motion.div>
  )
}
