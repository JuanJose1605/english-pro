/**
 * Smooth-scroll to a section by id, accounting for the sticky navbar height.
 * Falls back gracefully and respects reduced-motion via CSS scroll-behavior.
 */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const navH = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
  )
  const offset = (isNaN(navH) ? 72 : navH * 16) // rem → px (var is in rem)
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
