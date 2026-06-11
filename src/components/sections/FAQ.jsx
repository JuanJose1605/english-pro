import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from '../ui/Section'
import { faqs } from '../../data/site'

function Item({ faq, isOpen, onToggle, id }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          id={`faq-btn-${id}`}
        >
          <span className="font-heading text-base font-semibold text-ink sm:text-lg">{faq.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              isOpen ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
            }`}
          >
            <ChevronDown size={18} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 leading-relaxed text-muted">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <Section
      id="faq"
      eyebrow="Preguntas frecuentes"
      title="Todo lo que necesitas saber antes de empezar."
    >
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, i) => (
          <Item
            key={i}
            id={i}
            faq={faq}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </div>
    </Section>
  )
}
