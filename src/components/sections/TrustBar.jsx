import Reveal from '../ui/Reveal'
import { certifications } from '../../data/site'

export default function TrustBar() {
  return (
    <section aria-label="Certificaciones que preparamos" className="border-y border-line bg-white">
      <div className="container-pro py-8">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Te preparamos para las certificaciones internacionales más reconocidas
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="font-heading text-xl font-bold tracking-tight text-muted/80 grayscale transition-all duration-300 hover:text-primary hover:grayscale-0 sm:text-2xl"
                title={c.note}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </Reveal>
        {/* ⚠️ PLACEHOLDER — sustituir los nombres por los logotipos oficiales (SVG/PNG) */}
      </div>
    </section>
  )
}
