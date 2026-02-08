import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

/** Для теста: любой непустой токен считается валидным */
function validateToken(token) {
  return typeof token === 'string' && token.trim().length > 0
}

/** Локальные видео из public/videos (положите туда sample1.mp4, sample2.mp4, sample3.mp4) */
const VIDEOS = [
  {
    id: '1',
    title: 'Как вести учёт финансов',
    description: 'Краткий обзор: доходы, расходы и аналитика за 5 минут.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop',
    videoUrl: '/videos/sample1.mp4',
  },
  {
    id: '2',
    title: 'Тарифы Besh Tashta',
    description: 'Бесплатный, Старт и VIP — что входит и как подключить.',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop',
    videoUrl: '/videos/sample2.mp4',
  },
  {
    id: '3',
    title: 'Финансовая грамотность за неделю',
    description: 'Простые шаги: бюджет, цели, привычки.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    videoUrl: '/videos/sample3.mp4',
  },
]

function ActivatePage() {
  const { token: tokenFromUrl } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const [token, setToken] = useState(tokenFromUrl || '')
  const [activated, setActivated] = useState(() => (tokenFromUrl ? validateToken(tokenFromUrl) : false))
  const [error, setError] = useState('')
  const [playingVideo, setPlayingVideo] = useState(null)

  useEffect(() => {
    if (tokenFromUrl && validateToken(tokenFromUrl)) setActivated(true)
  }, [tokenFromUrl])

  const handleActivate = (e) => {
    e.preventDefault()
    setError('')
    const value = token.trim()
    if (!value) {
      setError('Введите токен')
      return
    }
    if (validateToken(value)) {
      setActivated(true)
      if (!tokenFromUrl) navigate(`/activate/${encodeURIComponent(value)}`, { replace: true })
    } else {
      setError('Неверный токен')
    }
  }

  const bg = isDark ? 'bg-zinc-900 text-gray-100' : 'bg-white text-black'
  const cardCl = isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-gray-200'

  if (!activated) {
    return (
      <main className={`min-h-screen w-full py-10 min-[400px]:py-14 md:py-24 px-3 min-[400px]:px-4 ${bg}`}>
        <div className="max-w-md mx-auto">
          <div className={`rounded-2xl min-[400px]:rounded-3xl border-2 p-5 min-[400px]:p-6 sm:p-8 md:p-10 shadow-xl ${cardCl} ${!isDark ? 'bg-white border-indigo-100 shadow-indigo-900/5' : ''}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg ${isDark ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-900/30' : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-900/20'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            </div>
            <h1 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Активация токена
            </h1>
            <p className={`text-xs min-[400px]:text-sm mb-5 min-[400px]:mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
              Введите токен из письма или ссылки. После успешной активации откроется доступ к обучающим видео.
            </p>
            <form onSubmit={handleActivate}>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Вставьте токен"
                className={`w-full px-4 py-3 rounded-xl border-2 mb-3 min-[400px]:mb-4 text-sm min-[400px]:text-base transition focus:ring-2 ${isDark ? 'focus:ring-violet-500/50 focus:border-violet-400 bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'focus:ring-indigo-500/50 focus:border-indigo-400 bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
                autoFocus
              />
              {error && <p className="text-red-500 text-xs min-[400px]:text-sm mb-3 min-[400px]:mb-4">{error}</p>}
              <button
                type="submit"
                className={isDark ? 'w-full py-3 min-[400px]:py-3.5 rounded-xl text-sm min-[400px]:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 btn-primary-dark' : 'w-full py-3 min-[400px]:py-3.5 rounded-xl text-sm min-[400px]:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 btn-primary-light'}
              >
                Активировать
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen w-full py-8 min-[400px]:py-10 sm:py-12 md:py-16 px-3 min-[400px]:px-4 sm:px-6 ${bg}`}>
      <div className="max-w-[1256px] mx-auto">
        <h1 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          Обучающие видео
        </h1>
        <p className={`text-xs min-[400px]:text-sm mb-6 min-[400px]:mb-8 sm:mb-10 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
          Выберите видео — при нажатии откроется воспроизведение.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {VIDEOS.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setPlayingVideo(video)}
              className={`rounded-2xl border-2 overflow-hidden text-left shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-violet-500 focus:ring-offset-2 bg-zinc-800 border-zinc-600 hover:border-violet-500/40' : 'focus:ring-indigo-500 focus:ring-offset-2 bg-white border-zinc-100 hover:border-indigo-200 shadow-indigo-900/5'}`}
            >
              <div className="aspect-video bg-zinc-700 relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.background = '#404040'; }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
                  <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <svg className={`w-6 h-6 ml-0.5 ${isDark ? 'text-violet-400' : 'text-indigo-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3 min-[400px]:p-4 md:p-5">
                <h2 className={`font-bold text-base min-[400px]:text-lg mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{video.title}</h2>
                <p className={`text-xs min-[400px]:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{video.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Модальное окно с локальным видео */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 min-[400px]:p-4 bg-black/80"
          onClick={() => setPlayingVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Видео"
        >
          <div
            className="relative w-full max-w-4xl rounded-xl min-[400px]:rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPlayingVideo(null)}
              className="absolute top-2 right-2 min-[400px]:top-4 min-[400px]:right-4 z-10 w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
              aria-label="Закрыть"
            >
              <svg className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                key={playingVideo.id}
                src={playingVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Ваш браузер не поддерживает воспроизведение видео. Добавьте файлы в public/videos/ (sample1.mp4, sample2.mp4, sample3.mp4).
              </video>
            </div>
            <div className="p-3 min-[400px]:p-4 bg-zinc-900 text-white">
              <h3 className="font-bold text-base min-[400px]:text-lg">{playingVideo.title}</h3>
              <p className="text-xs min-[400px]:text-sm text-gray-400">{playingVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default ActivatePage
