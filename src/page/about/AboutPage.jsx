import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import AnimateSection from '../../components/AnimateSection'

const TEST_IMAGES = [
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
]

function AboutPage() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <main className={`min-h-screen w-full ${isDark ? 'bg-zinc-900 text-gray-100' : 'bg-zinc-50 text-zinc-900'}`}>
      {/* Hero — на весь экран */}
      <section className={`min-h-screen w-full flex flex-col justify-center py-12 min-[400px]:py-16 md:py-24 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-b from-violet-900/30 to-zinc-900' : 'bg-gradient-to-b from-indigo-50 to-zinc-50'}`}>
        <div className="max-w-[1256px] mx-auto text-center">
          <AnimateSection>
            <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-semibold mb-4 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-indigo-100 text-indigo-700'}`}>
              О проекте
            </span>
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.about}
            </h1>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
              Тестовая информация о проекте Besh Tashta. Здесь будет краткое описание миссии и ценностей. Позже вы замените тексты на реальные.
            </p>
          </AnimateSection>
        </div>
      </section>

      {/* Контент с картинками — на весь экран */}
      <section className="min-h-screen w-full py-12 md:py-20 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-[1256px] mx-auto space-y-16 md:space-y-24">
          <AnimateSection>
            <div className={`rounded-2xl min-[400px]:rounded-3xl overflow-hidden border-2 shadow-xl ${isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-zinc-100'}`}>
              <img src={TEST_IMAGES[0]} alt="" className="w-full h-56 sm:h-72 md:h-80 object-cover" />
              <div className="p-6 min-[400px]:p-8 md:p-10">
                <h2 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Наша миссия</h2>
                <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                  Тестовый текст о миссии Besh Tashta. Финансовая грамотность доступна каждому. Мы помогаем пользователям вести учёт доходов и расходов, планировать бюджет и осознанно управлять деньгами. Замените этот блок на реальный контент.
                </p>
              </div>
            </div>
          </AnimateSection>

          <AnimateSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="order-2 md:order-1">
                <h2 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Почему мы</h2>
                <p className={`text-sm md:text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                  Тестовое описание преимуществ и ценностей проекта. Прозрачные тарифы, удобное приложение, поддержка на кыргызском и русском. Здесь будет ваш текст.
                </p>
                <ul className={`space-y-2 text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
                  <li className="flex items-center gap-2">✓ Бесплатный тариф для старта</li>
                  <li className="flex items-center gap-2">✓ Простая регистрация</li>
                  <li className="flex items-center gap-2">✓ Поддержка 24/7</li>
                </ul>
              </div>
              <img src={TEST_IMAGES[1]} alt="" className="order-1 md:order-2 w-full rounded-2xl object-cover h-64 md:h-80 border-2 shadow-lg border-zinc-200 dark:border-zinc-600" />
            </div>
          </AnimateSection>

          <AnimateSection>
            <div className={`rounded-2xl min-[400px]:rounded-3xl overflow-hidden border-2 ${isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-zinc-100'}`}>
              <img src={TEST_IMAGES[2]} alt="" className="w-full h-56 sm:h-72 object-cover" />
              <div className="p-6 min-[400px]:p-8">
                <h2 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Партнёры и лицензии</h2>
                <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                  Тестовая информация о банке-партнёре и лицензировании. ОАО «Дос-Кредобанк». Лицензия НБ KR. Замените на актуальные данные.
                </p>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
