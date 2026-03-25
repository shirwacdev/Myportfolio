import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchSettings, updateSettings } from '../api/adminApi'

const INITIAL_SETTINGS = {
  brandName: '',
  adminEmail: '',
  timezone: '',
  dashboardGreeting: '',
  itemsPerPage: 12,
  notificationsEnabled: true,
  contactHeadline: '',
  contactDescription: '',
  contactEmail: '',
  contactPhone: '',
  contactLocation: '',
}

const SettingsPage = () => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchSettings()
        setSettings({
          brandName: data.brandName || '',
          adminEmail: data.adminEmail || '',
          timezone: data.timezone || '',
          dashboardGreeting: data.dashboardGreeting || '',
          itemsPerPage: data.itemsPerPage || 12,
          notificationsEnabled: Boolean(data.notificationsEnabled),
          contactHeadline: data.contactHeadline || '',
          contactDescription: data.contactDescription || '',
          contactEmail: data.contactEmail || '',
          contactPhone: data.contactPhone || '',
          contactLocation: data.contactLocation || '',
        })
      } catch (loadError) {
        setError(loadError.message || 'Could not load settings.')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        ...settings,
        itemsPerPage: Number(settings.itemsPerPage),
      }

      const updated = await updateSettings(payload)
      setSettings({
        brandName: updated.brandName,
        adminEmail: updated.adminEmail,
        timezone: updated.timezone,
        dashboardGreeting: updated.dashboardGreeting,
        itemsPerPage: updated.itemsPerPage,
        notificationsEnabled: updated.notificationsEnabled,
        contactHeadline: updated.contactHeadline,
        contactDescription: updated.contactDescription,
        contactEmail: updated.contactEmail,
        contactPhone: updated.contactPhone,
        contactLocation: updated.contactLocation,
      })
      setSuccess('Settings saved successfully.')
    } catch (saveError) {
      setError(saveError.message || 'Could not save settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="Settings" description="Configure admin and dashboard behavior">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-soft)]"
      >
        {loading ? <p className="text-sm text-[var(--text-muted)]">Loading settings...</p> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Brand Name</span>
            <input
              type="text"
              name="brandName"
              value={settings.brandName}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Admin Email</span>
            <input
              type="email"
              name="adminEmail"
              value={settings.adminEmail}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Timezone</span>
            <input
              type="text"
              name="timezone"
              value={settings.timezone}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Items Per Page</span>
            <input
              type="number"
              name="itemsPerPage"
              value={settings.itemsPerPage}
              onChange={onChange}
              min={5}
              max={100}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Dashboard Greeting</span>
          <textarea
            name="dashboardGreeting"
            value={settings.dashboardGreeting}
            onChange={onChange}
            rows={3}
            required
            className="mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
        </label>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Contact Headline</span>
            <input
              type="text"
              name="contactHeadline"
              value={settings.contactHeadline}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Contact Description</span>
            <textarea
              name="contactDescription"
              value={settings.contactDescription}
              onChange={onChange}
              rows={3}
              required
              className="mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Contact Email</span>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Contact Phone</span>
            <input
              type="text"
              name="contactPhone"
              value={settings.contactPhone}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Contact Location</span>
            <input
              type="text"
              name="contactLocation"
              value={settings.contactLocation}
              onChange={onChange}
              required
              className="mt-2 h-10 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </label>
        </div>

        <label className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--text-primary)]">
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={settings.notificationsEnabled}
            onChange={onChange}
            className="h-4 w-4 rounded border-[var(--border-soft)]"
          />
          Enable dashboard notifications
        </label>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-300">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300">
            {success}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving || loading}
          className="mt-5 rounded-full bg-[var(--brand-deep)] px-6 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[var(--brand-strong)] disabled:opacity-70"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </AdminLayout>
  )
}

export default SettingsPage
