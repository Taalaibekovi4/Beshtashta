import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { HOTLINE_LOCAL, HOTLINE_INTERNATIONAL } from '../../utils/phone'

function smoothScroll(e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return
  e.preventDefault()
  const id = href.slice(1)
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Footer() {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const isHome = useLocation().pathname === '/'
  const linkClass = 'text-sm text-gray-300 hover:text-violet-300 transition-colors inline-flex items-center gap-2'
  const headingClass = 'text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4'

  const Anchor = ({ href, children }) =>
    isHome ? (
      <a href={href} onClick={smoothScroll} className={linkClass}>{children}</a>
    ) : (
      <Link to={{ pathname: '/', hash: href.replace('#', '') }} className={linkClass}>{children}</Link>
    )

  return (
    <footer className={isDark ? 'bg-zinc-900 text-white' : 'bg-zinc-900 text-white'}>
      <div className="max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8 pt-12 min-[400px]:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Лого и описание */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <span className="text-xl font-bold">Besh Tashta</span>
            </Link>
            <p className="text-gray-400 text-sm">{t.finLiteracy}</p>
          </div>

          {/* Тарифы и как начать */}
          <div>
            <p className={headingClass}>{t.footerTariffs}</p>
            <nav className="flex flex-col gap-2">
              <Anchor href="#tariffs">
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                {t.footerTariffs}
              </Anchor>
              <Anchor href="#how">
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t.footerHowToStart}
              </Anchor>
              <Anchor href="#download">
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                {t.downloadBtn}
              </Anchor>
            </nav>
          </div>

          {/* О проекте, контакты, FAQ */}
          <div>
            <p className={headingClass}>{t.footerBank}</p>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className={linkClass}>
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t.about}
              </Link>
              <Anchor href="#contacts">
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {t.contacts}
              </Anchor>
              <Link to="/faq" className={linkClass}>
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t.faq}
              </Link>
              <Link to="/terms" className={linkClass}>
                <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t.terms}
              </Link>
            </nav>
          </div>

          {/* Поддержка: телефон */}
          <div>
            <p className={headingClass}>{t.footerSupport}</p>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-300 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <div>
                <p className="text-gray-400 text-xs">{t.inKyrgyzstan}</p>
                <a href={`tel:${HOTLINE_LOCAL.replace(/\s/g, '').replace(/-/g, '')}`} className="text-violet-300 font-semibold text-lg hover:text-violet-200 transition-colors">
                  {HOTLINE_LOCAL}
                </a>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-3">{t.fromAbroad}</p>
            <a href="tel:+996228007700" className="text-gray-300 text-sm hover:text-violet-300 transition-colors">
              {HOTLINE_INTERNATIONAL}
            </a>
          </div>
        </div>

        {/* Соцсети + Скачать */}
        <div className="border-t border-zinc-700/80 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className={headingClass}>{t.socialNetworks}</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-zinc-700/80 hover:bg-violet-500/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-zinc-700/80 hover:bg-violet-500/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.268 4.771 1.691 5.077 4.919.048 1.003.058 1.491.058 4.65 0 3.196-.012 3.584-.07 4.849-.269 3.259-1.673 4.771-4.919 5.077-1.003.048-1.492.058-4.65.058-3.204 0-3.584-.012-4.849-.07-3.26-.269-4.771-1.691-5.077-4.92-.048-1.003-.058-1.491-.058-4.651 0-3.195.012-3.583.07-4.849.269-3.259 1.673-4.771 4.919-5.077 1.003-.048 1.492-.058 4.65-.058zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-zinc-700/80 hover:bg-violet-500/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Telegram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider w-full md:w-auto">{t.downloadBtn}</p>
            <button type="button" className="px-4 py-2.5 bg-zinc-700 hover:bg-violet-600 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              {t.appStore}
            </button>
            <button type="button" className="px-4 py-2.5 border border-zinc-600 hover:border-violet-500/50 hover:bg-violet-500/10 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM20.5 10H8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h12c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zM20.5 3H8.5C7.67 3 7 3.67 7 4.5S7.67 6 8.5 6h12c.83 0 1.5-.67 1.5-1.5S21.33 3 20.5 3z"/></svg>
              {t.playMarket}
            </button>
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-zinc-900 text-[10px] font-bold">
              QR
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-xs mt-6">{t.footerNote}</p>

        <div className="border-t border-zinc-700/80 mt-8 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <span>{t.copyright}</span>
          <span className="text-gray-400 text-xs max-w-xl">{t.license}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
