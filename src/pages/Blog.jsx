import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import BrandText from '../components/ui/BrandText'
import { blogCategories, formatDate } from '../data/blog'
import { fetchPosts } from '../lib/api'

function Cover({ post, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${post.cover[0]}, ${post.cover[1]})` }}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_45%)]" />
      <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        {post.category}
      </span>
    </div>
  )
}

function Meta({ post, light = false }) {
  const tone = light ? 'text-white/80' : 'text-muted'
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${tone}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={14} /> {formatDate(post.date)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} /> {post.readMins} min de lectura
      </span>
    </div>
  )
}

export default function Blog() {
  const [category, setCategory] = useState('Todos')
  const [posts, setPosts] = useState(null)

  // Load posts from the API (falls back to the sample posts) + scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPosts().then(setPosts)
  }, [])

  const featured = useMemo(
    () => (posts ? posts.find((p) => p.featured) || posts[0] : null),
    [posts],
  )

  const list = useMemo(() => {
    if (!posts || !featured) return []
    const rest = posts.filter((p) => p.slug !== featured.slug)
    return category === 'Todos' ? rest : rest.filter((p) => p.category === category)
  }, [category, posts, featured])

  if (!posts) {
    return (
      <main className="grid min-h-screen place-items-center bg-surface pt-[var(--nav-h)]">
        <p className="animate-pulse text-muted">Cargando entradas…</p>
      </main>
    )
  }

  if (posts.length === 0 || !featured) {
    return (
      <main className="grid min-h-screen place-items-center bg-surface pt-[var(--nav-h)] text-center">
        <div className="container-pro">
          <h1 className="font-heading text-2xl font-bold text-ink">Aún no hay entradas</h1>
          <p className="mt-2 text-muted">Muy pronto publicaremos contenido nuevo.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-surface pt-[var(--nav-h)]">
      {/* Header */}
      <section className="bg-white">
        <div className="container-pro py-14 text-center sm:py-16">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            El blog de <BrandText>English Pro</BrandText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Consejos, recursos y guías para aprender inglés de verdad y certificar tu nivel ante el
            mundo.
          </p>
        </div>
      </section>

      <div className="container-pro py-12 sm:py-16">
        {/* Featured post */}
        <Link
          to={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift lg:grid-cols-2"
        >
          <Cover post={featured} className="min-h-[220px] lg:min-h-full" />
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Destacado
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{featured.excerpt}</p>
            <div className="mt-5">
              <Meta post={featured} />
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary">
              Leer artículo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        {/* Category filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? 'bg-primary text-white'
                  : 'bg-white text-ink ring-1 ring-line hover:ring-primary-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {list.length === 0 ? (
          <p className="mt-12 text-center text-muted">
            Aún no hay entradas en esta categoría. ¡Pronto publicaremos más!
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <Cover post={post} className="h-44" />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <div className="mt-4">
                      <Meta post={post} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
