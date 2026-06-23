import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Save, Trash2, Upload } from 'lucide-react'
import useRequireAuth from './useRequireAuth'
import { adminGetPost, createPost, updatePost, uploadImage } from '../../lib/api'
import { blogCategories } from '../../data/blog'

const empty = {
  title: '',
  category: 'Aprendizaje',
  excerpt: '',
  content: '',
  author_name: 'Equipo English Pro',
  cover_from: '#004088',
  cover_to: '#003066',
  cover_image: '',
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
  const [uploading, setUploading] = useState('') // 'cover' | 'content' | ''
  const contentRef = useRef(null)

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

  // Sube la imagen de portada de la noticia.
  const onCoverFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // permite volver a elegir el mismo archivo
    if (!file) return
    setError('')
    setUploading('cover')
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, cover_image: url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading('')
    }
  }

  // Sube una imagen y la inserta dentro del contenido, en la posición del cursor.
  const onContentImage = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setUploading('content')
    try {
      const url = await uploadImage(file)
      const snippet = `\n\n![Pie de foto opcional](${url})\n\n`
      const el = contentRef.current
      const pos = el ? el.selectionStart : form.content.length
      const next = form.content.slice(0, pos) + snippet + form.content.slice(pos)
      setForm((f) => ({ ...f, content: next }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading('')
    }
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
            hint="Una línea en blanco = nuevo párrafo · ## Subtítulo · > Cita · - Elemento de lista · ![pie](url) Imagen"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary">
                <ImagePlus size={16} />
                {uploading === 'content' ? 'Subiendo…' : 'Insertar imagen'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={onContentImage}
                  disabled={uploading === 'content'}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-muted">
                Se inserta donde tengas el cursor dentro del texto.
              </span>
            </div>
            <textarea
              ref={contentRef}
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

          <Field
            label="Imagen de portada"
            hint="Aparece en la cabecera de la noticia y en la tarjeta del listado. Si no subes ninguna, se usa el degradado de abajo."
          >
            {form.cover_image ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <img
                  src={form.cover_image}
                  alt="Portada"
                  className="h-28 w-full rounded-lg border border-line object-cover sm:w-48"
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, cover_image: '' }))}
                  className="inline-flex items-center gap-2 self-start rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent-50"
                >
                  <Trash2 size={16} /> Quitar imagen
                </button>
              </div>
            ) : (
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-line px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary">
                <Upload size={18} />
                {uploading === 'cover' ? 'Subiendo…' : 'Subir imagen de portada'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={onCoverFile}
                  disabled={uploading === 'cover'}
                  className="hidden"
                />
              </label>
            )}
          </Field>

          <Field
            label="Colores de portada"
            hint="Degradado de respaldo cuando la noticia no tiene imagen de portada."
          >
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
