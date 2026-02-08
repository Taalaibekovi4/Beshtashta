import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import logoUrl from '../../assets/logo.svg'

const SCROLL_THRESHOLD = 80

function Header() {
  const { isDark, toggle } = useTheme()
  const { t, lang, setLanguage } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { handleAnchorClick } = useSmoothScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = isDark ? 'text-gray-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
  const accentClass = isDark ? 'text-violet-400 hover:text-violet-300 hover:bg-violet-500/10' : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'
  const activeClass = isDark ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40' : 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300'

  const isActive = (path) => location.pathname === path

  const closeMenu = () => setMenuOpen(false)

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const pageLinks = (
    <>
      <Link to="/about" className={`rounded-lg px-2 py-1.5 transition-colors ${isActive('/about') ? activeClass : navClass}`}>{t.about}</Link>
      <Link to="/terms" className={`rounded-lg px-2 py-1.5 transition-colors ${isActive('/terms') ? activeClass : navClass}`}>{t.terms}</Link>
      <Link to="/faq" className={`rounded-lg px-2 py-1.5 transition-colors ${isActive('/faq') ? activeClass : navClass}`}>{t.faq}</Link>
      <Link to="/activate" className={`rounded-lg px-2 py-1.5 font-semibold transition-colors ${isActive('/activate') || location.pathname.startsWith('/activate/') ? activeClass : accentClass}`}>{t.activate}</Link>
    </>
  )

  const anchorLinks = isHome ? (
    <>
      <a href="#tariffs" onClick={(e) => { handleAnchorClick(e); closeMenu(); }} className={`block rounded-lg px-4 py-3 transition-colors ${navClass}`}>{t.tariffs}</a>
      <a href="#how" onClick={(e) => { handleAnchorClick(e); closeMenu(); }} className={`block rounded-lg px-4 py-3 transition-colors ${navClass}`}>{t.howToStart}</a>
      <a href="#contacts" onClick={(e) => { handleAnchorClick(e); closeMenu(); }} className={`block rounded-lg px-4 py-3 transition-colors ${navClass}`}>{t.contacts}</a>
      <a href="#download" onClick={(e) => { handleAnchorClick(e); closeMenu(); }} className={`block rounded-lg px-4 py-3 transition-colors inline-flex items-center gap-2 ${navClass}`}>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        {t.downloadBtn}
      </a>
    </>
  ) : (
    <>
      <Link to="/#tariffs" onClick={closeMenu} className={`block rounded-lg px-4 py-3 transition-colors ${navClass}`}>{t.tariffs}</Link>
      <Link to="/#how" onClick={closeMenu} className={`block rounded-lg px-4 py-3 transition-colors ${navClass}`}>{t.howToStart}</Link>
      <Link to="/#contacts" onClick={closeMenu} className={`block rounded-lg px-4 py-3 transition-colors ${navClass}`}>{t.contacts}</Link>
      <Link to="/#download" onClick={closeMenu} className={`block rounded-lg px-4 py-3 transition-colors inline-flex items-center gap-2 ${navClass}`}>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        {t.downloadBtn}
      </Link>
    </>
  )

  const headerBg = isDark
    ? 'bg-zinc-900 border-zinc-700/80 shadow-lg shadow-black/20'
    : 'bg-white/95 backdrop-blur-sm border-indigo-100/80 shadow-sm'

  return (
    <>
      {/* Основной хедер в начале страницы — не прилипает, уезжает при скролле */}
      <header className={`relative z-50 border-b transition-colors duration-200 ${headerBg}`}>
        <div className="max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
          {/* Верхняя строка: О Besh Tashta | Условия | FAQ | Активация + RU/KG + тема */}
          <div className={`flex items-center justify-between py-2 min-[400px]:py-2.5 text-[11px] min-[400px]:text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>
            <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
              {pageLinks}
            </nav>
            <div className="flex items-center gap-2 min-[400px]:gap-3 ml-auto">
              <div className={`flex items-center rounded-lg border overflow-hidden ${isDark ? 'border-zinc-600' : 'border-zinc-300'}`}>
                <button
                  type="button"
                  onClick={() => setLanguage('ru')}
                  className={`px-2 min-[400px]:px-3 py-1.5 text-xs font-medium transition-colors ${lang === 'ru' ? (isDark ? 'bg-zinc-600 text-white' : 'bg-zinc-200 text-zinc-900') : (isDark ? 'text-gray-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900')}`}
                >
                  RU
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('kg')}
                  className={`px-2 min-[400px]:px-3 py-1.5 text-xs font-medium transition-colors ${lang === 'kg' ? (isDark ? 'bg-zinc-600 text-white' : 'bg-zinc-200 text-zinc-900') : (isDark ? 'text-gray-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900')}`}
                >
                  KG
                </button>
              </div>
              <button
                type="button"
                onClick={toggle}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-violet-300' : 'bg-zinc-100 hover:bg-zinc-200 text-indigo-600'}`}
                title={isDark ? 'Светлая тема' : 'Тёмная тема'}
                aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Нижняя строка: иконка + лого | Тарифы Как начать Контакты Скачать + бургер */}
          <div className={`flex items-center justify-between py-3 min-[400px]:py-4 border-t ${isDark ? 'border-zinc-700/80' : 'border-indigo-100/80'}`}>
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 min-[400px]:gap-3 flex-shrink-0 min-w-0">
              <img src={logoUrl} alt="" className="w-8 h-8 min-[400px]:w-9 min-[400px]:h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg object-contain" />
              <span className={`text-lg min-[400px]:text-xl sm:text-[22px] font-bold tracking-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Besh Tashta
              </span>
              <span className={`hidden sm:inline flex-shrink-0 ${isDark ? 'text-zinc-500' : 'text-zinc-300'}`}>|</span>
              <span className={`hidden sm:inline text-xs uppercase tracking-wide flex-shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {t.finLiteracy}
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-2 min-[400px]:gap-3 sm:gap-4 lg:gap-5 text-xs min-[400px]:text-sm font-medium flex-wrap justify-end">
              {anchorLinks}
            </nav>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`md:hidden p-2.5 rounded-xl transition-colors ${isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
              aria-label="Меню"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню — поверх контента, всегда полный список, прокручивается при нехватке места */}
        <div className={`absolute left-0 right-0 top-full z-50 md:hidden overflow-hidden transition-all duration-300 ease-out shadow-xl ${menuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} aria-hidden={!menuOpen}>
          <div className={`border-t overflow-y-auto max-h-[85vh] ${isDark ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'} px-4 py-4`}>
            <nav className="flex flex-col gap-1">
              <Link to="/about" onClick={closeMenu} className={`rounded-xl px-4 py-3 transition-colors ${isActive('/about') ? activeClass : navClass}`}>{t.about}</Link>
              <Link to="/terms" onClick={closeMenu} className={`rounded-xl px-4 py-3 transition-colors ${isActive('/terms') ? activeClass : navClass}`}>{t.terms}</Link>
              <Link to="/faq" onClick={closeMenu} className={`rounded-xl px-4 py-3 transition-colors ${isActive('/faq') ? activeClass : navClass}`}>{t.faq}</Link>
              <Link to="/activate" onClick={closeMenu} className={`rounded-xl px-4 py-3 font-semibold transition-colors ${isActive('/activate') || location.pathname.startsWith('/activate/') ? activeClass : accentClass}`}>{t.activate}</Link>
              <span className={`my-2 h-px ${isDark ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
              {anchorLinks}
            </nav>
          </div>
        </div>
      </header>

      {/* При скролле — фиксированная полоса сверху: только лого + О Besh Tashta | Условия | FAQ | Активация, без RU/KG и темы */}
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] border-b transition-all duration-300 ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} ${headerBg}`}
        aria-hidden={!scrolled}
      >
        <div className="max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 min-[400px]:py-3.5">
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 min-[400px]:gap-3 flex-shrink-0 min-w-0">
              <img src={logoUrl} alt="" className="w-8 h-8 min-[400px]:w-9 min-[400px]:h-9 flex-shrink-0 rounded-lg object-contain" />
              <span className={`text-lg min-[400px]:text-xl font-bold tracking-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Besh Tashta
              </span>
              <span className={`hidden sm:inline flex-shrink-0 ${isDark ? 'text-zinc-500' : 'text-zinc-300'}`}>|</span>
              <span className={`hidden sm:inline text-xs uppercase tracking-wide flex-shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {t.finLiteracy}
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs min-[400px]:text-sm font-medium">
              {pageLinks}
            </nav>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`md:hidden p-2.5 rounded-xl ${isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
              aria-label="Меню"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className={`absolute left-0 right-0 top-full z-50 md:hidden overflow-y-auto max-h-[85vh] border-t shadow-xl ${isDark ? 'border-zinc-700 bg-zinc-900' : 'bg-white border-zinc-200'} px-4 py-4`}>
            <nav className="flex flex-col gap-1">
              <Link to="/about" onClick={closeMenu} className={`rounded-xl px-4 py-3 transition-colors ${isActive('/about') ? activeClass : navClass}`}>{t.about}</Link>
              <Link to="/terms" onClick={closeMenu} className={`rounded-xl px-4 py-3 transition-colors ${isActive('/terms') ? activeClass : navClass}`}>{t.terms}</Link>
              <Link to="/faq" onClick={closeMenu} className={`rounded-xl px-4 py-3 transition-colors ${isActive('/faq') ? activeClass : navClass}`}>{t.faq}</Link>
              <Link to="/activate" onClick={closeMenu} className={`rounded-xl px-4 py-3 font-semibold transition-colors ${isActive('/activate') || location.pathname.startsWith('/activate/') ? activeClass : accentClass}`}>{t.activate}</Link>
              <span className={`my-2 h-px ${isDark ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
              {anchorLinks}
            </nav>
          </div>
        )}
      </div>
    </>
  )
}

export default Header
