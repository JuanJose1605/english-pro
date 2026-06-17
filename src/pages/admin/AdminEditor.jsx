import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import useRequireAuth from './useRequireAuth'
import { adminGetPost, createPost, updatePost } from '../../lib/api'
import { blogCategories } from '../../data/blog'

const empty = {
  title: '',
  category: 'Aprendizaje',
  excerpt: '',
  content: '',
  author_name: 'Equipo English Pro',
  cover_from: '#004088',
  cover_to: '#003066',
  read_mins: 4,
  status: 'draft',
  featured: 0,
  date: '',
}

// Categorías sin la pseudo-opción "Todos" (esa es solo para filtrar el listado).
const categories = blogCategories.filter((c) => c !== 'Todos')

export default function AdminEditor() {
  const user = useRequireAuth()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && isEdit) {
      adminGetPost(id)
        .then((p) =>
          setForm({
            ...empty,
            ...p,
            featured: Number(p.featured) || 0,
            date: p.date || '',
          }),
        )
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false))
    }
  }, [user, id, isEdit])

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  const save = async (status) => {
    setError('')
    setSaving(true)
    try {
      const payload = { ...form, status }
      if (isEdit) await updatePost(id, payload)
      else await createPost(payload)
      navigate('/admin/posts')
    } catch (e) {
      setError(e.message)
      setSaving(false)
    }
  }

  if (user === undefined || loading) {
    return <main className="grid min-h-screen place-items-center text-muted">Cargando…</main>
  }

  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-line bg-white">
        <div className="container-pro flex h-16 items-center justify-between">
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary"
          >
            <ArrowLeft size={16} /> Volver
          </Link>
          <span className="font-heading text-sm font-semibold text-ink">
            {isEdit ? 'Editar entrada' : 'Nueva entrada'}
          </span>
        </div>
      </header>

      <div className="container-pro max-w-3xl py-10">
        {error && (
          <p className="mb-6 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">{error}</p>
        )}

        <div className="space-y-6 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <Field label="Título">
            <input
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="Ej: 5 hábitos para mejorar tu inglés"
              className="input"
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Categoría">
              <select value={form.category} onChange={set('category')} className="input">
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Fecha">
              <input type="date" value={form.date} onChange={set('date')} className="input" />
            </Field>
          </div>

          <Field label="Resumen" hint="Aparece en las tarjetas del listado y en buscadores.">
            <textarea
              value={form.excerpt}
              onChange={set('excerpt')}
              rows={2}
              className="input resize-y"
            />
          </Field>

          <Field
            label="Contenido"
            hint="Una línea en blanco = nuevo párrafo · ## Subtítulo · > Cita · - Elemento de lista"
          >
            <textarea
              value={form.content}
              onChange={set('content')}
              rows={14}
              placeholder={'Escribe aquí tu artículo…\n\n## Un subtítulo\n\nUn párrafo normal.\n\n> Una cita destacada.\n\n- Primer punto\n- Segundo punto'}
              className="input resize-y font-mono text-sm"
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Autor">
              <input
                type="text"
                value={form.author_name}
                onChange={set('author_name')}
                className="input"
              />
            </Field>
            <Field label="Minutos de lectura">
              <input
                type="number"
                min={1}
                value={form.read_mins}
                onChange={set('read_mins')}
                className="input"
              />
            </Field>
          </div>

          <Field label="Colores de portada" hint="Degradado de la imagen de cabecera.">
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={form.cover_from}
                onChange={set('cover_from')}
                className="h-10 w-16 cursor-pointer rounded border border-line"
                title="Color inicial"
              />
              <input
                type="color"
                value={form.cover_to}
                onChange={set('cover_to')}
                className="h-10 w-16 cursor-pointer rounded border border-line"
                title="Color final"
              />
              <span
                className="h-10 flex-1 rounded-lg border border-line"
                style={{
                  background: `linear-gradient(135deg, ${form.cover_from}, ${form.cover_to})`,
                }}
              />
            </div>
          </Field>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={Number(form.featured) === 1}
              onChange={set('featured')}
              className="h-4 w-4 rounded border-line text-primary focus:ring-primary"
            />
            <span className="text-sm text-ink">
              Destacar esta entrada (aparece grande arriba del blog)
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={() => save('draft')}
            disabled={saving}
            className="btn-secondary"
          >
            Guardar borrador
          </button>
          <button onClick={() => save('published')} disabled={saving} className="btn-primary">
            <Save size={18} /> {saving ? 'Guardando…' : 'Publicar'}
          </button>
        </div>
      </div>
    </main>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      {hint && <p className="mb-1 text-xs text-muted">{hint}</p>}
      <div className={hint ? '' : 'mt-1'}>{children}</div>
    </div>
  )
}
