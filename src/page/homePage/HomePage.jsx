import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import Footer from '../../components/layout/Footer'
import AnimateSection from '../../components/AnimateSection'
import { useInView } from '../../hooks/useInView'

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
  const [heroRef, heroInView] = useInView({ rootMargin: '80px', threshold: 0.15 })
  const bg = isDark ? 'bg-zinc-900 text-gray-100' : 'bg-white text-black'

  return (
    <div className={`min-h-screen antialiased transition-colors ${bg}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <main className="min-w-0">
        {/* Hero — макс ширина, телефоны 1 раз разворачиваются при скролле */}
        <section className={`w-full max-w-full pt-6 pb-10 px-3 min-[400px]:pt-8 min-[400px]:pb-12 min-[400px]:px-4 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 md:px-6 lg:px-8 ${isDark ? 'bg-zinc-900' : ''}`}>
          <div className="w-full max-w-[1256px] mx-auto">
            <AnimateSection>
            <div ref={heroRef} className={`rounded-xl min-[400px]:rounded-2xl md:rounded-3xl p-4 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 ${
              isDark ? 'bg-zinc-800/80 border border-zinc-700' : 'bg-gradient-to-r from-[#a8d4ee] via-[#b8dcee] to-[#a8e0d0] border-2 border-gray-200'
            }`}>
              <div className="flex-1 w-full min-w-0">
                <h1 className={`text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 min-[400px]:mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  {t.heroTitle}
                </h1>
                <p className={`text-sm min-[400px]:text-base md:text-lg mb-1 max-w-xl ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  {t.heroDesc}
                </p>
                <p className={`text-xs min-[400px]:text-sm mb-4 min-[400px]:mb-6 mt-3 min-[400px]:mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.scanQr}</p>
                <div className="flex flex-wrap items-center gap-3 min-[400px]:gap-5">
                  <div className={`w-14 h-14 min-[400px]:w-20 min-[400px]:h-20 rounded-lg min-[400px]:rounded-xl flex items-center justify-center text-[9px] min-[400px]:text-[10px] border-2 shadow-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-gray-400' : 'bg-white text-gray-500 border-gray-300'}`}>
                    {t.qrCode}
                  </div>
                  <div className="flex flex-col gap-1.5 min-[400px]:gap-2">
                    <span className={`text-[10px] min-[400px]:text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.downloadApp}</span>
                    <div className="flex gap-2 min-[400px]:gap-3">
                      <button type="button" className="px-3 py-2 min-[400px]:px-5 min-[400px]:py-2.5 bg-black text-white rounded-lg min-[400px]:rounded-xl text-xs min-[400px]:text-sm font-semibold hover:bg-gray-800 transition-colors border-2 border-black">
                        {t.appStore}
                      </button>
                      <button type="button" className={`px-3 py-2 min-[400px]:px-5 min-[400px]:py-2.5 border-2 rounded-lg min-[400px]:rounded-xl text-xs min-[400px]:text-sm font-semibold transition-colors ${isDark ? 'border-zinc-500 hover:border-zinc-400 text-gray-200' : 'border-gray-400 hover:border-gray-500 text-gray-800'}`}>
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
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 rounded-full border-2 shadow-lg flex items-center justify-center text-base min-[400px]:text-lg z-20 ${isDark ? 'bg-zinc-600 border-zinc-500' : 'bg-white border-gray-300'}`}>💰</div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Как начать? — анимация при скролле, адаптив от 320 */}
        <section id="how" className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-bold mb-6 min-[400px]:mb-8 sm:mb-10 md:mb-14 ${isDark ? 'text-white' : 'text-black'}`}>{t.howToStartTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-5 md:gap-6">
              {[
                { num: '01', label: t.step1 },
                { num: '02', label: t.step2 },
                { num: '03', label: t.step3 },
              ].map((step) => (
                <div key={step.num} className={`rounded-lg min-[400px]:rounded-xl p-4 min-[400px]:p-6 md:p-8 min-h-[140px] min-[400px]:min-h-[180px] border-2 ${isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="w-9 h-9 min-[400px]:w-11 min-[400px]:h-11 rounded-full bg-black flex items-center justify-center text-white mb-3 min-[400px]:mb-4 flex-shrink-0">
                    <svg className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <span className={`text-lg min-[400px]:text-xl font-bold mb-1 min-[400px]:mb-2 block ${isDark ? 'text-white' : 'text-black'}`}>{step.num}</span>
                  <p className={`text-xs min-[400px]:text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{step.label}</p>
                </div>
              ))}
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Тарифы Besh Tashta */}
        <section className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className={`rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 border-2 ${
              isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex-1">
                <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t.tariffsTitle}</h2>
                <p className={`text-base md:text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.tariffsDesc}</p>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.noHiddenFees}</p>
                <a href="#tariffs" className="inline-block mt-6 px-8 py-3.5 bg-black text-white rounded-2xl font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors">
                  {t.learnMore}
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-gray-800 to-black shadow-xl flex items-center justify-center text-white text-lg font-bold border border-gray-700">
                  Besh Tashta
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Преимущества — анимация, адаптив от 320 */}
        <section className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-bold text-center mb-6 min-[400px]:mb-8 sm:mb-10 md:mb-14 ${isDark ? 'text-white' : 'text-black'}`}>{t.advantagesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-5 md:gap-6">
              {[
                { num: '01', text: t.adv1, icon: 'chart' },
                { num: '02', text: t.adv2, icon: 'wallet' },
                { num: '03', text: t.adv3, icon: 'phone' },
              ].map((item) => (
                <div key={item.num} className={`rounded-xl p-6 md:p-8 border-2 ${isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white mb-4">
                    {item.icon === 'chart' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                    {item.icon === 'wallet' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    {item.icon === 'phone' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                  </div>
                  <span className={`text-xl font-bold mb-2 block ${isDark ? 'text-white' : 'text-black'}`}>{item.num}</span>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</p>
                </div>
              ))}
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Тариф Старт */}
        <section className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className={`rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-6 min-[400px]:gap-8 sm:gap-12 lg:gap-20 border-2 ${
              isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex-1">
                <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t.startTariffTitle}</h2>
                <p className={`text-base md:text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.startTariffDesc}</p>
                <a href="#tariffs" className="inline-block px-8 py-3.5 bg-black text-white rounded-2xl font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors">
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

        {/* Что входит */}
        <section className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
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
                <a href="#tariffs" className="inline-block mt-6 px-8 py-3.5 bg-black text-white rounded-2xl font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors">
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

        {/* Тарифы — чёткие карточки с анимацией, адаптив от 320 */}
        <section id="tariffs" className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <h2 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-bold mb-6 min-[400px]:mb-8 sm:mb-10 text-center ${isDark ? 'text-white' : 'text-black'}`}>{t.tariffs}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className={`rounded-lg min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-zinc-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 rounded-lg min-[400px]:rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 min-[400px]:mb-4">
                  <span className="text-xl min-[400px]:text-2xl">🆓</span>
                </div>
                <h3 className={`text-base min-[400px]:text-lg font-bold mb-1 min-[400px]:mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t.freeTariff}</h3>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t.freeTariffDesc}</p>
              </div>
              <div className={`rounded-lg min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-zinc-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 rounded-lg min-[400px]:rounded-xl bg-amber-500/20 flex items-center justify-center mb-3 min-[400px]:mb-4">
                  <span className="text-xl min-[400px]:text-2xl">🚀</span>
                </div>
                <h3 className={`text-base min-[400px]:text-lg font-bold mb-1 min-[400px]:mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t.startTariffRow}</h3>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t.startTariffRowDesc}</p>
              </div>
              <div className={`rounded-lg min-[400px]:rounded-2xl p-4 min-[400px]:p-6 md:p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-zinc-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 rounded-lg min-[400px]:rounded-xl bg-violet-500/20 flex items-center justify-center mb-3 min-[400px]:mb-4">
                  <span className="text-xl min-[400px]:text-2xl">⭐</span>
                </div>
                <h3 className={`text-base min-[400px]:text-lg font-bold mb-1 min-[400px]:mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t.vipTariff}</h3>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t.vipTariffDesc}</p>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* Поддержка */}
        <section className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
              <div className="flex-1 lg:max-w-md">
                <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t.supportTitle}</h2>
                <p className={`text-[15px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.supportDesc}</p>
              </div>
              <div className="flex-1 w-full relative min-h-[300px] flex flex-col items-start lg:items-end">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200/80 via-pink-100/80 to-blue-200/80 rounded-[2rem] blur-3xl opacity-60 scale-110" />
                <div className="relative flex gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg font-bold text-sm">W</div>
                  <div className="w-11 h-11 rounded-full bg-[#0088cc] flex items-center justify-center text-white shadow-lg font-bold text-sm">T</div>
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg font-bold text-sm">I</div>
                  <div className="w-11 h-11 rounded-full bg-[#4267B2] flex items-center justify-center text-white shadow-lg font-bold text-sm">F</div>
                </div>
                <div className="relative w-full max-w-md space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0 mt-0.5" />
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl rounded-bl-md px-4 py-3 text-sm shadow-md">
                      Добрый день! У меня есть несколько вопросов по тарифам Besh Tashta
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <div className="bg-black text-white rounded-2xl rounded-br-md px-4 py-3 text-sm max-w-[85%] shadow-md">
                      Здравствуйте! Служба поддержки Besh Tashta. С удовольствием помогу вам 👋
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">Besh Tashta</span>
                  </div>
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        {/* CTA */}
        <section id="download" className={`w-full max-w-full py-8 min-[400px]:py-10 sm:py-14 md:py-20 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="w-full max-w-[1256px] mx-auto px-3 min-[400px]:px-4 sm:px-6 lg:px-8">
            <AnimateSection>
            <div className={`rounded-xl min-[400px]:rounded-2xl p-4 min-[400px]:p-6 sm:p-8 md:p-12 lg:p-16 text-center border-2 ${
              isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-gradient-to-r from-[#a8d4ee] to-[#a8e0d0] border-gray-200'
            }`}>
              <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t.ctaTitle}</h2>
              <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.ctaDesc}</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className={`w-24 h-24 rounded-xl flex items-center justify-center text-[10px] border shadow-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-gray-400' : 'bg-white text-gray-500 border-gray-200'}`}>{t.qrCode}</div>
                <div className="flex flex-col gap-2 items-center">
                  <span className={`text-xs uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.downloadApp}</span>
                  <div className="flex gap-3">
                    <button type="button" className="px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">{t.appStore}</button>
                    <button type="button" className={`px-6 py-3 border-2 rounded-xl text-sm font-semibold transition-colors ${isDark ? 'border-zinc-500 hover:border-zinc-400 text-gray-200' : 'border-gray-400 hover:border-gray-500'}`}>{t.playMarket}</button>
                  </div>
                </div>
              </div>
            </div>
            </AnimateSection>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}

export default HomePage
