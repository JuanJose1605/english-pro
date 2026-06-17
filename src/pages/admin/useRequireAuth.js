import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { me } from '../../lib/api'

/**
 * Comprueba que haya una sesión de admin activa. Mientras verifica devuelve
 * `undefined`; si no hay sesión, redirige al login.
 */
export default function useRequireAuth() {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    let alive = true
    me()
      .then((d) => {
        if (!alive) return
        if (d.authenticated) setUser(d.user)
        else navigate('/admin', { replace: true })
      })
      .catch(() => navigate('/admin', { replace: true }))
    return () => {
      alive = false
    }
  }, [navigate])

  return user
}
