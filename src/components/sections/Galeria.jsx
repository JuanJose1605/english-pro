import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import Section from '../ui/Section'

// ⚠️ PLACEHOLDER — reemplazar cada bloque por fotos reales de clases,
// estudiantes y docentes interactuando (requisito del brief, punto 10).
const tiles = [
  { label: 'Clase grupal en vivo', span: 'sm:col-span-2 sm:row-span-2' },
  { label: 'Estudiante en sesión 1 a 1', span: '' },
  { label: 'Docente explicando', span: '' },
  { label: 'Plataforma interactiva', span: '' },
  { label: 'Business English', span: '' },
]

export default function Galeria() {
  return (
    <Section
      id="galeria"
      eyebrow="Nuestras clases"
      title="Así se vive el aprendizaje en English Pro."
      subtitle="Clases reales, en vivo y dinámicas, donde la interacción es la protagonista."
    >
      <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-4">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 p-4 text-center text-primary/70 ${t.span}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <ImageIcon size={28} className="opacity-60" />
            <span className="text-xs font-medium">{t.label}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
