import { navLinks, contact } from '../../data/site'
import { scrollToId } from '../../lib/scroll'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-pro py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="inline-flex rounded-2xl bg-white p-4 shadow-soft">
              <img src="./logo.png" alt="English Pro Academy" className="h-20 w-auto" />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Academia de inglés 100% virtual. Clases en vivo, grupos reducidos y certificación
              oficial. <span className="font-medium text-white">Easy to teach, easy to learn.</span>
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>{contact.phone}</li>
              <li>{contact.email}</li>
              <li>{contact.schedule}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              {contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {year} English Pro Academy. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
