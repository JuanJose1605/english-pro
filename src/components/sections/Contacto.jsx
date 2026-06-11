import { Mail, Phone, Clock, MessageCircle } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { contact, whatsappUrl, cta } from '../../data/site'

export default function Contacto() {
  return (
    <Section id="contacto" headingCenter={false} className="!pb-12">
      <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-lift">
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              Contacto
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Estás a un mensaje de tu siguiente nivel.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Escríbenos hoy y recibe una asesoría personalizada para elegir tu plan ideal.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-white/70" />
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:underline">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-white/70" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-white/70" />
                <span className="text-white/90">{contact.schedule}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:justify-self-end">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-heading text-lg font-semibold">¿Hablamos ahora?</p>
              <p className="mt-2 text-sm text-white/75">
                Resuelve tus dudas al instante con un asesor por WhatsApp.
              </p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-heading font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none"
              >
                <MessageCircle size={20} /> {cta.advisor}
              </a>

              <div className="mt-6 flex flex-wrap gap-2">
                {contact.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/10"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
