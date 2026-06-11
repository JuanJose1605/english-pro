import { motion } from 'framer-motion'
import Section from '../ui/Section'
import Icon from '../ui/Icon'
import { methodology } from '../../data/site'

export default function Metodologia() {
  return (
    <Section
      id="metodologia"
      eyebrow={methodology.eyebrow}
      title={methodology.title}
      subtitle={methodology.subtitle}
    >
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-primary-100 via-primary to-primary-100 lg:block" />

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-soft ring-4 ring-white">
                <Icon name={s.icon} size={22} />
              </div>
              <span className="mt-3 inline-block rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-bold text-accent">
                Paso {i + 1}
              </span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
