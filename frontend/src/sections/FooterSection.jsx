import ThemeToggle from '../components/ThemeToggle'
import { BRAND_NAME } from '../utils/constants'

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const FooterSection = () => (
  <footer className="border-t border-[var(--border-soft)] bg-[var(--surface-overlay)] px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-semibold text-[var(--text-primary)]">{BRAND_NAME}</p>

      <div className="flex flex-wrap items-center gap-5 text-[11px] text-[var(--text-muted)]">
        {FOOTER_LINKS.map((item) => (
          <a key={item.label} href={item.href} className="hover:text-[var(--text-primary)]">
            {item.label}
          </a>
        ))}
      </div>

      <ThemeToggle compact />
    </div>

    <div className="mx-auto mt-5 flex w-full max-w-6xl justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
      <span>(c) {new Date().getFullYear()} Shirwac Dev</span>
      <span>Privacy Policy</span>
    </div>
  </footer>
)

export default FooterSection
