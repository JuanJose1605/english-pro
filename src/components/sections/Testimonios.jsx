import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Section from '../ui/Section'
import { testimonials } from '../../data/site'

export default function Testimonios() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(0)

  const go = (delta) => {
    setDir(delta)
    setIdx((prev) => (prev + delta + testimonials.length) % testimonials.length)
  }

  const t = testimonials[idx]

  return (
    <Section
      id="testimonios"
      eyebrow="Testimonios"
      title="Lo que dicen nuestros estudiantes."
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
          <Quote size={40} className="text-primary-100" aria-hidden="true" />
          <div className="relative min-h-[160px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="text-lg leading-relaxed text-ink sm:text-xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {/* ⚠️ PLACEHOLDER — añadir foto real del estudiante */}
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">
                    EP
                  </span>
                  <span>
                    <span className="block font-heading font-semibold text-ink">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                  <span className="ml-auto flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-none"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Seleccionar testimonio">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > idx ? 1 : -1)
                  setIdx(i)
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-6 bg-accent' : 'w-2.5 bg-line'
                }`}
                aria-label={`Testimonio ${i + 1}`}
                aria-selected={i === idx}
                role="tab"
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-none"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  )
}
