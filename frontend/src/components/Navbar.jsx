import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { BRAND_NAME, NAV_LINKS } from '../utils/constants'

const linkClass = (isActive) =>
  [
    'border-b-2 px-2 py-1.5 text-[11px] font-semibold tracking-wide transition-colors',
    isActive
      ? 'border-[var(--brand-primary)] text-[var(--text-primary)]'
      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
  ].join(' ')

const Navbar = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--surface-overlay)]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="text-sm font-semibold text-[var(--text-primary)]" onClick={closeMenu}>
          {BRAND_NAME}
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={linkClass(activeSection === item.id)}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/Shirwac-Dev-CV.txt"
            download
            className="rounded-full bg-[var(--brand-deep)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            Download CV
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] text-[var(--text-primary)]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-[var(--border-soft)] bg-[var(--surface-overlay)] px-4 py-4 lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Shirwac-Dev-CV.txt"
              download
              className="mt-2 rounded-full bg-[var(--brand-deep)] px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-strong)]"
              onClick={closeMenu}
            >
              Download CV
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
