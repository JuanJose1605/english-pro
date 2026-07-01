import { motion } from 'framer-motion'
import { Sparkles, PlayCircle, Star } from 'lucide-react'
import { hero, cta } from '../../data/site'
import { scrollToId } from '../../lib/scroll'
import Counter from '../ui/Counter'

export default function Hero({ onOpenQuiz }) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-[var(--nav-h)]">
      {/* Background wash + soft blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent-50 blur-3xl" />
      </div>

      <div className="container-pro grid items-center gap-12 pb-12 pt-4 sm:pb-16 sm:pt-6 lg:grid-cols-2 lg:pb-20 lg:pt-8">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Sparkles size={15} /> {hero.eyebrow}
          </motion.span>

          <motion.h1
            className="mt-4 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.5rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Domina el inglés que el{' '}
            <span className="text-primary">mundo real</span> necesita.
          </motion.h1>

          <motion.p
            className="mt-5 text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button onClick={() => scrollToId('cotiza')} className="btn-primary">
              {cta.trial}
            </button>
            <button onClick={onOpenQuiz} className="btn-secondary">
              <PlayCircle size={20} /> {cta.test}
            </button>
          </motion.div>

          {/* Rating / trust line */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="flex items-center gap-1.5">
              <span className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </span>
              <strong className="text-ink">4.9</strong> de satisfacción
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span className="font-medium text-primary">{hero.taglineEs}</span>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-primary shadow-lift">
            <img
              src="./banner.jpg"
              alt="English Pro — clases virtuales de inglés en vivo"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-5 -left-4 rounded-xl bg-white px-4 py-3 shadow-card sm:-left-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-xs text-muted">Grupos reducidos</p>
            <p className="font-heading text-lg font-bold text-primary">Máx. 10 estudiantes</p>
          </motion.div>

          <div className="absolute -right-3 -top-4 rounded-xl bg-accent px-4 py-3 text-white shadow-glow">
            <p className="text-xs opacity-90">Certificación</p>
            <p className="font-heading text-base font-bold">Oficial</p>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-line bg-surface">
        <div className="container-pro grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
