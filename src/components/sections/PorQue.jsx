import { motion } from 'framer-motion'
import Section from '../ui/Section'
import Icon from '../ui/Icon'
import { whyUs } from '../../data/site'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function PorQue() {
  return (
    <Section id="por-que" eyebrow="¿Por qué English Pro?" title="Resultados reales, no solo clases.">
      <motion.ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {whyUs.map((w, idx) => (
          <motion.li
            key={w.title}
            variants={item}
            className={`card-pro group hover:-translate-y-1 hover:shadow-lift ${
              idx === whyUs.length - 1 && whyUs.length % 3 === 2 ? 'lg:col-span-1' : ''
            }`}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Icon name={w.icon} size={24} />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{w.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{w.desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
