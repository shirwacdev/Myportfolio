import { createContext, useEffect, useMemo, useState } from 'react'

const THEME_KEY = 'shirwac-theme'
const ThemeContext = createContext(null)

const resolveInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const applyThemeClass = (theme) => {
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme

  window.setTimeout(() => {
    root.classList.remove('theme-transition')
  }, 350)
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme)

  useEffect(() => {
    applyThemeClass(theme)
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
