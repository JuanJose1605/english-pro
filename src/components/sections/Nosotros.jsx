import { Target, Eye, Headphones } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { nosotros } from '../../data/site'

export default function Nosotros() {
  return (
    <Section id="nosotros" surface headingCenter={false}>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {nosotros.title}
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {nosotros.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="card-pro">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                  <Target size={22} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink">Misión</h3>
              </div>
              <p className="mt-3 leading-relaxed text-muted">{nosotros.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="card-pro">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent">
                  <Eye size={22} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink">Visión</h3>
              </div>
              <p className="mt-3 leading-relaxed text-muted">{nosotros.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-white">
              <Headphones size={24} className="shrink-0" />
              <p className="text-sm font-medium">
                Tecnología de punta con calidez humana: clases sincrónicas, no videos pregrabados.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
