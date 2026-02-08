import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import AnimateSection from '../../components/AnimateSection'

const FAQ_ITEMS = [
  { q: 'Как скачать приложение Besh Tashta?', a: 'Тестовый ответ: отсканируйте QR-код на главной странице или найдите приложение в App Store / Play Market. Замените на реальный текст.' },
  { q: 'Бесплатный тариф действительно бесплатный?', a: 'Да. Тестовый ответ: бесплатный тариф включает учёт доходов, расходов и базовую аналитику без ограничения по времени. Замените на актуальную информацию.' },
  { q: 'Как подключить тариф Старт или VIP?', a: 'Тестовый ответ: откройте приложение, перейдите в раздел тарифов и выберите нужный вариант. Оплата в приложении. Замените на реальную инструкцию.' },
  { q: 'Куда звонить по вопросам поддержки?', a: 'Тестовый ответ: горячая линия 0 228 00-77-00 (в КР бесплатно). Из-за границы: +996 (228) 00-77-00. Поддержка также в мессенджерах. Замените при необходимости.' },
  { q: 'Можно ли пользоваться на кыргызском языке?', a: 'Да. Тестовый ответ: приложение и сайт поддерживают русский и кыргызский языки. Выберите удобный в настройках. Замените на актуальное описание.' },
]

function FAQPage() {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <main className={`min-h-screen w-full ${isDark ? 'bg-zinc-900 text-gray-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <section className={`min-h-screen w-full flex flex-col justify-center py-12 min-[400px]:py-16 md:py-24 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-b from-violet-900/30 to-zinc-900' : 'bg-gradient-to-b from-indigo-50 to-zinc-50'}`}>
        <div className="max-w-[1256px] mx-auto text-center">
          <AnimateSection>
            <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-semibold mb-4 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-indigo-100 text-indigo-700'}`}>
              Вопросы и ответы
            </span>
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t.faq}
            </h1>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>
              Тестовые часто задаваемые вопросы. Замените на реальные формулировки и ответы.
            </p>
          </AnimateSection>
        </div>
      </section>

      <section className="min-h-screen w-full py-12 md:py-20 px-3 min-[400px]:px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-[800px] mx-auto">
          <AnimateSection>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-zinc-100'}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className={`w-full flex items-center justify-between gap-4 p-4 min-[400px]:p-5 text-left ${isDark ? 'hover:bg-zinc-700/50' : 'hover:bg-zinc-50'}`}
                  >
                    <span className={`font-semibold text-sm min-[400px]:text-base ${isDark ? 'text-white' : 'text-zinc-900'}`}>{item.q}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform ${openIndex === index ? 'rotate-180' : ''} ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-indigo-100 text-indigo-600'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className={`px-4 min-[400px]:px-5 pb-4 min-[400px]:pb-5 pt-0 border-t ${isDark ? 'border-zinc-600' : 'border-zinc-100'}`}>
                      <p className={`pt-3 text-sm min-[400px]:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-zinc-600'}`}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>
    </main>
  )
}

export default FAQPage
