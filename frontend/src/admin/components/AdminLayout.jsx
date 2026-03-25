import { NavLink, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ThemeToggle from '../../components/ThemeToggle'
import { ADMIN_NAV_ITEMS } from '../config/nav'
import { clearAdminSession, getAdminUser } from '../utils/authSession'

const navLinkClass = ({ isActive }) =>
  [
    'block rounded-xl px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-[var(--brand-primary)] text-white'
      : 'text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]',
  ].join(' ')

const AdminLayout = ({ title, description, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const pageTitle = useMemo(() => title || 'Admin Dashboard', [title])
  const adminUser = useMemo(() => getAdminUser(), [])

  const onLogout = () => {
    clearAdminSession()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)] transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Shirwac Dev</p>
              <h2 className="mt-1 text-lg font-semibold">Admin Panel</h2>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] text-[var(--text-muted)] lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 space-y-1.5">
            {ADMIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Signed In</p>
            <p className="mt-2 text-sm text-[var(--text-primary)]">{adminUser?.username || adminUser?.email || 'Admin user'}</p>
          </div>
        </aside>

        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        ) : null}

        <div className="w-full lg:pl-72">
          <header className="sticky top-0 z-20 border-b border-[var(--border-soft)] bg-[var(--surface-overlay)]/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] text-[var(--text-muted)] lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>

                <div>
                  <h1 className="text-lg font-semibold text-[var(--text-primary)]">{pageTitle}</h1>
                  {description ? <p className="text-xs text-[var(--text-muted)]">{description}</p> : null}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--border-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  View Site
                </a>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-full border border-red-300/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-red-600 dark:text-red-300"
                >
                  Logout
                </button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout

