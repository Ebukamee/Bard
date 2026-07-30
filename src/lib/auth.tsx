import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiClient, setTokens, clearTokens, getAccessToken } from './api-client'

export interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  loginWithGoogle: (code: string) => Promise<void>
  requestMagicLink: (email: string) => Promise<void>
  verifyMagicLink: (token: string) => Promise<void>
  updateName: (name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      setIsLoading(false)
      return
    }
    apiClient('/auth/me')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setUser(data.user ?? data))
      .catch(() => {
        clearTokens()
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const loginWithGoogle = useCallback(async (code: string) => {
    const res = await apiClient('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ code, redirect_uri: 'postmessage' }),
    })
    if (!res.ok) throw new Error('Google login failed')
    const data = await res.json()
    setTokens(data.access_token, data.refresh_token)
    setUser(data.user)
  }, [])

  const requestMagicLink = useCallback(async (email: string) => {
    const res = await apiClient('/auth/magic-link/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    if (!res.ok) throw new Error('Failed to send magic link')
  }, [])

  const verifyMagicLink = useCallback(async (token: string) => {
    const res = await apiClient('/auth/magic-link/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
    if (!res.ok) throw new Error('Invalid or expired magic link')
    const data = await res.json()
    setTokens(data.access_token, data.refresh_token)
    setUser(data.user)
  }, [])

  const updateName = useCallback(async (name: string) => {
    const res = await apiClient('/profile', {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Failed to update name (${res.status}): ${body}`)
    }
    const data = await res.json()
    setUser(data.user ?? data)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        loginWithGoogle,
        requestMagicLink,
        verifyMagicLink,
        updateName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
