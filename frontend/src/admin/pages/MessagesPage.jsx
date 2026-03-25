import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { deleteMessage, fetchCollection, updateMessageStatus } from '../api/adminApi'

const STATUS_OPTIONS = ['new', 'read', 'replied']

const MessagesPage = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const loadMessages = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await fetchCollection('contacts')
      setMessages(data)
    } catch (loadError) {
      setError(loadError.message || 'Could not load messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const visibleMessages = useMemo(() => {
    if (activeFilter === 'all') return messages
    return messages.filter((message) => message.status === activeFilter)
  }, [messages, activeFilter])

  const setStatus = async (id, status) => {
    try {
      await updateMessageStatus(id, status)
      await loadMessages()
    } catch (statusError) {
      setError(statusError.message || 'Could not update message status.')
    }
  }

  const removeMessage = async (id) => {
    const accepted = window.confirm('Delete this message?')
    if (!accepted) return

    try {
      await deleteMessage(id)
      await loadMessages()
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete message.')
    }
  }

  return (
    <AdminLayout title="Messages" description="View and manage contact form submissions">
      <div className="flex flex-wrap items-center gap-2">
        {['all', ...STATUS_OPTIONS].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] ${
              activeFilter === filter
                ? 'bg-[var(--brand-primary)] text-white'
                : 'border border-[var(--border-soft)] text-[var(--text-muted)]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-5 space-y-4">
        {loading ? <p className="text-sm text-[var(--text-muted)]">Loading messages...</p> : null}

        {!loading && visibleMessages.length === 0 ? (
          <p className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-card)] px-4 py-3 text-sm text-[var(--text-muted)]">
            No messages found.
          </p>
        ) : null}

        {visibleMessages.map((message) => (
          <article
            key={message._id}
            className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{message.subject}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {message.fullName} • {message.email}
                  {message.phone ? ` • ${message.phone}` : ''}
                </p>
              </div>
              <span className="rounded-full bg-[var(--brand-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
                {message.status}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--text-primary)]">{message.message}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={`${message._id}-${status}`}
                  type="button"
                  onClick={() => setStatus(message._id, status)}
                  className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
                >
                  Mark {status}
                </button>
              ))}

              <button
                type="button"
                onClick={() => removeMessage(message._id)}
                className="rounded-full border border-red-300/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-red-600 dark:text-red-300"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  )
}

export default MessagesPage
