import { createContext, useContext, useState, useMemo } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('beshtashta-lang')
      if (saved === 'kg' || saved === 'ru') return saved
    }
    return 'ru'
  })

  const setLanguage = (l) => {
    if (l !== 'ru' && l !== 'kg') return
    setLang(l)
    localStorage.setItem('beshtashta-lang', l)
  }

  const t = useMemo(() => translations[lang] ?? translations.ru, [lang])
  const value = useMemo(() => ({ lang, setLanguage, t }), [lang, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
