import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { HOTLINE_LOCAL, HOTLINE_INTERNATIONAL } from '../../utils/phone'

function Footer() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <footer className={isDark ? 'bg-zinc-900 text-white pt-10 pb-6 min-[400px]:pt-14 min-[400px]:pb-8 md:pt-16 md:pb-10' : 'bg-black text-white pt-10 pb-6 min-[400px]:pt-14 min-[400px]:pb-8 md:pt-16 md:pb-10'}>
      <div className="max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 min-[400px]:gap-8 sm:gap-10 lg:gap-8 mb-8 min-[400px]:mb-12">
          <div className="lg:col-span-2 flex items-center gap-2 min-[400px]:gap-3">
            <span className="text-lg min-[400px]:text-xl font-bold">Besh Tashta</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400 text-sm">{t.finLiteracy}</span>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-4">{t.footerTariffs}</div>
            <a href="#tariffs" className="block text-sm text-gray-300 hover:text-white mb-2">{t.footerTariffs}</a>
            <a href="#how" className="block text-sm text-gray-300 hover:text-white">{t.footerHowToStart}</a>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-4">{t.footerBank}</div>
            <a href="#about" className="block text-sm text-gray-300 hover:text-white mb-2">{t.about}</a>
            <a href="#contacts" className="block text-sm text-gray-300 hover:text-white mb-2">{t.contacts}</a>
            <a href="#faq" className="block text-sm text-gray-300 hover:text-white mb-2">{t.faq}</a>
            <a href="#tariffs" className="block text-sm text-gray-300 hover:text-white">{t.terms}</a>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-4">{t.footerSupport}</div>
            <div className="flex gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">F</div>
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">I</div>
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">T</div>
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">W</div>
            </div>
            <p className="text-gray-400 text-sm">{t.inKyrgyzstan}</p>
            <a href={`tel:${HOTLINE_LOCAL.replace(/\s/g, '').replace(/-/g, '')}`} className="text-white font-medium text-lg tracking-tight block mt-0.5 hover:underline">
              {HOTLINE_LOCAL}
            </a>
            <p className="text-gray-400 text-sm mt-2">{t.fromAbroad}</p>
            <a href={`tel:+996228007700`} className="text-gray-300 text-sm block mt-0.5 hover:text-white hover:underline">
              {HOTLINE_INTERNATIONAL}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">{t.socialNetworks}</p>
            <div className="flex gap-2 mb-4">
              {['F', 'I', 'T', 'W', 'T'].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold">{l}</div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mb-3">{t.footerNote}</p>
            <div className="flex gap-3 items-center flex-wrap">
              <button type="button" className="px-4 py-2 bg-gray-800 rounded-lg text-xs font-medium hover:bg-gray-700">{t.appStore}</button>
              <button type="button" className="px-4 py-2 border border-gray-600 rounded-lg text-xs font-medium hover:border-gray-500">{t.playMarket}</button>
              <div className="w-14 h-14 bg-white rounded flex items-center justify-center text-black text-[8px]">QR</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <span>{t.copyright}</span>
          <span className="text-gray-400">{t.license}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
