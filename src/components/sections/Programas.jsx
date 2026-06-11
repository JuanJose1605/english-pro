import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Section from '../ui/Section'
import Icon from '../ui/Icon'
import { programs, cta } from '../../data/site'
import { whatsappUrl } from '../../data/site'

export default function Programas() {
  return (
    <Section
      id="programas"
      surface
      eyebrow="Nuestros programas"
      title="Planes diseñados para tu ritmo y tus metas."
      subtitle="Desde clases grupales dinámicas hasta tutorías 1 a 1 totalmente personalizadas."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {programs.map((p, i) => (
          <motion.article
            key={p.id}
            className="card-pro flex flex-col hover:-translate-y-1 hover:shadow-lift"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Icon name={p.icon} size={24} />
              </span>
              <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent">
                {p.tag}
              </span>
            </div>

            <h3 className="mt-4 font-heading text-xl font-bold text-ink">{p.name}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">{p.desc}</p>

            <ul className="mt-4 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink">
                  <Check size={16} className="shrink-0 text-success" /> {f}
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl(`Hola English Pro 👋, quiero más información sobre el programa ${p.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              {cta.advisor} <ArrowRight size={16} />
            </a>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
