import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, cta } from '../data/site'
import useActiveSection from '../hooks/useActiveSection'
import { scrollToId } from '../lib/scroll'

const sectionIds = navLinks.map((l) => l.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const location = useLocation()
  const navigate = useNavigate()

  const onHome = location.pathname === '/'
  const onBlog = location.pathname.startsWith('/blog')

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
    if (onHome) {
      scrollToId(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const goHome = () => {
    setOpen(false)
    if (onHome) scrollToId('inicio')
    else navigate('/')
  }

  return (
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
          <img src="./logo.png" alt="English Pro Academy" className="h-16 w-auto sm:h-20 lg:h-[5.5rem]" />
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={`relative rounded-full px-4 py-2.5 text-base font-medium transition-colors duration-200 hover:text-primary ${
                  onHome && active === link.id ? 'text-primary' : 'text-ink'
                }`}
                aria-current={onHome && active === link.id ? 'true' : undefined}
              >
                {link.label}
                {onHome && active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </button>
            </li>
          ))}
          {/* Blog — a real route, not a section anchor */}
          <li>
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className={`relative rounded-full px-4 py-2.5 text-base font-medium transition-colors duration-200 hover:text-primary ${
                onBlog ? 'text-primary' : 'text-ink'
              }`}
              aria-current={onBlog ? 'page' : undefined}
            >
              Blog
              {onBlog && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                />
              )}
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <button onClick={() => go('cotiza')} className="btn-primary hidden lg:inline-flex !px-6 !py-2.5">
          {cta.trialFloating}
        </button>

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

      {/* Mobile drawer */}
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
                  Blog
                </Link>
              </motion.li>
              <motion.li
                className="mt-3"
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
              >
                <button onClick={() => go('cotiza')} className="btn-primary w-full">
                  {cta.trialFloating}
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
