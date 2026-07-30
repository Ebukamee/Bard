const API_BASE =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080'

// ── Token helpers ──

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('bard_access_token')
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('bard_refresh_token')
}

export function setTokens(access: string, refresh: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('bard_access_token', access)
  localStorage.setItem('bard_refresh_token', refresh)
}

export function clearTokens() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('bard_access_token')
  localStorage.removeItem('bard_refresh_token')
}

// ── Token refresh ──

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  // Deduplicate concurrent refresh calls
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const refresh = getRefreshToken()
    if (!refresh) return null

    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refresh }),
      })
      if (!res.ok) {
        clearTokens()
        return null
      }
      const data = await res.json()
      setTokens(data.access_token, data.refresh_token)
      return data.access_token as string
    } catch {
      clearTokens()
      return null
    }
  })()

  const result = await refreshPromise
  refreshPromise = null
  return result
}

// ── Core fetch wrapper ──

export async function apiClient(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getAccessToken()
  const headers = new Headers(options.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // Don't set Content-Type for FormData — browser sets boundary automatically
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers })

  // Auto-refresh on 401
  if (res.status === 401) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`)
      res = await fetch(`${API_BASE}${path}`, { ...options, headers })
    }
  }

  return res
}
