import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import StatCard from '../components/StatCard'
import { fetchDashboardAnalytics } from '../api/adminApi'

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchDashboardAnalytics()
        setAnalytics(data)
      } catch (loadError) {
        setError(loadError.message || 'Could not load dashboard analytics.')
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const totals = analytics?.totals || {}

  return (
    <AdminLayout
      title="Dashboard"
      description="Overview of portfolio content, messages, and activity"
    >
      {error ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={loading ? '...' : totals.projects || 0} helper={`${totals.featuredProjects || 0} featured`} />
        <StatCard label="Services" value={loading ? '...' : totals.services || 0} helper="Offerings available" />
        <StatCard label="Skills" value={loading ? '...' : totals.skills || 0} helper="Stack entries" />
        <StatCard label="Messages" value={loading ? '...' : totals.messages || 0} helper={`${totals.unreadMessages || 0} unread`} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Messages</h3>
          <div className="mt-4 space-y-3">
            {(analytics?.recentMessages || []).map((message) => (
              <article key={message._id} className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{message.fullName}</p>
                  <span className="rounded-full bg-[var(--brand-tint)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
                    {message.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{message.email}</p>
                {message.phone ? <p className="mt-1 text-xs text-[var(--text-muted)]">{message.phone}</p> : null}
                <p className="mt-2 text-sm text-[var(--text-primary)]">{message.subject}</p>
              </article>
            ))}
            {!loading && (analytics?.recentMessages || []).length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No messages yet.</p>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Projects</h3>
          <div className="mt-4 space-y-3">
            {(analytics?.recentProjects || []).map((project) => (
              <article key={project._id} className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] p-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{project.title}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{project.category}</p>
              </article>
            ))}
            {!loading && (analytics?.recentProjects || []).length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No project records yet.</p>
            ) : null}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage
