import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Check, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { quizQuestions, scoreToLevel } from '../data/quiz'
import { whatsappUrl, cta } from '../data/site'
import { scrollToId } from '../lib/scroll'

export default function LevelTest({ open, onClose }) {
  const [step, setStep] = useState(0) // 0..n-1 questions, n = result
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)

  const total = quizQuestions.length
  const isResult = step >= total

  // Reset whenever the modal is opened
  useEffect(() => {
    if (open) {
      setStep(0)
      setAnswers([])
      setSelected(null)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const choose = (i) => setSelected(i)

  const next = () => {
    if (selected === null) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    setStep((s) => s + 1)
  }

  const restart = () => {
    setStep(0)
    setAnswers([])
    setSelected(null)
  }

  const score = answers.reduce(
    (acc, ans, i) => acc + (ans === quizQuestions[i].answer ? 1 : 0),
    0,
  )
  const level = scoreToLevel(score)
  const progress = isResult ? 100 : (step / total) * 100

  const resultMsg = `Hola English Pro 👋, hice el test de nivel y mi resultado estimado fue ${level.code} (${level.name}). ¡Quiero agendar mi clase de prueba para confirmarlo!`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Test de nivel de inglés"
        >
          {/* Scrim */}
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-lift"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header + progress */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <p className="font-heading text-base font-bold text-ink">Test de nivel · 15 min</p>
                <p className="text-xs text-muted">
                  {isResult ? 'Resultado' : `Pregunta ${step + 1} de ${total}`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink focus-visible:outline-none"
                aria-label="Cerrar test"
              >
                <X size={22} />
              </button>
            </div>
            <div className="h-1.5 w-full bg-surface" aria-hidden="true">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="p-6" aria-live="polite">
              {!isResult ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-heading text-lg font-semibold text-ink">
                      {quizQuestions[step].prompt}
                    </p>
                    <div className="mt-5 space-y-3">
                      {quizQuestions[step].options.map((opt, i) => {
                        const active = selected === i
                        return (
                          <button
                            key={i}
                            onClick={() => choose(i)}
                            className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none ${
                              active
                                ? 'border-primary bg-primary-50'
                                : 'border-line hover:border-primary-200'
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                                active
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-line text-muted'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-ink">{opt}</span>
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={next}
                      disabled={selected === null}
                      className="btn-primary mt-6 w-full"
                    >
                      {step === total - 1 ? 'Ver mi resultado' : 'Siguiente'}
                      <ArrowRight size={18} />
                    </button>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                    <Trophy size={32} />
                  </div>
                  <p className="mt-4 text-sm font-medium text-muted">Tu nivel estimado es</p>
                  <p className="font-heading text-5xl font-extrabold text-primary">{level.code}</p>
                  <p className="font-heading text-lg font-semibold text-ink">{level.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    Acertaste {score} de {total} preguntas.
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
                    <Check size={16} className="text-success" />
                    Esta es una estimación orientativa, no una certificación oficial.
                  </div>

                  <a
                    href={whatsappUrl(resultMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-6 w-full"
                  >
                    ¡Reserva tu clase de prueba para confirmar tu nivel!
                  </a>
                  <div className="mt-3 flex gap-3">
                    <button onClick={restart} className="btn-ghost flex-1 border border-line">
                      <RotateCcw size={16} /> Repetir test
                    </button>
                    <button
                      onClick={() => {
                        onClose()
                        scrollToId('cotiza')
                      }}
                      className="btn-ghost flex-1 border border-line"
                    >
                      {cta.quote}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
