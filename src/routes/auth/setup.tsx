import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/auth/setup')({
  component: SetupPage,
})

function SetupPage() {
  const { user, isLoading, isAuthenticated, updateName } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Redirect if not logged in
  if (!isLoading && !isAuthenticated) {
    navigate({ to: '/signin' })
    return null
  }

  // Already has a name — skip to dashboard
  if (!isLoading && user?.name) {
    navigate({ to: '/home' })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setSaving(true)
    setError('')
    try {
      await updateName(trimmed)
      navigate({ to: '/home' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#040404]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#040404] px-6">
      <div className="w-full max-w-md space-y-8 animate-fade-up">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to Bard</h1>
          <p className="mt-3 text-sm text-white/40">What should we call you?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-white/20 outline-none transition focus:border-white/25"
          />

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="btn-press w-full rounded-full py-3 text-base font-semibold transition disabled:opacity-40"
            style={{ background: '#ffffff', color: '#040404' }}
          >
            {saving ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </main>
  )
}
