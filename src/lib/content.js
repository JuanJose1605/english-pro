/**
 * Convierte el texto de una entrada (escrito en el panel de admin con un
 * formato simple) en los bloques que renderiza la página del artículo.
 *
 * Convenciones del editor:
 *   - Una línea en blanco separa párrafos.
 *   - `## Texto`        → subtítulo
 *   - `> Texto`         → cita destacada
 *   - `- Texto`         → elemento de lista (varias líneas seguidas = una lista)
 *   - `![pie](url)`     → imagen (el texto entre corchetes es el pie opcional)
 */

// Coincide con una línea que es solo una imagen: ![pie opcional](url)
const IMG_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/
export function parseContent(content) {
  if (Array.isArray(content)) return content // ya son bloques (posts de ejemplo)
  if (!content) return []

  const chunks = String(content)
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)

  const blocks = []
  for (const raw of chunks) {
    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    if (lines.length === 0) continue

    // Una o varias imágenes en el bloque (cada línea es una imagen propia).
    if (lines.every((l) => IMG_RE.test(l))) {
      for (const l of lines) {
        const [, alt, src] = l.match(IMG_RE)
        blocks.push({ type: 'img', src: src.trim(), alt: alt.trim() })
      }
    } else if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ type: 'ul', items: lines.map((l) => l.slice(2).trim()) })
    } else if (lines[0].startsWith('## ')) {
      blocks.push({ type: 'h2', text: lines[0].slice(3).trim() })
      const rest = lines.slice(1).join(' ')
      if (rest) blocks.push({ type: 'p', text: rest })
    } else if (lines[0].startsWith('> ')) {
      blocks.push({ type: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') })
    } else {
      blocks.push({ type: 'p', text: lines.join(' ') })
    }
  }
  return blocks
}

/**
 * Normaliza una entrada (venga de la API en MySQL o de los datos de ejemplo)
 * a la forma única que consumen las páginas del blog.
 */
export function normalizePost(row) {
  // Los posts de ejemplo ya vienen con la forma correcta.
  if (Array.isArray(row.cover) && Array.isArray(row.content)) return row

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    category: row.category || 'Aprendizaje',
    author: { name: row.author_name || 'Equipo English Pro', role: '' },
    date: row.date,
    readMins: Number(row.read_mins) || 4,
    cover: [row.cover_from || '#004088', row.cover_to || '#003066'],
    coverImage: row.cover_image || '',
    featured: !!Number(row.featured),
    status: row.status || 'published',
    content: parseContent(row.content),
    rawContent: row.content || '', // texto sin procesar (para el editor)
  }
}
