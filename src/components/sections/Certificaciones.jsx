import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Section from '../ui/Section'
import CertLogo from '../ui/CertLogo'
import { certifications } from '../../data/site'
import { scrollToId } from '../../lib/scroll'
import { cta } from '../../data/site'

export default function Certificaciones() {
  return (
    <Section
      id="certificaciones"
      eyebrow="Certificaciones oficiales"
      title="Tu esfuerzo merece un respaldo oficial."
      subtitle="Obtén certificados con validez real que abren puertas en el mercado laboral y académico."
    >
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {certifications.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex flex-col items-center justify-center rounded-2xl border border-line bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className="flex h-14 items-center justify-center">
              <CertLogo
                cert={c}
                imgClassName="max-h-14 w-auto object-contain"
                renderFallback={() => (
                  <div className="flex flex-col items-center">
                    <ShieldCheck size={28} className="text-primary" />
                    <p className="mt-2 font-heading text-lg font-bold text-ink">{c.name}</p>
                  </div>
                )}
              />
            </div>
            <p className="mt-3 text-xs text-muted">{c.note}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button onClick={() => scrollToId('cotiza')} className="btn-primary">
          {cta.trial}
        </button>
      </div>
    </Section>
  )
}
