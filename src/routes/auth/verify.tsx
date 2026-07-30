import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/auth/verify')({
  component: VerifyMagicLink,
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || '',
  }),
})

function VerifyMagicLink() {
  const { token } = Route.useSearch()
  const { verifyMagicLink, user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setError('No verification token provided.')
      return
    }
    verifyMagicLink(token)
      .then(() => {
        // handled below after user state updates
      })
      .catch(() => setError('This link is invalid or has expired.'))
  }, [token, verifyMagicLink])

  // After verify succeeds and user state is set, redirect based on name
  useEffect(() => {
    if (!user) return
    if (!user.name) {
      navigate({ to: '/auth/setup' })
    } else {
      navigate({ to: '/home' })
    }
  }, [user, navigate])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#040404] px-6">
      {error ? (
        <div className="text-center animate-fade-up">
          <p className="text-lg font-semibold text-white">{error}</p>
          <Link
            to="/signin"
            className="mt-4 inline-block text-sm text-white/40 no-underline transition hover:text-white/60"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <p className="text-sm text-white/40">Verifying your link...</p>
        </div>
      )}
    </main>
  )
}
