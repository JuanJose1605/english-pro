import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import Section from '../ui/Section'
import { teachers } from '../../data/site'

export default function Docentes() {
  return (
    <Section
      id="docentes"
      surface
      eyebrow="Nuestros docentes"
      title="Conoce al equipo detrás de English Pro Academy."
      subtitle="Docentes especializados y certificados que guían cada clase en vivo con cercanía y experiencia."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t, i) => (
          <motion.article
            key={i}
            className="card-pro text-center hover:-translate-y-1 hover:shadow-lift"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {/* ⚠️ PLACEHOLDER — reemplazar el avatar por la foto real del docente */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-700 font-heading text-2xl font-bold text-white">
              {t.initials}
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{t.name}</h3>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm font-medium text-primary">
              <BadgeCheck size={15} /> {t.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.bio}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
