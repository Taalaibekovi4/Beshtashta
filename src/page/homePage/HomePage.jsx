import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import AnimateSection from '../../components/AnimateSection'
import { useInView } from '../../hooks/useInView'
import { HOTLINE_LOCAL } from '../../utils/phone'
import { IconDownload, IconCard, IconSupport, IconChart, IconWallet, IconPhone, IconFree, IconRocket, IconCrown } from '../../components/Icons'

/** Одна картинка на весь экран телефона (потом с бека) */
const PHONE_SCREEN_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=800&fit=crop'
const PHONE_SCREEN_IMAGE_FALLBACK_DARK = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop'

/** Стильный чёткий телефон: рамка, кадр, внутри только картинка. Адаптив от 320px. */
function PhoneFrame({ imageUrl, className = '', bezelDark = true, animate = false }) {
  return (
    <div className={`w-[120px] min-[400px]:w-[140px] sm:w-[160px] aspect-[10/21] flex-shrink-0 relative rounded-[1.5rem] min-[400px]:rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden border-[6px] min-[400px]:border-[8px] sm:border-[10px] bg-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-300 hover:scale-[1.02] ${bezelDark ? 'border-zinc-800' : 'border-zinc-700'} ${animate ? 'phone-float' : ''} ${className}`}>
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        onError={(e) => { e.target.src = 'https://placehold.co/400x800/1a1a1a/666?text=Screen'; }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 min-[400px]:w-12 sm:w-14 h-4 min-[400px]:h-[18px] sm:h-5 bg-zinc-900 rounded-b-md sm:rounded-b-lg z-10 ring-1 ring-zinc-700/50" aria-hidden />
    </div>
  )
}

function HomePage() {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const location = useLocation()
  const [heroRef, heroInView] = useInView({ rootMargin: '80px', threshold: 0.15 })
  const bg = isDark ? 'bg-zinc-900 text-gray-100' : 'bg-white text-black'

  useEffect(() => {
    const hash = location.hash?.slice(1)
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [location.pathname, location.hash])

  return (
    <div className={`min-h-screen antialiased transition-colors ${bg}`}>
      <main className="min-w-0">
        {/* Hero — на весь экран */}
        <section className={`min-h-screen w-full max-w-full flex flex-col justify-center pt-6 pb-10 px-3 min-[400px]:pt-8 min-[400px]:pb-12 min-[400px]:px-4 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 md:px-6 lg:px-8 ${isDark ? 'bg-zinc-900' : 'hero-mesh'}`}>
          <div className="w-full max-w-[1256px] mx-auto">
            <AnimateSection>
            <div ref={heroRef} className={`rounded-2xl min-[400px]:rounded-3xl md:rounded-[2rem] p-5 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 overflow-hidden ${
              isDark
                ? 'bg-gradient-to-b from-violet-900/90 via-purple-900/80 to-zinc-900 border border-violet-700/50 shadow-2xl'
                : 'bg-white/95 backdrop-blur-sm border border-indigo-100 shadow-xl shadow-indigo-900/5'
            }`}>
              <div className="flex-1 w-full min-w-0">
                <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-semibold mb-4 ${isDark ? 'bg-violet-500/25 text-violet-200 border border-violet-400/30' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'}`}>
                  ✓ Бесплатный тариф
                </span>
                <h1 className={`text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2.75rem] font-extrabold leading-[1.15] tracking-tight mb-3 min-[400px]:mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {t.heroTitle}
                </h1>
                <p className={`text-sm min-[400px]:text-base md:text-lg mb-2 max-w-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                  {t.heroDesc}
                </p>
                <p className={`text-xs min-[400px]:text-sm mb-5 min-[400px]:mb-6 mt-2 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>{t.scanQr}</p>
                <div className="flex flex-wrap items-center gap-4 min-[400px]:gap-5">
                  <div className={`w-16 h-16 min-[400px]:w-20 min-[400px]:h-20 rounded-xl flex items-center justify-center text-[9px] min-[400px]:text-[10px] font-medium border-2 shadow-md ${isDark ? 'bg-zinc-800/80 border-zinc-600 text-gray-400' : 'bg-indigo-50 border-indigo-200 text-zinc-500'}`}>
                    {t.qrCode}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] min-[400px]:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>{t.downloadApp}</span>
                    <div className="flex gap-3">
                      <button type="button" className={isDark ? 'btn-primary-dark px-4 py-2.5 min-[400px]:px-5 min-[400px]:py-3 text-xs min-[400px]:text-sm' : 'btn-primary-light px-4 py-2.5 min-[400px]:px-5 min-[400px]:py-3 text-xs min-[400px]:text-sm'}>
                        {t.appStore}
                      </button>
                      <button type="button" className={`px-4 py-2.5 min-[400px]:px-5 min-[400px]:py-3 rounded-xl text-xs min-[400px]:text-sm font-semibold transition-all duration-300 border-2 ${isDark ? 'border-zinc-500 text-gray-200 hover:border-violet-500/50 hover:bg-violet-500/10' : 'border-zinc-300 text-zinc-700 hover:border-indigo-400 hover:bg-indigo-50'}`}>
                        {t.playMarket}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex-1 flex justify-center items-end gap-2 min-[400px]:gap-3 sm:gap-4 min-h-[280px] min-[400px]:min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] w-full max-w-full">
                <div className={heroInView ? 'phone-enter-left' : 'opacity-0'}>
                  <PhoneFrame imageUrl={PHONE_SCREEN_IMAGE_FALLBACK_DARK} animate />
                </div>
                <div className={`${heroInView ? 'phone-enter-right' : 'opacity-0'} z-10`}>
                  <PhoneFrame imageUrl={PHONE_SCREEN_IMAGE_FALLBACK} animate />
                </div>
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-11 h-11 min-[400px]:w-12 min-[400px]:h-12 rounded-full border-2 shadow-lg flex items-center justify-center text-lg z-20 ${isDark ? 'bg-violet-600/90 border-violet-500/50' : 'bg-white border-indigo-200 shadow-indigo-900/10'}`}>💰</div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Как начать? — на весь экран + декоративный фон */}
        <section id="how" className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 relative ${isDark ? 'bg-zinc-900' : 'bg-zinc-50/80'}`}>
          <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-b from-violet-950/25 via-transparent to-transparent' : 'bg-gradient-to-b from-indigo-50/60 via-transparent to-transparent'}`} aria-hidden />
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8 relative">
            <AnimateSection>
            <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-bold mb-6 min-[400px]:mb-8 sm:mb-10 md:mb-14 flex items-center gap-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              <span className={`w-1 h-8 rounded-full ${isDark ? 'bg-violet-500' : 'bg-indigo-500'}`} aria-hidden />
              {t.howToStartTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-5 md:gap-6">
              {[
                { num: '01', label: t.step1, Icon: IconDownload },
                { num: '02', label: t.step2, Icon: IconCard },
                { num: '03', label: t.step3, Icon: IconSupport },
              ].map(({ num, label, Icon }) => (
                <div key={num} className={`card-hover rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 min-h-[140px] min-[400px]:min-h-[180px] border-2 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-violet-500/40' : 'bg-white border-zinc-100 hover:border-indigo-200 shadow-sm'}`}>
                  <div className={`w-11 h-11 min-[400px]:w-12 min-[400px]:h-12 rounded-xl flex items-center justify-center text-white mb-3 min-[400px]:mb-4 flex-shrink-0 shadow-lg ${isDark ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-900/30' : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-900/20'}`}>
                    <Icon />
                  </div>
                  <span className={`text-lg min-[400px]:text-xl font-bold mb-1 min-[400px]:mb-2 block ${isDark ? 'text-violet-300' : 'text-indigo-600'}`}>{num}</span>
                  <p className={`text-xs min-[400px]:text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{label}</p>
                </div>
              ))}
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Тарифы Besh Tashta — на весь экран */}
        <section className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className={`card-hover rounded-2xl min-[400px]:rounded-3xl p-5 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 border-2 ${
              isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-indigo-100 shadow-lg shadow-indigo-900/5'
            }`}>
              <div className="flex-1">
                <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 min-[400px]:mb-4 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.tariffsTitle}</h2>
                <p className={`text-sm min-[400px]:text-base md:text-lg mb-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{t.tariffsDesc}</p>
                <p className={`text-xs min-[400px]:text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-zinc-500'}`}>{t.noHiddenFees}</p>
                <a href="#tariffs" className={isDark ? 'btn-primary-dark inline-block mt-6 px-6 py-3 min-[400px]:px-8 min-[400px]:py-3.5 text-sm' : 'btn-primary-light inline-block mt-6 px-6 py-3 min-[400px]:px-8 min-[400px]:py-3.5 text-sm'}>
                  {t.learnMore}
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <div className={`w-48 min-[400px]:w-56 sm:w-64 h-32 min-[400px]:h-36 sm:h-40 rounded-2xl shadow-xl flex items-center justify-center text-white text-base min-[400px]:text-lg font-bold border ${isDark ? 'bg-gradient-to-br from-violet-600 to-purple-700 border-violet-500/30' : 'bg-gradient-to-br from-indigo-600 to-violet-600 border-indigo-400/30'}`}>
                  Besh Tashta
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Преимущества — на весь экран + декоративный фон */}
        <section className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 relative ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-tr from-purple-900/15 via-transparent to-transparent' : 'bg-gradient-to-tr from-violet-50/50 via-transparent to-transparent'}`} aria-hidden />
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8 relative">
            <AnimateSection>
            <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-bold text-center mb-6 min-[400px]:mb-8 sm:mb-10 md:mb-14 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.advantagesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-5 md:gap-6">
              {[
                { num: '01', text: t.adv1, Icon: IconChart },
                { num: '02', text: t.adv2, Icon: IconWallet },
                { num: '03', text: t.adv3, Icon: IconPhone },
              ].map(({ num, text, Icon }) => (
                <div key={num} className={`card-hover rounded-xl min-[400px]:rounded-2xl p-6 md:p-8 border-2 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-violet-500/40' : 'bg-white border-zinc-100 hover:border-indigo-200 shadow-sm'}`}>
                  <div className={`w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg ${isDark ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-900/30' : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-900/20'}`}>
                    <Icon className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7" />
                  </div>
                  <span className={`text-xl font-bold mb-2 block ${isDark ? 'text-violet-300' : 'text-indigo-600'}`}>{num}</span>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{text}</p>
                </div>
              ))}
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Тариф Старт — на весь экран */}
        <section className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className={`rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 border-2 ${
              isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex-1">
                <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t.startTariffTitle}</h2>
                <p className={`text-base md:text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.startTariffDesc}</p>
                <a href="#tariffs" className={isDark ? 'btn-primary-dark inline-block px-6 py-3 min-[400px]:px-8 min-[400px]:py-3.5 text-sm' : 'btn-primary-light inline-block px-6 py-3 min-[400px]:px-8 min-[400px]:py-3.5 text-sm'}>
                  {t.learnMore}
                </a>
              </div>
              <div className="flex-1 flex justify-center relative">
                <PhoneFrame imageUrl={PHONE_SCREEN_IMAGE_FALLBACK} className="transform rotate-[6deg]" />
                <div className={`absolute -bottom-2 right-[15%] w-14 h-14 rounded-full border-2 shadow-lg flex items-center justify-center text-xl z-10 ${isDark ? 'bg-zinc-700 border-zinc-600' : 'bg-white border-amber-200'}`}>🦁</div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Что входит — на весь экран */}
        <section className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className={`rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-start gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 border-2 ${
              isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex-1">
                <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t.whatsIncludedTitle}</h2>
                <ul className={`text-[15px] leading-relaxed space-y-3 list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>{t.included1}</li>
                  <li>{t.included2}</li>
                  <li>{t.included3}</li>
                  <li>{t.included4}</li>
                  <li>{t.included5}</li>
                </ul>
                <a href="#tariffs" className={isDark ? 'btn-primary-dark inline-block mt-6 px-6 py-3 min-[400px]:px-8 min-[400px]:py-3.5 text-sm' : 'btn-primary-light inline-block mt-6 px-6 py-3 min-[400px]:px-8 min-[400px]:py-3.5 text-sm'}>
                  {t.learnMore}
                </a>
              </div>
              <div className={`flex-1 w-full max-w-md rounded-xl p-6 border-2 ${isDark ? 'bg-zinc-700/50 border-zinc-600' : 'bg-white border-gray-200'}`}>
                <div className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>{t.freeNote}</p>
                  <p>{t.startNote}</p>
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Аналитика — на весь экран, тёмный фон, телефоны стильные */}
        <section className="min-h-screen w-full max-w-full flex flex-col lg:flex-row items-center justify-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 py-10 min-[400px]:py-12 sm:py-16 md:py-24 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 bg-zinc-900 text-white">
          <AnimateSection className="flex-1 flex justify-center items-center gap-2 min-[400px]:gap-3 sm:gap-4 w-full min-w-0">
            <PhoneFrame imageUrl={PHONE_SCREEN_IMAGE_FALLBACK_DARK} className="-rotate-6" animate />
            <PhoneFrame imageUrl={PHONE_SCREEN_IMAGE_FALLBACK} className="rotate-3" animate />
          </AnimateSection>
          <AnimateSection className="flex-1 lg:max-w-xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Красивая и удобная аналитика трат</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Удобные графики ваших трат в разрезе категорий и тегов. Отслеживайте, сколько потратили и получили денег, добавляйте заметки к платежам и планируйте бюджет.
            </p>
          </AnimateSection>
        </section>

        {/* Тарифы — на весь экран + декоративный фон */}
        <section id="tariffs" className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 relative ${isDark ? 'bg-zinc-900' : 'bg-zinc-50/80'}`}>
          <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-violet-950/20 to-transparent' : 'bg-gradient-to-b from-transparent via-indigo-50/40 to-transparent'}`} aria-hidden />
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8 relative">
            <AnimateSection>
            <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-bold mb-6 min-[400px]:mb-8 sm:mb-10 text-center flex items-center justify-center gap-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              <span className={`w-1 h-8 rounded-full ${isDark ? 'bg-violet-500' : 'bg-indigo-500'}`} aria-hidden />
              {t.tariffs}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className={`card-hover rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-violet-500/40' : 'bg-white border-indigo-100 hover:border-indigo-200 shadow-indigo-900/5'}`}>
                <div className={`w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-xl flex items-center justify-center mb-3 min-[400px]:mb-4 ring-2 ${isDark ? 'bg-violet-500/20 ring-violet-500/40 text-violet-300' : 'bg-indigo-100 ring-indigo-300 text-indigo-600'}`}>
                  <IconFree className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7" />
                </div>
                <h3 className={`text-base min-[400px]:text-lg font-bold mb-1 min-[400px]:mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.freeTariff}</h3>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{t.freeTariffDesc}</p>
              </div>
              <div className={`card-hover rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-amber-500/40' : 'bg-white border-amber-100 hover:border-amber-200 shadow-amber-900/5'}`}>
                <div className={`w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-xl flex items-center justify-center mb-3 min-[400px]:mb-4 ring-2 ${isDark ? 'bg-amber-500/20 ring-amber-500/40 text-amber-300' : 'bg-amber-100 ring-amber-300 text-amber-600'}`}>
                  <IconRocket className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7" />
                </div>
                <h3 className={`text-base min-[400px]:text-lg font-bold mb-1 min-[400px]:mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.startTariffRow}</h3>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{t.startTariffRowDesc}</p>
              </div>
              <div className={`card-hover rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-violet-500/40' : 'bg-white border-violet-100 hover:border-violet-200 shadow-violet-900/5'}`}>
                <div className={`w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-xl flex items-center justify-center mb-3 min-[400px]:mb-4 ring-2 ${isDark ? 'bg-violet-500/20 ring-violet-500/40 text-violet-300' : 'bg-violet-100 ring-violet-300 text-violet-600'}`}>
                  <IconCrown className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7" />
                </div>
                <h3 className={`text-base min-[400px]:text-lg font-bold mb-1 min-[400px]:mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.vipTariff}</h3>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{t.vipTariffDesc}</p>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Поддержка и контакты — на весь экран, центр на мобиле, красивый фон */}
        <section id="contacts" className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 relative ${isDark ? 'bg-zinc-800/80' : 'bg-gray-50'}`}>
          {/* Декоративный фон */}
          <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isDark ? 'bg-gradient-to-br from-violet-900/20 via-transparent to-blue-900/15' : 'bg-gradient-to-br from-indigo-100/40 via-transparent to-violet-100/30'}`} aria-hidden />
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8 relative">
            <AnimateSection>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 text-center lg:text-left">
              <div className="flex-1 w-full lg:max-w-md flex flex-col items-center lg:items-start">
                <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-semibold mb-3 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-indigo-100 text-indigo-700'}`}>
                  {t.supportTitle}
                </span>
                <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {t.supportTitle}
                </h2>
                <p className={`text-[15px] leading-relaxed max-w-md ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{t.supportDesc}</p>
                <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                  <a href={`tel:${HOTLINE_LOCAL.replace(/\s/g, '').replace(/-/g, '')}`} className={isDark ? 'btn-primary-dark inline-flex items-center gap-2 px-5 py-2.5 text-sm' : 'btn-primary-light inline-flex items-center gap-2 px-5 py-2.5 text-sm'}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Позвонить
                  </a>
                  <button type="button" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${isDark ? 'border-zinc-500 text-gray-200 hover:border-violet-500/50 hover:bg-violet-500/10' : 'border-zinc-300 text-zinc-700 hover:border-indigo-300 hover:bg-indigo-50'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    Написать в чат
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full relative min-h-[300px] flex flex-col items-center lg:items-end">
                <div className={`absolute inset-0 rounded-[2rem] blur-3xl opacity-50 scale-110 ${isDark ? 'bg-gradient-to-r from-violet-500/30 via-purple-500/20 to-blue-500/30' : 'bg-gradient-to-r from-indigo-200/80 via-violet-100/80 to-blue-200/80'}`} />
                <div className="relative flex gap-3 mb-4 flex-wrap justify-center lg:justify-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${isDark ? 'bg-[#25D366]' : 'bg-indigo-500'}`} title="Мессенджер"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
                  <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center text-white shadow-lg" title="Telegram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg" title="Чат"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div>
                  <div className="w-12 h-12 rounded-full bg-[#4267B2] flex items-center justify-center text-white shadow-lg" title="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                </div>
                <div className="relative w-full max-w-md space-y-3 mx-auto lg:mx-0">
                  <div className="flex items-start gap-2">
                    <div className={`w-9 h-9 rounded-full flex-shrink-0 mt-0.5 ${isDark ? 'bg-zinc-600' : 'bg-indigo-200'}`} />
                    <div className={`rounded-2xl rounded-bl-md px-4 py-3 text-sm shadow-md ${isDark ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white' : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white'}`}>
                      Добрый день! У меня есть несколько вопросов по тарифам Besh Tashta
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <div className={`rounded-2xl rounded-br-md px-4 py-3 text-sm max-w-[85%] shadow-md ${isDark ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white'}`}>
                      Здравствуйте! Служба поддержки Besh Tashta. С удовольствием помогу вам 👋
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${isDark ? 'text-gray-400 bg-zinc-700' : 'text-zinc-500 bg-zinc-100'}`}>Besh Tashta</span>
                  </div>
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* CTA — на весь экран + декоративный фон */}
        <section id="download" className={`min-h-screen w-full max-w-full flex flex-col justify-center py-8 min-[400px]:py-10 sm:py-14 md:py-20 relative ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-t from-violet-900/20 via-transparent to-transparent' : 'bg-gradient-to-t from-indigo-50/50 via-transparent to-transparent'}`} aria-hidden />
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8 relative">
            <AnimateSection>
            <div className={`rounded-2xl min-[400px]:rounded-3xl p-6 min-[400px]:p-8 sm:p-10 md:p-12 lg:p-16 text-center border-2 ${
              isDark ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/95 border-zinc-600' : 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-200/80 shadow-xl shadow-indigo-900/5'
            }`}>
              <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 min-[400px]:mb-4 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.ctaTitle}</h2>
              <p className={`text-sm min-[400px]:text-base md:text-lg mb-6 min-[400px]:mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{t.ctaDesc}</p>
              <div className="flex flex-wrap items-center justify-center gap-6 min-[400px]:gap-8">
                <div className={`w-20 h-20 min-[400px]:w-24 min-[400px]:h-24 rounded-xl flex items-center justify-center text-[10px] font-medium border-2 shadow-md ${isDark ? 'bg-zinc-700 border-zinc-600 text-gray-400' : 'bg-white border-indigo-200 text-zinc-500 shadow-indigo-900/5'}`}>{t.qrCode}</div>
                <div className="flex flex-col gap-2 items-center">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>{t.downloadApp}</span>
                  <div className="flex gap-3">
                    <button type="button" className={isDark ? 'btn-primary-dark px-5 py-3 min-[400px]:px-6 min-[400px]:py-3.5 text-sm' : 'btn-primary-light px-5 py-3 min-[400px]:px-6 min-[400px]:py-3.5 text-sm'}>{t.appStore}</button>
                    <button type="button" className={`px-5 py-3 min-[400px]:px-6 min-[400px]:py-3.5 border-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isDark ? 'border-zinc-500 text-gray-200 hover:border-violet-500/50 hover:bg-violet-500/10' : 'border-zinc-300 text-zinc-700 hover:border-indigo-400 hover:bg-indigo-50'}`}>{t.playMarket}</button>
                  </div>
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
