const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const ADMIN_TOKEN_KEY = 'admin_token'

export function getAdminToken() {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setAdminToken(token) {
  try {
    if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token)
    else localStorage.removeItem(ADMIN_TOKEN_KEY)
  } catch {}
}

export function clearAdminToken() {
  setAdminToken('')
}

function authHeaders() {
  const token = getAdminToken()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    ...options,
    credentials: options.credentials ?? 'same-origin',
    headers: {
      ...(options.headers || {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw { status: res.status, ...data }
  }
  return data
}

export async function getVideos() {
  return request('/api/videos/')
}

export async function createVideo(formData) {
  const res = await fetch(`${API_BASE}/api/videos/`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw { status: res.status, ...data }
  return data
}

export async function updateVideo(id, data) {
  return request(`/api/videos/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function updateVideoWithFile(id, formData) {
  const res = await fetch(`${API_BASE}/api/videos/${id}/`, {
    method: 'PATCH',
    body: formData,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw { status: res.status, ...data }
  return data
}

export async function deleteVideo(id) {
  const res = await fetch(`${API_BASE}/api/videos/${id}/`, { method: 'DELETE' })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw { status: res.status, ...data }
  }
}

export async function getTokens() {
  return request('/api/tokens/')
}

export async function createToken(videoId = null) {
  const body = videoId != null ? { video: videoId } : {}
  return request('/api/tokens/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function activateToken(tokenValue) {
  try {
    return await request('/api/activate/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: String(tokenValue).trim() }),
    })
  } catch (err) {
    if (err && (err.status !== undefined || err.error !== undefined)) return Promise.reject(err)
    return Promise.reject({
      error: 'Сервер недоступен. Проверьте, что бэкенд запущен (например, http://127.0.0.1:8000).',
    })
  }
}

export async function getAnalyticsSummary() {
  return request('/api/analytics/summary/', { headers: { ...authHeaders() } })
}

export async function recordView(videoId) {
  return request('/api/analytics/view/', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ video_id: videoId }),
  })
}

export async function adminLogin(username, password) {
  return request('/api/admin/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: String(username).trim(), password: String(password) }),
  })
}

export async function adminChangePassword(currentPassword, newPassword) {
  return request('/api/admin/change-password/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  })
}

export async function adminLogout() {
  return request('/api/admin/logout/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({}),
  })
}

export { API_BASE }
