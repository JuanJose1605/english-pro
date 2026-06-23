import { Headphones, Video, Users, BadgeCheck } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import BrandText from '../ui/BrandText'
import { nosotros } from '../../data/site'

const highlights = [
  { icon: Video, title: 'Clases en vivo', desc: 'Sesiones sincrónicas, nunca videos pregrabados.' },
  { icon: Users, title: 'Grupos reducidos', desc: 'Máximo 10 estudiantes por grupo.' },
  { icon: BadgeCheck, title: 'Docentes certificados', desc: 'Planes de estudio diseñados a tu medida.' },
]

export default function Nosotros() {
  return (
    <Section id="nosotros" surface headingCenter={false}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
            <BrandText>{nosotros.title}</BrandText>
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {nosotros.paragraphs.map((p, i) => (
              <p key={i}>
                <BrandText>{p}</BrandText>
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-lift sm:p-10">
            {/* decorative glows */}
            <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-accent/25" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                <Headphones size={18} className="shrink-0" />
                Tecnología de punta con calidez humana
              </span>

              <ul className="mt-7 space-y-6">
                {highlights.map(({ icon: I, title, desc }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <I size={22} />
                    </span>
                    <div>
                      <p className="font-heading text-lg font-semibold">{title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/80">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
