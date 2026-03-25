import { useEffect, useMemo, useState } from 'react'
import { submitContactForm, fetchPublicSettings } from '../utils/api'

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const DEFAULT_CONTACT_CONTENT = {
  contactHeadline: "Let's build something legacy.",
  contactDescription:
    'I am currently taking on select high-impact projects. Reach out to discuss your technical vision.',
  contactEmail: 'shirwac.dev@gmail.com',
  contactPhone: '+252615835675',
  contactLocation: 'Nairobi, Kenya',
}

const ContactSection = () => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [contactContent, setContactContent] = useState(DEFAULT_CONTACT_CONTENT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let active = true

    const loadContactContent = async () => {
      try {
        const settings = await fetchPublicSettings()
        if (!active) return

        setContactContent({
          contactHeadline: settings.contactHeadline || DEFAULT_CONTACT_CONTENT.contactHeadline,
          contactDescription: settings.contactDescription || DEFAULT_CONTACT_CONTENT.contactDescription,
          contactEmail: settings.contactEmail || DEFAULT_CONTACT_CONTENT.contactEmail,
          contactPhone: settings.contactPhone || DEFAULT_CONTACT_CONTENT.contactPhone,
          contactLocation: settings.contactLocation || DEFAULT_CONTACT_CONTENT.contactLocation,
        })
      } catch {
        // Keep default contact content when settings are unavailable.
      }
    }

    loadContactContent()

    return () => {
      active = false
    }
  }, [])

  const contactDetails = useMemo(
    () => [
      {
        label: 'Email',
        value: contactContent.contactEmail,
        href: `mailto:${contactContent.contactEmail}`,
      },
      {
        label: 'Phone',
        value: contactContent.contactPhone,
        href: `tel:${contactContent.contactPhone.replace(/\s+/g, '')}`,
      },
      {
        label: 'Location',
        value: contactContent.contactLocation,
        href: '#',
      },
    ],
    [contactContent],
  )

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      await submitContactForm(form)
      setSuccess('Inquiry sent successfully. I will reply shortly.')
      setForm(INITIAL_FORM)
    } catch (submitError) {
      setError(submitError.message || 'Unable to send your inquiry right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-card)] shadow-[var(--shadow-hard)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="bg-[var(--brand-deep)] px-7 py-8 text-white sm:px-9 sm:py-10">
          <h2 className="font-heading text-4xl font-bold leading-tight">{contactContent.contactHeadline}</h2>
          <p className="mt-4 text-sm leading-7 text-sky-100/95">
            {contactContent.contactDescription}
          </p>

          <div className="mt-8 space-y-4">
            {contactDetails.map((item) => (
              <a key={item.label} href={item.href} className="flex items-center gap-3 text-sm text-sky-100 hover:text-white">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-300/20 text-[10px] font-semibold uppercase">
                  {item.label.slice(0, 1)}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-sky-200">{item.label}</p>
                  <p className="mt-0.5 text-xs text-white">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-7 w-7 rounded-full border border-sky-200/40" />
            <span className="h-7 w-7 rounded-full border border-sky-200/40" />
            <span className="h-7 w-7 rounded-full border border-sky-200/40" />
          </div>
        </aside>

        <form onSubmit={onSubmit} className="bg-[var(--surface-card)] px-7 py-8 sm:px-9 sm:py-10">
          <p className="section-kicker">Your Full Name</p>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            required
            minLength={2}
            className="mt-2 h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
            placeholder="John Doe"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="section-kicker">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="mt-2 h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="section-kicker">Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                required
                minLength={6}
                maxLength={40}
                className="mt-2 h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
                placeholder="+252615835675"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="section-kicker">Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={onChange}
                required
                minLength={3}
                className="mt-2 h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
                placeholder="Project inquiry"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="section-kicker">Project Vision</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              minLength={10}
              rows={4}
              className="mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
              placeholder="Briefly describe what you are looking to build."
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-600 dark:text-red-300">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-300">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand-deep)] px-8 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
