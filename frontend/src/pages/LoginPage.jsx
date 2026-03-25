import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import profileImage from '../assets/b.jpg.png'
import { getCurrentAdmin, loginAdmin } from '../admin/api/adminApi'
import { isAdminAuthenticated, setAdminSession } from '../admin/utils/authSession'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectTo = location.state?.from?.pathname || '/admin'

  useEffect(() => {
    const verifyExistingSession = async () => {
      if (!isAdminAuthenticated()) return

      try {
        await getCurrentAdmin()
        navigate('/admin', { replace: true })
      } catch {
        // stale/invalid token will be cleared by the api client
      }
    }

    verifyExistingSession()
  }, [navigate])

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await loginAdmin({ username, password })

      setAdminSession({
        token: response.token,
        user: response.user,
        remember: keepSignedIn,
      })

      navigate(redirectTo, { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px] rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-card)] shadow-[var(--shadow-hard)] lg:grid lg:grid-cols-[1fr_1fr]">
        <aside className="relative overflow-hidden rounded-t-[28px] bg-[var(--brand-deep)] p-8 text-white lg:rounded-l-[28px] lg:rounded-tr-none lg:p-12">
          <div className="relative z-10">
            <p className="text-3xl font-semibold">Shirwac Dev</p>
            <h1 className="mt-9 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Build your workflow with architectural precision.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-sky-100/90">
              Secure access for your admin workspace. Manage projects, services, and client messages in one place.
            </p>

            <div className="relative mt-9 overflow-hidden rounded-2xl border border-sky-200/20 bg-[#021a44] p-2">
              <img
                src={profileImage}
                alt="Shirwac portrait"
                className="h-[420px] w-full rounded-xl bg-white object-contain object-center sm:h-[500px]"
              />

              <div className="absolute bottom-4 right-4 rounded-xl border border-sky-200/20 bg-sky-100/15 px-4 py-3 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-200">Next Milestone</p>
                <p className="mt-1 text-lg font-semibold text-white">Admin Launch</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="p-8 sm:p-10 lg:p-14">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">Welcome Back</h2>
            <p className="mt-3 text-xl text-[var(--text-muted)]">Please enter your credentials to access your dashboard.</p>

            <form onSubmit={onSubmit} className="mt-10 space-y-6">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Username</span>
                <span className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 19a7 7 0 0 1 14 0" />
                  </svg>
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="admin"
                    required
                    className="h-full w-full bg-transparent text-base text-[var(--text-primary)] outline-none"
                  />
                </span>
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Password</span>
                  <button type="button" className="text-sm font-semibold text-[var(--brand-strong)]">
                    Forgot password?
                  </button>
                </span>

                <span className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    required
                    className="h-full w-full bg-transparent text-base text-[var(--text-primary)] outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label="Toggle password visibility">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </span>
              </label>

              <label className="inline-flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(event) => setKeepSignedIn(event.target.checked)}
                  className="h-5 w-5 rounded border-[var(--border-soft)]"
                />
                Keep me signed in on this device
              </label>

              {error ? (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[var(--brand-deep)] text-lg font-semibold text-white transition-colors hover:bg-[var(--brand-strong)] disabled:opacity-70"
              >
                {loading ? 'Signing In...' : 'Sign In to Shirwac Dev'}
                <span aria-hidden="true">?</span>
              </button>

              <div className="border-t border-[var(--border-soft)] pt-8 text-center">
                <p className="text-sm text-[var(--text-muted)]">Need admin setup help?</p>
                <Link
                  to="/"
                  className="mt-4 inline-flex rounded-xl bg-[var(--surface-muted)] px-8 py-3 text-2xl font-semibold text-[var(--text-primary)]"
                >
                  Back to Portfolio
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LoginPage
