import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

function Header() {
  const { isDark, toggle } = useTheme()
  const { lang, setLanguage, t } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-100'
      }`}
    >
      <div className="max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 min-[400px]:py-2.5 text-[11px] min-[400px]:text-xs sm:text-[13px] text-gray-500">
          <nav className="flex items-center gap-2 min-[400px]:gap-3 sm:gap-4 md:gap-6 flex-wrap">
            {isHome ? (
              <>
                <a href="#about" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-black transition-colors'}>
                  {t.about}
                </a>
                <a href="#contacts" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-black transition-colors'}>
                  {t.contacts}
                </a>
                <a href="#tariffs" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-black transition-colors'}>
                  {t.terms}
                </a>
                <a href="#faq" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-black transition-colors'}>
                  {t.faq}
                </a>
              </>
            ) : null}
            <Link
              to="/activate"
              className={`font-medium transition-colors ${isDark ? 'text-amber-400 hover:text-amber-300' : 'text-black hover:underline'}`}
            >
              {t.activate}
            </Link>
          </nav>
          <div className="flex items-center gap-2 min-[400px]:gap-3 sm:gap-4 flex-shrink-0">
            {/* Язык: RU / KG */}
            <div className="flex items-center gap-0.5 rounded-md min-[400px]:rounded-lg border border-gray-300 dark:border-zinc-600 overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage('ru')}
                className={`px-2 min-[400px]:px-3 py-1 min-[400px]:py-1.5 text-xs min-[400px]:text-sm font-medium transition-colors ${
                  lang === 'ru'
                    ? isDark
                      ? 'bg-zinc-600 text-white'
                      : 'bg-gray-200 text-black'
                    : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-black'
                }`}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setLanguage('kg')}
                className={`px-2 min-[400px]:px-3 py-1 min-[400px]:py-1.5 text-xs min-[400px]:text-sm font-medium transition-colors ${
                  lang === 'kg'
                    ? isDark
                      ? 'bg-zinc-600 text-white'
                      : 'bg-gray-200 text-black'
                    : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-black'
                }`}
              >
                KG
              </button>
            </div>
            {/* Тема: светлая / тёмная */}
            <button
              type="button"
              onClick={toggle}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-amber-300' : 'bg-gray-100 hover:bg-gray-200 text-zinc-600'
              }`}
              title={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
              aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex items-center justify-between py-3 min-[400px]:py-4 border-t ${isDark ? 'border-zinc-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-2 min-[400px]:gap-3 min-w-0">
            <span className={`text-lg min-[400px]:text-xl sm:text-[22px] font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-black'}`}>
              Besh Tashta
            </span>
            <span className={`flex-shrink-0 ${isDark ? 'text-zinc-500' : 'text-gray-300'}`}>|</span>
            <span className={`hidden min-[400px]:inline ${isDark ? 'text-zinc-400 text-xs sm:text-sm uppercase' : 'text-gray-400 text-xs sm:text-sm uppercase tracking-wide'}`}>
              {t.finLiteracy}
            </span>
          </div>
          <nav className="flex items-center gap-3 min-[400px]:gap-5 sm:gap-8 text-xs min-[400px]:text-sm sm:text-[15px] font-medium flex-shrink-0">
            {isHome ? (
              <>
                <a href="#tariffs" className={isDark ? 'text-gray-300 hover:text-white hover:underline' : 'text-gray-700 hover:text-black hover:underline'}>
                  {t.tariffs}
                </a>
                <a href="#how" className={`flex items-center gap-1 ${isDark ? 'text-gray-300 hover:text-white hover:underline' : 'hover:underline'}`}>
                  {t.howToStart}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#download" className={`flex items-center gap-1 ${isDark ? 'text-gray-300 hover:text-white hover:underline' : 'hover:underline'}`}>
                  {t.savings}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </a>
              </>
            ) : (
              <Link to="/" className={isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}>
                {t.backHome}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
