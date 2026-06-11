import { navLinks, contact } from '../../data/site'
import { scrollToId } from '../../lib/scroll'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-pro py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src="./logo.png" alt="English Pro Academy" className="h-12 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Academia de inglés 100% virtual. Clases en vivo, grupos reducidos y certificación
              oficial. <span className="font-medium text-primary">Easy to teach, easy to learn.</span>
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
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
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-sm text-muted">
          © {year} English Pro Academy. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
