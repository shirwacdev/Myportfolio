import useTheme from '../hooks/useTheme'

const ThemeToggle = ({ compact = false, className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={[
        'inline-flex items-center justify-center border border-[var(--border-soft)] bg-[var(--surface-card)] text-[var(--text-primary)] transition-all hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]',
        compact ? 'h-8 w-8 rounded-full' : 'h-10 w-10 rounded-full shadow-[var(--shadow-soft)]',
        className,
      ].join(' ')}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          </>
        ) : (
          <path d="M20.2 14.6A8.5 8.5 0 1 1 9.4 3.8a7.2 7.2 0 1 0 10.8 10.8Z" />
        )}
      </svg>
    </button>
  )
}

export default ThemeToggle
