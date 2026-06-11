import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Section from '../ui/Section'
import { levels } from '../../data/site'

export default function Niveles() {
  return (
    <Section
      id="niveles"
      surface
      eyebrow="Niveles y tiempos"
      title="Tu camino hacia la certificación, paso a paso."
      subtitle="Una ruta clara desde principiante (A1) hasta maestría (C2). Los tiempos son orientativos y se ajustan a tu ritmo y dedicación."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((lvl, i) => (
          <motion.div
            key={lvl.code}
            className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            {/* Progress fill proportional to level */}
            <div
              className="absolute bottom-0 left-0 h-1 bg-accent transition-all duration-500"
              style={{ width: `${((i + 1) / levels.length) * 100}%` }}
            />
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-3xl font-extrabold text-primary">{lvl.code}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-muted">
                <Clock size={14} /> {lvl.months}
              </span>
            </div>
            <p className="mt-2 font-heading text-lg font-semibold text-ink">{lvl.name}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        ¿No sabes en qué nivel estás? Haz el <strong className="text-primary">test gratis de 15 min</strong>.
      </p>
    </Section>
  )
}
