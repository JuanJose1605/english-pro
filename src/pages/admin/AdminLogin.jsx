import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, LogIn } from 'lucide-react'
import { login, me } from '../../lib/api'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // If already logged in, skip straight to the dashboard
  useEffect(() => {
    me()
      .then((d) => d.authenticated && navigate('/admin/posts', { replace: true }))
      .catch(() => {})
  }, [navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/admin/posts', { replace: true })
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <Lock size={22} />
          </span>
          <h1 className="mt-4 font-heading text-xl font-bold text-ink">Panel de administración</h1>
          <p className="mt-1 text-sm text-muted">Inicia sesión para gestionar el blog.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
              className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-ink outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-ink outline-none focus:border-primary"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-accent-50 px-3 py-2 text-sm text-accent-700">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            <LogIn size={18} /> {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
