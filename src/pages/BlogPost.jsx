import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { formatDate } from '../data/blog'
import { fetchPosts } from '../lib/api'
import { whatsappUrl, trialMessage } from '../data/site'

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-10 font-heading text-2xl font-bold text-ink">{block.text}</h2>
      )
    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-accent bg-surface px-6 py-4 font-heading text-lg italic text-ink">
          {block.text}
        </blockquote>
      )
    case 'ul':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )
    default:
      return <p className="mt-4 leading-relaxed text-muted">{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPosts().then(setPosts)
  }, [slug])

  const post = useMemo(() => posts?.find((p) => p.slug === slug) || null, [posts, slug])
  const related = useMemo(
    () => (posts ? posts.filter((p) => p.slug !== slug).slice(0, 2) : []),
    [posts, slug],
  )

  if (posts === null) {
    return (
      <main className="grid min-h-screen place-items-center pt-[var(--nav-h)]">
        <p className="animate-pulse text-muted">Cargando…</p>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="pt-[var(--nav-h)]">
        <div className="container-pro py-24 text-center">
          <h1 className="font-heading text-3xl font-bold text-ink">Entrada no encontrada</h1>
          <p className="mt-3 text-muted">La entrada que buscas no existe o fue movida.</p>
          <Link to="/blog" className="btn-secondary mt-8 inline-flex">
            <ArrowLeft size={18} /> Volver al blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white pt-[var(--nav-h)]">
      {/* Cover banner */}
      <div
        className="relative"
        style={{ background: `linear-gradient(135deg, ${post.cover[0]}, ${post.cover[1]})` }}
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_15%,#fff,transparent_45%)]" />
        <div className="container-pro relative py-14 sm:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> Volver al blog
          </Link>
          <span className="mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {post.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="font-medium text-white">{post.author.name}</span>
            <span className="hidden h-3 w-px bg-white/30 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} /> {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} /> {post.readMins} min de lectura
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="container-pro max-w-3xl py-12 sm:py-16">
        <p className="text-lg font-medium leading-relaxed text-ink">{post.excerpt}</p>
        <div className="mt-2">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-primary p-8 text-center text-white sm:p-10">
          <h3 className="font-heading text-2xl font-bold">¿Listo para llevar tu inglés al siguiente nivel?</h3>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Toma una clase de prueba gratis y descubre nuestra metodología en vivo.
          </p>
          <a
            href={whatsappUrl(trialMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 inline-flex"
          >
            ¡Quiero mi clase de prueba!
          </a>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface">
          <div className="container-pro py-14">
            <h2 className="font-heading text-2xl font-bold text-ink">Sigue leyendo</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group flex items-center gap-5 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div
                    className="hidden h-20 w-24 shrink-0 rounded-xl sm:block"
                    style={{ background: `linear-gradient(135deg, ${r.cover[0]}, ${r.cover[1]})` }}
                  />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {r.category}
                    </span>
                    <h3 className="mt-1 font-heading font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                      {r.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Leer <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
