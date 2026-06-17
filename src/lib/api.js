import { posts as staticPosts } from '../data/blog'
import { normalizePost } from './content'

// El backend PHP vive en la carpeta /api junto al sitio. Con HashRouter la URL
// del documento siempre es la raíz, así que './api' resuelve a /api correctamente.
const API = './api'

async function req(path, options = {}) {
  const res = await fetch(`${API}/${path}`, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Error de servidor')
  return data
}

/* ---------------- Blog público (con respaldo a los ejemplos) ---------------- */

export async function fetchPosts() {
  try {
    const rows = await req('posts.php')
    if (!Array.isArray(rows) || rows.length === 0) return staticPosts
    return rows.map(normalizePost)
  } catch {
    return staticPosts // sin backend aún → muestra las entradas de ejemplo
  }
}

export async function fetchPost(slug) {
  const all = await fetchPosts()
  return all.find((p) => p.slug === slug) || null
}

/* ---------------- Autenticación del admin ---------------- */

export const login = (username, password) =>
  req('auth.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

export const logout = () => req('auth.php?action=logout', { method: 'POST' })

export const me = () => req('auth.php?action=me')

/* ---------------- Gestión de entradas (admin, sin respaldo) ---------------- */

export const adminListPosts = () => req('posts.php?all=1')

export const adminGetPost = (id) => req(`posts.php?id=${encodeURIComponent(id)}`)

export const createPost = (data) =>
  req('posts.php', { method: 'POST', body: JSON.stringify(data) })

export const updatePost = (id, data) =>
  req('posts.php', { method: 'PUT', body: JSON.stringify({ id, ...data }) })

export const deletePost = (id) =>
  req('posts.php', { method: 'DELETE', body: JSON.stringify({ id }) })
