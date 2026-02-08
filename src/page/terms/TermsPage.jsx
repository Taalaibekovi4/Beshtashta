import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import AnimateSection from '../../components/AnimateSection'
import { IconFree, IconRocket, IconCrown } from '../../components/Icons'

const TARIFFS_TEST = [
  { name: 'Бесплатный', price: '0 сом', desc: 'Доход, расход, аналитика.', Icon: IconFree },
  { name: 'Старт', price: '1500 сом', desc: 'Долги, финансовый дневник.', Icon: IconRocket },
  { name: 'VIP', price: '3000 сом', desc: 'Полный доступ к сайту.', Icon: IconCrown },
]

function TermsPage() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <main className={`min-h-screen w-full ${isDark ? 'bg-zinc-900 text-gray-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <section className={`min-h-screen w-full flex flex-col justify-center py-12 min-[400px]:py-16 md:py-24 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-b from-violet-900/30 to-zinc-900' : 'bg-gradient-to-b from-indigo-50 to-zinc-50'}`}>
        <div className="max-w-[1256px] mx-auto text-center">
          <AnimateSection>
            <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-semibold mb-4 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-indigo-100 text-indigo-700'}`}>
              Документы
            </span>
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.terms}
            </h1>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
              Тестовые условия, правила и тарифы. Замените на реальные тексты и PDF-ссылки.
            </p>
          </AnimateSection>
        </div>
      </section>

      <section className="min-h-screen w-full py-12 md:py-20 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-[1256px] mx-auto">
          <AnimateSection>
            <h2 className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Тарифы</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {TARIFFS_TEST.map(({ name, price, desc, Icon }) => (
                <div
                  key={name}
                  className={`rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${isDark ? 'bg-zinc-800 border-zinc-600 hover:border-violet-500/40' : 'bg-white border-zinc-100 hover:border-indigo-200'}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-indigo-100 text-indigo-600'}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{name}</h3>
                  <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-violet-300' : 'text-indigo-600'}`}>{price}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{desc}</p>
                </div>
              ))}
            </div>
          </AnimateSection>

          <AnimateSection>
            <h2 className={`text-xl md:text-2xl font-bold mt-14 mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Условия использования</h2>
            <div className={`rounded-2xl border-2 p-6 md:p-8 space-y-4 ${isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-zinc-100'}`}>
              <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                1. Тестовый пункт условий. Пользователь соглашается с правилами при регистрации. Замените на реальный текст.
              </p>
              <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                2. Тестовый пункт о тарифах и оплате. Оплата производится в приложении. Без скрытых комиссий.
              </p>
              <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
                3. Тестовый пункт о конфиденциальности и данных. Все данные защищены. Замените на актуальную политику.
              </p>
            </div>
          </AnimateSection>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
