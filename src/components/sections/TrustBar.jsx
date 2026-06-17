import Reveal from '../ui/Reveal'
import CertLogo from '../ui/CertLogo'
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
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {certifications.map((c) => (
              <li key={c.name} title={c.note} className="flex items-center">
                <CertLogo
                  cert={c}
                  imgClassName="h-10 w-auto object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
                  renderFallback={() => (
                    <span className="font-heading text-xl font-bold tracking-tight text-muted/80 transition-colors duration-300 hover:text-primary sm:text-2xl">
                      {c.name}
                    </span>
                  )}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
