import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Pencil, Plus, Trash2, Star, ExternalLink } from 'lucide-react'
import useRequireAuth from './useRequireAuth'
import { adminListPosts, deletePost, logout } from '../../lib/api'
import { formatDate } from '../../data/blog'

export default function AdminPosts() {
  const user = useRequireAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')

  const load = () => {
    adminListPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const onDelete = async (post) => {
    if (!window.confirm(`¿Borrar la entrada "${post.title}"? Esta acción no se puede deshacer.`)) {
      return
    }
    try {
      await deletePost(post.id)
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch (e) {
      setError(e.message)
    }
  }

  const onLogout = async () => {
    await logout().catch(() => {})
    navigate('/admin', { replace: true })
  }

  if (user === undefined) {
    return <main className="grid min-h-screen place-items-center text-muted">Cargando…</main>
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="border-b border-line bg-white">
        <div className="container-pro flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="./logo.png" alt="English Pro" className="h-9 w-auto" />
            <span className="font-heading text-sm font-semibold text-ink">Panel del blog</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">Hola, {user?.name}</span>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
            >
              <LogOut size={16} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="container-pro py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink">Entradas</h1>
            <p className="mt-1 text-sm text-muted">Crea, edita y publica las entradas del blog.</p>
          </div>
          <Link to="/admin/posts/new" className="btn-primary">
            <Plus size={18} /> Nueva entrada
          </Link>
        </div>

        {error && (
          <p className="mt-6 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">{error}</p>
        )}

        {posts === null ? (
          <p className="mt-10 text-muted">Cargando entradas…</p>
        ) : posts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-muted">Todavía no hay entradas.</p>
            <Link to="/admin/posts/new" className="btn-primary mt-4 inline-flex">
              <Plus size={18} /> Crear la primera
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Título</th>
                  <th className="hidden px-5 py-3 font-semibold sm:table-cell">Categoría</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">Fecha</th>
                  <th className="px-5 py-3 font-semibold">Estado</th>
                  <th className="px-5 py-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface/60">
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 font-medium text-ink">
                        {Number(p.featured) === 1 && (
                          <Star size={14} className="fill-accent text-accent" title="Destacada" />
                        )}
                        {p.title}
                      </span>
                    </td>
                    <td className="hidden px-5 py-3 text-muted sm:table-cell">{p.category}</td>
                    <td className="hidden px-5 py-3 text-muted md:table-cell">
                      {p.date ? formatDate(p.date) : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          p.status === 'published'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted/10 text-muted'
                        }`}
                      >
                        {p.status === 'published' ? 'Publicada' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-3 text-muted">
                        {p.status === 'published' && (
                          <Link
                            to={`/blog/${p.slug}`}
                            target="_blank"
                            title="Ver en el sitio"
                            className="hover:text-primary"
                          >
                            <ExternalLink size={16} />
                          </Link>
                        )}
                        <Link
                          to={`/admin/posts/${p.id}/edit`}
                          title="Editar"
                          className="hover:text-primary"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => onDelete(p)}
                          title="Borrar"
                          className="hover:text-accent"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
