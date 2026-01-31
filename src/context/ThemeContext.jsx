import { createContext, useContext, useState, useMemo, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('beshtashta-theme')
      if (saved) return saved === 'dark'
      return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem('beshtashta-theme', next ? 'dark' : 'light')
      return next
    })
  }

  const value = useMemo(() => ({ isDark, toggle }), [isDark])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
