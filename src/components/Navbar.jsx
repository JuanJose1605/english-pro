import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navLinks } from '../data/site'
import useActiveSection from '../hooks/useActiveSection'
import { scrollToId } from '../lib/scroll'

// Incluye los ids de los submenús para que el resaltado de sección activa también
// funcione cuando estás en una sección hija (p. ej. Metodología bajo Programas).
const sectionIds = navLinks.flatMap((l) => [l.id, ...(l.children?.map((c) => c.id) || [])])

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null) // id del dropdown abierto en escritorio
  const active = useActiveSection(sectionIds)
  const location = useLocation()
  const navigate = useNavigate()

  const onHome = location.pathname === '/'
  const onBlog = location.pathname.startsWith('/blog')

  // ¿Este enlace (o alguno de sus hijos) es la sección activa?
  const isActive = (link) =>
    onHome && (active === link.id || (link.children?.some((c) => c.id === active) ?? false))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Navigate to a landing section from any page: if we're not on the home
  // page, go home first and ask Home to scroll once it mounts.
  const go = (id) => {
    setOpen(false)
    setMenu(null)
    if (onHome) {
      scrollToId(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const goHome = () => {
    setOpen(false)
    setMenu(null)
    if (onHome) scrollToId('inicio')
    else navigate('/')
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-white/70 backdrop-blur-sm'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav className="container-pro flex h-full items-center justify-between" aria-label="Principal">
          {/* Logo */}
          <button
            onClick={goHome}
            className="flex items-center gap-2 focus-visible:outline-none"
            aria-label="English Pro Academy — ir al inicio"
          >
            <img
              src="./logo.png"
              alt="English Pro Academy"
              className="h-20 w-auto sm:h-24 lg:h-[6.5rem]"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <li
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => setMenu(link.id)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`relative inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-base font-medium transition-colors duration-200 hover:text-primary ${
                      isActive(link) ? 'text-primary' : 'text-ink'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={menu === link.id}
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        menu === link.id ? 'rotate-180' : ''
                      }`}
                    />
                    {isActive(link) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </button>

                  {/* Submenú (dropdown) */}
                  <AnimatePresence>
                    {menu === link.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full z-50 min-w-[12rem] rounded-2xl border border-line bg-white p-2 shadow-lift"
                      >
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => go(child.id)}
                              className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary ${
                                onHome && active === child.id ? 'text-primary' : 'text-ink'
                              }`}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className={`relative rounded-full px-4 py-2.5 text-base font-medium transition-colors duration-200 hover:text-primary ${
                      isActive(link) ? 'text-primary' : 'text-ink'
                    }`}
                    aria-current={isActive(link) ? 'true' : undefined}
                  >
                    {link.label}
                    {isActive(link) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </button>
                </li>
              ),
            )}
            {/* News — a real route, not a section anchor */}
            <li>
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className={`relative rounded-full px-4 py-2.5 text-base font-medium transition-colors duration-200 hover:text-primary ${
                  onBlog ? 'text-primary' : 'text-ink'
                }`}
                aria-current={onBlog ? 'page' : undefined}
              >
                News
                {onBlog && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden focus-visible:outline-none"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer — rendered OUTSIDE <header> on purpose: the header uses
          backdrop-blur, and a backdrop-filter ancestor turns a child's
          position:fixed into position:absolute, collapsing this panel. As a
          sibling, its fixed positioning is relative to the viewport again. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[var(--nav-h)] z-40 bg-white lg:hidden"
          >
            <motion.ul
              className="container-pro flex flex-col gap-1 py-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`w-full rounded-xl px-4 py-3.5 text-left text-lg font-medium transition-colors ${
                      onHome && active === link.id ? 'bg-primary-50 text-primary' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </button>

                  {/* Subenlaces (p. ej. Metodología bajo Programas) */}
                  {link.children?.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => go(child.id)}
                      className={`mt-1 flex w-full items-center gap-2 rounded-xl py-3 pl-8 pr-4 text-left text-base font-medium transition-colors ${
                        onHome && active === child.id ? 'bg-primary-50 text-primary' : 'text-muted'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {child.label}
                    </button>
                  ))}
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className={`block w-full rounded-xl px-4 py-3.5 text-left text-lg font-medium transition-colors ${
                    onBlog ? 'bg-primary-50 text-primary' : 'text-ink'
                  }`}
                >
                  News
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
