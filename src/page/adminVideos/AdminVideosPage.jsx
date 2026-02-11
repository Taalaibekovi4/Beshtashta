import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getVideos, getTokens, createVideo, createToken, updateVideo, updateVideoWithFile, deleteVideo, getAnalyticsSummary, adminLogin, adminChangePassword, adminLogout, getAdminToken, setAdminToken, clearAdminToken } from '../../api/client'

const TABS = [
  { id: 'token', label: 'Создать токен' },
  { id: 'videos', label: 'Добавление видео' },
  { id: 'analytics', label: 'Аналитика' },
  { id: 'settings', label: 'Настройки' },
]

const TOKEN_SUBTABS = [
  { id: 'create', label: 'Создать токен' },
  { id: 'list', label: 'Список токенов' },
]

const VIDEOS_SUBTABS = [
  { id: 'add', label: 'Добавить видео' },
  { id: 'edit', label: 'Изменение' },
]

function AdminVideosPage() {
  const { isDark } = useTheme()
  const [authenticated, setAuthenticated] = useState(() => !!getAdminToken())
  const [loginInput, setLoginInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('token')
  const [tokenSubTab, setTokenSubTab] = useState('create')
  const [tokenFilter, setTokenFilter] = useState(null)
  const [videosSubTab, setVideosSubTab] = useState('add')
  const [videos, setVideos] = useState([])
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [tokensLoading, setTokensLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', file: null })
  const [filePreviewUrl, setFilePreviewUrl] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [tokenLoading, setTokenLoading] = useState(false)
  const [newToken, setNewToken] = useState(null)
  const [copyTokenDone, setCopyTokenDone] = useState(false)
  const [copiedTokenId, setCopiedTokenId] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', file: null })
  const [editPreviewUrl, setEditPreviewUrl] = useState(null)
  const [editLoading, setEditLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [settingsForm, setSettingsForm] = useState({ current: '', new: '', repeat: '' })
  const [settingsMessage, setSettingsMessage] = useState('')
  const [analyticsSummary, setAnalyticsSummary] = useState(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const fileInputRef = useRef(null)
  const editFileInputRef = useRef(null)

  const loadVideos = async () => {
    try {
      const list = await getVideos()
      setVideos(Array.isArray(list) ? list : [])
    } catch {
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const loadTokens = async () => {
    setTokensLoading(true)
    try {
      const list = await getTokens()
      setTokens(Array.isArray(list) ? list : [])
    } catch {
      setTokens([])
    } finally {
      setTokensLoading(false)
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  useEffect(() => {
    if ((activeTab === 'token' || activeTab === 'analytics') && authenticated) loadTokens()
  }, [activeTab, authenticated])

  useEffect(() => {
    if (activeTab === 'analytics' || activeTab === 'videos') loadVideos()
  }, [activeTab])

  const loadAnalyticsSummary = async () => {
    setAnalyticsLoading(true)
    try {
      const data = await getAnalyticsSummary()
      setAnalyticsSummary(data)
    } catch (err) {
      if (err?.status === 401) {
        clearAdminToken()
        setAuthenticated(false)
      }
      setAnalyticsSummary(null)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'analytics' && authenticated) loadAnalyticsSummary()
  }, [activeTab, authenticated])

  useEffect(() => {
    if (form.file) {
      const url = URL.createObjectURL(form.file)
      setFilePreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setFilePreviewUrl(null)
  }, [form.file])

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    try {
      const data = await adminLogin(loginInput.trim(), passwordInput)
      const token = data?.token
      if (token) {
        setAdminToken(token)
        setAuthenticated(true)
      } else {
        setAuthError('Ошибка входа')
      }
    } catch (err) {
      setAuthError(err?.error || 'Неверный логин или пароль')
    }
  }

  const handleLogout = async () => {
    try {
      await adminLogout()
    } catch {}
    clearAdminToken()
    setAuthenticated(false)
    setLoginInput('')
    setPasswordInput('')
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setSettingsMessage('')
    if (settingsForm.new !== settingsForm.repeat) {
      setSettingsMessage('Пароли не совпадают')
      return
    }
    if (settingsForm.new.length < 1) {
      setSettingsMessage('Введите новый пароль')
      return
    }
    try {
      await adminChangePassword(settingsForm.current, settingsForm.new)
      setSettingsForm({ current: '', new: '', repeat: '' })
      setSettingsMessage('Пароль изменён')
    } catch (err) {
      if (err?.status === 401) {
        clearAdminToken()
        setAuthenticated(false)
      }
      setSettingsMessage(err?.error || 'Ошибка')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.title.trim()) {
      setFormError('Укажите заголовок')
      return
    }
    if (!form.file) {
      setFormError('Выберите видеофайл')
      return
    }
    setSubmitLoading(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title.trim())
      fd.append('description', form.description.trim())
      fd.append('file', form.file)
      await createVideo(fd)
      setForm({ title: '', description: '', file: null })
      setFilePreviewUrl(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      await loadVideos()
    } catch (err) {
      setFormError(err.error || 'Ошибка загрузки')
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleCreateToken = async () => {
    setNewToken(null)
    setFormError('')
    setTokenLoading(true)
    try {
      const data = await createToken()
      setNewToken(data)
      await loadTokens()
    } catch (err) {
      setFormError(err.error || 'Ошибка создания токена')
    } finally {
      setTokenLoading(false)
    }
  }

  const copyToken = () => {
    if (!newToken?.value) return
    navigator.clipboard.writeText(String(newToken.value))
    setCopyTokenDone(true)
    setTimeout(() => setCopyTokenDone(false), 2000)
  }

  const copyTokenFromList = (value, id) => {
    const text = String(value ?? '')
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTokenId(id)
      setTimeout(() => setCopiedTokenId(null), 2000)
    }).catch(() => {})
  }

  const startEdit = (video) => {
    setEditing(video.id)
    setEditForm({ title: video.title || '', description: video.description || '', file: null })
    setEditPreviewUrl(null)
    setFormError('')
    if (editFileInputRef.current) editFileInputRef.current.value = ''
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditForm({ title: '', description: '', file: null })
    setEditPreviewUrl(null)
  }

  useEffect(() => {
    if (editForm.file) {
      const url = URL.createObjectURL(editForm.file)
      setEditPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setEditPreviewUrl(null)
  }, [editForm.file])

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editing) return
    setFormError('')
    if (!editForm.title.trim()) {
      setFormError('Укажите заголовок')
      return
    }
    setEditLoading(true)
    try {
      if (editForm.file) {
        const fd = new FormData()
        fd.append('title', editForm.title.trim())
        fd.append('description', editForm.description.trim())
        fd.append('file', editForm.file)
        await updateVideoWithFile(editing, fd)
      } else {
        await updateVideo(editing, {
          title: editForm.title.trim(),
          description: editForm.description.trim(),
        })
      }
      await loadVideos()
      setEditing(null)
      setEditForm({ title: '', description: '', file: null })
      setEditPreviewUrl(null)
    } catch (err) {
      setFormError(err.error || 'Ошибка сохранения')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить это видео?')) return
    setFormError('')
    setDeleteId(id)
    setDeleteLoading(true)
    try {
      await deleteVideo(id)
      await loadVideos()
      setDeleteId(null)
    } catch (err) {
      setFormError(err.error || 'Ошибка удаления')
    } finally {
      setDeleteLoading(false)
    }
  }

  const tokensNew = tokens.filter((t) => t.status === 'NEW')
  const tokensActivated = tokens.filter((t) => t.status === 'ACTIVATED')
  const tokensFiltered =
    tokenFilter === 'NEW' ? tokensNew : tokenFilter === 'ACTIVATED' ? tokensActivated : tokens

  const bg = isDark ? 'bg-zinc-900 text-gray-100' : 'bg-white text-black'
  const cardCl = isDark ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-gray-200'
  const subTabCl = (active, isDark) =>
    active
      ? isDark
        ? 'bg-violet-600 text-white'
        : 'bg-indigo-600 text-white'
      : isDark
        ? 'text-gray-400 hover:bg-zinc-700 hover:text-white'
        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'

  if (!authenticated) {
    return (
      <main className={`min-h-screen w-full py-10 md:py-24 px-4 flex items-center justify-center ${bg}`}>
        <div className={`w-full max-w-sm rounded-2xl border-2 p-6 sm:p-8 shadow-xl ${cardCl}`}>
          <h1 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Вход в админку</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="Логин"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
              autoComplete="username"
            />
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Пароль"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
              autoComplete="current-password"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button type="submit" className={isDark ? 'btn-primary-dark w-full py-3 rounded-xl text-sm font-semibold' : 'btn-primary-light w-full py-3 rounded-xl text-sm font-semibold'}>
              Войти
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen w-full py-8 min-[400px]:py-10 sm:py-12 md:py-16 px-3 min-[400px]:px-4 sm:px-6 ${bg}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h1 className={`text-xl min-[400px]:text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Админка
          </h1>
          <button type="button" onClick={handleLogout} className={`text-sm px-3 py-1.5 rounded-lg ${isDark ? 'text-gray-400 hover:bg-zinc-700 hover:text-white' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}>
            Выйти
          </button>
        </div>

        <nav className="flex flex-wrap gap-1 border-b-2 min-[400px]:gap-2 pb-2" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 min-[400px]:px-4 rounded-t-lg text-sm font-medium transition ${activeTab === tab.id ? (isDark ? 'bg-violet-600 text-white' : 'bg-indigo-600 text-white') : isDark ? 'text-gray-400 hover:text-white hover:bg-zinc-700' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ========== Вкладка: Создать токен ========== */}
        {activeTab === 'token' && (
          <section className={`rounded-2xl border-2 p-5 sm:p-6 md:p-8 shadow-xl ${cardCl}`}>
            <nav className="flex gap-1 mb-4 pb-2 border-b border-zinc-600/50" aria-label="Подменю токенов">
              {TOKEN_SUBTABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTokenSubTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${subTabCl(tokenSubTab === tab.id, isDark)}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {tokenSubTab === 'create' && (
              <>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Создать токен</h2>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
                  Токен даёт доступ ко всем видео. После создания отправьте пользователю только сам токен.
                </p>
                <button
                  type="button"
                  onClick={handleCreateToken}
                  disabled={tokenLoading}
                  className={isDark ? 'btn-primary-dark px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60' : 'btn-primary-light px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60'}
                >
                  {tokenLoading ? 'Создание...' : 'Создать токен'}
                </button>
                {newToken && (
                  <div className={`mt-4 p-4 rounded-xl border-2 ${isDark ? 'bg-zinc-700/50 border-zinc-600' : 'bg-zinc-50 border-zinc-200'}`}>
                    <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Токен:</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <code className="font-mono text-sm break-all flex-1 min-w-0">{newToken.value}</code>
                      <button type="button" onClick={copyToken} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                        {copyTokenDone ? 'Скопировано' : 'Копировать токен'}
                      </button>
                    </div>
                  </div>
                )}
                {formError && <p className="mt-3 text-red-500 text-sm">{formError}</p>}
              </>
            )}

            {tokenSubTab === 'list' && (
              <>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Список токенов</h2>
                <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4`}>
                  <button type="button" onClick={() => setTokenFilter(null)} className={`p-3 rounded-xl border text-left transition ${tokenFilter === null ? (isDark ? 'ring-2 ring-violet-500 bg-zinc-700/50 border-violet-500' : 'ring-2 ring-indigo-500 bg-zinc-50 border-indigo-400') : (isDark ? 'bg-zinc-700/50 border-zinc-600 hover:border-zinc-500' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300')}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Всего</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{tokens.length}</p>
                  </button>
                  <button type="button" onClick={() => setTokenFilter('NEW')} className={`p-3 rounded-xl border text-left transition ${tokenFilter === 'NEW' ? (isDark ? 'ring-2 ring-amber-500 bg-zinc-700/50 border-amber-500' : 'ring-2 ring-amber-500 bg-zinc-50 border-amber-400') : (isDark ? 'bg-zinc-700/50 border-zinc-600 hover:border-zinc-500' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300')}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Не активированы</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{tokensNew.length}</p>
                  </button>
                  <button type="button" onClick={() => setTokenFilter('ACTIVATED')} className={`p-3 rounded-xl border text-left transition ${tokenFilter === 'ACTIVATED' ? (isDark ? 'ring-2 ring-emerald-500 bg-zinc-700/50 border-emerald-500' : 'ring-2 ring-emerald-500 bg-zinc-50 border-emerald-400') : (isDark ? 'bg-zinc-700/50 border-zinc-600 hover:border-zinc-500' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300')}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Активированы</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{tokensActivated.length}</p>
                  </button>
                </div>
                {tokensLoading ? (
                  <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Загрузка...</p>
                ) : tokensFiltered.length === 0 ? (
                  <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Нет токенов.</p>
                ) : (
                  <ul className="space-y-2 max-h-64 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {tokensFiltered.map((t) => (
                      <li key={t.id} className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg border ${isDark ? 'border-zinc-600 bg-zinc-700/30' : 'border-zinc-200 bg-zinc-50'}`}>
                        <code className="font-mono text-xs truncate flex-1 min-w-0">{t.value}</code>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => copyTokenFromList(t.value, t.id)}
                            className={`px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                          >
                            {copiedTokenId === t.id ? 'Скопировано' : 'Скопировать'}
                          </button>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${t.status === 'NEW' ? (isDark ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-700') : (isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700')}`}>
                            {t.status === 'NEW' ? 'Не активирован' : 'Активирован'}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        )}

        {/* ========== Вкладка: Добавление видео ========== */}
        {activeTab === 'videos' && (
          <section className={`rounded-2xl border-2 p-5 sm:p-6 md:p-8 shadow-xl ${cardCl}`}>
            <nav className="flex gap-1 mb-4 pb-2 border-b border-zinc-600/50" aria-label="Подменю видео">
              {VIDEOS_SUBTABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setVideosSubTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${subTabCl(videosSubTab === tab.id, isDark)}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {videosSubTab === 'add' && (
              <>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Добавить видео</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Заголовок"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm min-[400px]:text-base ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Описание (необязательно)"
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm min-[400px]:text-base resize-none ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
                  />
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>
                      Файл: {form.file ? form.file.name : 'не выбран'}
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
                      className={`w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium ${isDark ? 'file:bg-violet-600 file:text-white text-gray-400' : 'file:bg-indigo-600 file:text-white text-zinc-600'}`}
                    />
                    {filePreviewUrl && (
                      <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden bg-black border border-zinc-600">
                        <video src={filePreviewUrl} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                      </div>
                    )}
                  </div>
                  {formError && <p className="text-red-500 text-sm">{formError}</p>}
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className={isDark ? 'btn-primary-dark px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60' : 'btn-primary-light px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60'}
                  >
                    {submitLoading ? 'Загрузка...' : 'Добавить видео'}
                  </button>
                </form>
              </>
            )}

            {videosSubTab === 'edit' && (
              <>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Изменение и удаление</h2>
                {loading ? (
                  <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Загрузка...</p>
                ) : videos.length === 0 ? (
                  <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Нет видео.</p>
                ) : (
                  <ul className="space-y-4">
                    {videos.map((v) => (
                      <li key={v.id} className={`rounded-xl border-2 p-3 ${isDark ? 'border-zinc-600 bg-zinc-700/30' : 'border-zinc-200 bg-zinc-50'}`}>
                        {editing === v.id ? (
                          <form onSubmit={handleEditSubmit} className="space-y-3">
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                              placeholder="Заголовок"
                              className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}
                            />
                            <textarea
                              value={editForm.description}
                              onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                              placeholder="Описание"
                              rows={2}
                              className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}
                            />
                            <div>
                              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Заменить видеофайл (необязательно)</p>
                              <input
                                ref={editFileInputRef}
                                type="file"
                                accept="video/*"
                                onChange={(e) => setEditForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
                                className={`w-full text-sm file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs ${isDark ? 'file:bg-violet-600 file:text-white text-gray-400' : 'file:bg-indigo-600 file:text-white text-zinc-600'}`}
                              />
                              {editPreviewUrl && (
                                <div className="mt-2 w-24 h-24 rounded overflow-hidden bg-black border border-zinc-600">
                                  <video src={editPreviewUrl} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button type="submit" disabled={editLoading} className={isDark ? 'btn-primary-dark px-4 py-2 rounded-lg text-sm disabled:opacity-60' : 'btn-primary-light px-4 py-2 rounded-lg text-sm disabled:opacity-60'}>
                                {editLoading ? 'Сохранение...' : 'Сохранить'}
                              </button>
                              <button type="button" onClick={cancelEdit} className={`px-4 py-2 rounded-lg text-sm border ${isDark ? 'border-zinc-600 text-gray-300 hover:bg-zinc-700' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'}`}>
                                Отмена
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex gap-3 items-start">
                            <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-black">
                              {v.video_url ? (
                                <video src={v.video_url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>{v.title}</p>
                              {v.description && <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>{v.description}</p>}
                              <div className="flex gap-2 mt-2">
                                <button type="button" onClick={() => startEdit(v)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-violet-600/80 text-white hover:bg-violet-600' : 'bg-indigo-600/80 text-white hover:bg-indigo-600'}`}>
                                  Изменить
                                </button>
                                <button type="button" onClick={() => handleDelete(v.id)} disabled={deleteLoading && deleteId === v.id} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600/80 text-white hover:bg-red-600 disabled:opacity-60">
                                  {deleteLoading && deleteId === v.id ? 'Удаление...' : 'Удалить'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {formError && <p className="mt-3 text-red-500 text-sm">{formError}</p>}
              </>
            )}
          </section>
        )}

        {/* ========== Вкладка: Аналитика ========== */}
        {activeTab === 'analytics' && (
          <section className={`rounded-2xl border-2 p-5 sm:p-6 md:p-8 shadow-xl ${cardCl}`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Аналитика</h2>
            {analyticsLoading ? (
              <p className={isDark ? 'text-gray-400' : 'text-zinc-600'}>Загрузка...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border-2 ${isDark ? 'bg-zinc-700/50 border-zinc-600' : 'bg-zinc-50 border-zinc-200'}`}>
                  <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Видео</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{analyticsSummary?.videos_count ?? videos.length}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-zinc-400'}`}>в каталоге</p>
                </div>
                <div className={`p-4 rounded-xl border-2 ${isDark ? 'bg-zinc-700/50 border-zinc-600' : 'bg-zinc-50 border-zinc-200'}`}>
                  <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Токены</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{analyticsSummary?.tokens_count ?? tokens.length}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-zinc-400'}`}>всего</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>Не активированы: {analyticsSummary?.tokens_new ?? tokensNew.length}</span>
                    <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Активированы: {analyticsSummary?.tokens_activated ?? tokensActivated.length}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border-2 sm:col-span-2 ${isDark ? 'bg-zinc-700/50 border-zinc-600' : 'bg-zinc-50 border-zinc-200'}`}>
                  <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Просмотры</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{analyticsSummary?.views_count ?? 0}</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-zinc-400'}`}>просмотров видео (с бэкенда)</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ========== Вкладка: Настройки ========== */}
        {activeTab === 'settings' && (
          <section className={`rounded-2xl border-2 p-5 sm:p-6 md:p-8 shadow-xl ${cardCl}`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Настройки</h2>
            <h3 className={`text-base font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-zinc-800'}`}>Изменение пароля</h3>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
              <input
                type="password"
                value={settingsForm.current}
                onChange={(e) => setSettingsForm((f) => ({ ...f, current: e.target.value }))}
                placeholder="Текущий пароль"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
                autoComplete="current-password"
              />
              <input
                type="password"
                value={settingsForm.new}
                onChange={(e) => setSettingsForm((f) => ({ ...f, new: e.target.value }))}
                placeholder="Новый пароль"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
                autoComplete="new-password"
              />
              <input
                type="password"
                value={settingsForm.repeat}
                onChange={(e) => setSettingsForm((f) => ({ ...f, repeat: e.target.value }))}
                placeholder="Повторите новый пароль"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm ${isDark ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-500' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'}`}
                autoComplete="new-password"
              />
              {settingsMessage && <p className={`text-sm ${settingsMessage === 'Пароль изменён' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : 'text-red-500'}`}>{settingsMessage}</p>}
              <button type="submit" className={isDark ? 'btn-primary-dark px-6 py-3 rounded-xl text-sm font-semibold' : 'btn-primary-light px-6 py-3 rounded-xl text-sm font-semibold'}>
                Сохранить пароль
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  )
}

export default AdminVideosPage
