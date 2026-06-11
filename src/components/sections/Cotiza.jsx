import { useState } from 'react'
import { Check, Send, ShieldCheck, Clock, Sparkles } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { programs, whatsappUrl, cta } from '../../data/site'

const objetivos = [
  'Trabajo / carrera profesional',
  'Viajar',
  'Estudios / posgrado',
  'Certificación oficial',
  'Reto personal',
]

export default function Cotiza() {
  const [form, setForm] = useState({ nombre: '', contacto: '', objetivo: '', programa: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.nombre.trim()) er.nombre = 'Cuéntanos tu nombre.'
    if (!form.contacto.trim()) er.contacto = 'Déjanos un WhatsApp o correo.'
    if (!form.programa) er.programa = 'Elige un programa de interés.'
    return er
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const er = validate()
    if (Object.keys(er).length) {
      setErrors(er)
      // focus first invalid field
      const first = Object.keys(er)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    const msg = `Hola English Pro 👋, quiero cotizar mi plan.
• Nombre: ${form.nombre}
• Contacto: ${form.contacto}
• Objetivo: ${form.objetivo || 'No especificado'}
• Programa de interés: ${form.programa}`
    setSent(true)
    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer')
  }

  const inputBase =
    'w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary'

  return (
    <Section id="cotiza" surface headingCenter={false}>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        {/* Value side */}
        <Reveal>
          <span className="eyebrow">Cotiza tu plan</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Estás a un mensaje de tu siguiente nivel.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Déjanos tus datos y recibe una asesoría personalizada para elegir tu plan ideal.
            Sin compromiso.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              { icon: Sparkles, text: 'Clase de prueba gratis y sin compromiso' },
              { icon: Clock, text: 'Respuesta rápida por WhatsApp' },
              { icon: ShieldCheck, text: 'Plan a la medida de tus metas' },
            ].map(({ icon: I, text }) => (
              <li key={text} className="flex items-center gap-3 text-ink">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  <I size={18} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form side */}
        <Reveal delay={0.1}>
          {sent ? (
            <div className="rounded-2xl border border-success/30 bg-white p-8 text-center shadow-card">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                <Check size={30} />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-ink">¡Gracias, {form.nombre.split(' ')[0]}!</h3>
              <p className="mt-2 text-muted">
                Abrimos WhatsApp para enviar tu solicitud. Si no se abrió,{' '}
                <a
                  href={whatsappUrl(`Hola English Pro 👋, quiero cotizar mi plan (${form.programa}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline"
                >
                  haz clic aquí
                </a>
                .
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary mt-6 !py-2.5">
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="field-nombre" className="mb-1.5 block text-sm font-medium text-ink">
                    Nombre <span className="text-accent">*</span>
                  </label>
                  <input
                    id="field-nombre"
                    type="text"
                    autoComplete="name"
                    value={form.nombre}
                    onChange={update('nombre')}
                    className={`${inputBase} ${errors.nombre ? 'border-accent' : 'border-line'}`}
                    placeholder="Tu nombre completo"
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? 'err-nombre' : undefined}
                  />
                  {errors.nombre && (
                    <p id="err-nombre" role="alert" className="mt-1.5 text-sm text-accent">
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="field-contacto" className="mb-1.5 block text-sm font-medium text-ink">
                    WhatsApp o correo <span className="text-accent">*</span>
                  </label>
                  <input
                    id="field-contacto"
                    type="text"
                    autoComplete="tel"
                    value={form.contacto}
                    onChange={update('contacto')}
                    className={`${inputBase} ${errors.contacto ? 'border-accent' : 'border-line'}`}
                    placeholder="Ej: +57 300 000 0000 / tu@correo.com"
                    aria-invalid={!!errors.contacto}
                    aria-describedby={errors.contacto ? 'err-contacto' : undefined}
                  />
                  {errors.contacto && (
                    <p id="err-contacto" role="alert" className="mt-1.5 text-sm text-accent">
                      {errors.contacto}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="field-objetivo" className="mb-1.5 block text-sm font-medium text-ink">
                    ¿Cuál es tu objetivo?
                  </label>
                  <select
                    id="field-objetivo"
                    value={form.objetivo}
                    onChange={update('objetivo')}
                    className={`${inputBase} border-line`}
                  >
                    <option value="">Selecciona una opción</option>
                    {objetivos.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="field-programa" className="mb-1.5 block text-sm font-medium text-ink">
                    Programa de interés <span className="text-accent">*</span>
                  </label>
                  <select
                    id="field-programa"
                    value={form.programa}
                    onChange={update('programa')}
                    className={`${inputBase} ${errors.programa ? 'border-accent' : 'border-line'}`}
                    aria-invalid={!!errors.programa}
                    aria-describedby={errors.programa ? 'err-programa' : undefined}
                  >
                    <option value="">Selecciona un programa</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {errors.programa && (
                    <p id="err-programa" role="alert" className="mt-1.5 text-sm text-accent">
                      {errors.programa}
                    </p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                <Send size={18} /> {cta.quote}
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                Al enviar, abriremos WhatsApp con tu solicitud lista. Tus datos solo se usan para tu asesoría.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
