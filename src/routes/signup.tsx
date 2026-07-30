import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import StarField from '../components/StarField'
import { useAuth } from '../lib/auth'

export const Route = createFileRoute('/signup')({
  component: SignUp,
})

const MINI_BARS = [
  30, 50, 70, 40, 85, 55, 90, 45, 75, 60,
  80, 35, 65, 90, 50, 70, 40, 85, 55, 95,
  45, 70, 60, 80, 35, 55, 75, 50, 65, 85,
  40, 60, 80, 50, 70, 90, 35, 75, 55, 65,
  85, 45, 70, 50, 90, 60, 40, 80, 55, 75,
  65, 35, 85, 50, 70, 45, 90, 60, 80, 55,
]

const TRANSCRIPT_TEXT =
  'So I had this idea for the podcast intro — instead of jumping straight into the interview, ' +
  'we open with a quick montage of listener voice messages. Like thirty seconds of real people ' +
  'sharing what the show means to them. Then we fade into the theme music and hit the guest intro. ' +
  'I think it makes the whole thing feel more personal and community-driven. We could rotate the ' +
  'clips every few episodes so it stays fresh. Also, for the outro, maybe we add a teaser clip ' +
  'from next week\'s episode to keep people hooked. What do you think — too much, or worth trying?'

const PHASE_DURATIONS = { voice: 3500, spinner: 1800 }

function VoiceToTextDemo() {
  const [phase, setPhase] = useState<'voice' | 'spinner' | 'chat'>('voice')
  const [chars, setChars] = useState(0)
  const idx = useRef(0)

  // Phase transitions
  useEffect(() => {
    if (phase === 'voice') {
      const t = setTimeout(() => setPhase('spinner'), PHASE_DURATIONS.voice)
      return () => clearTimeout(t)
    }
    if (phase === 'spinner') {
      const t = setTimeout(() => {
        idx.current = 0
        setChars(0)
        setPhase('chat')
      }, PHASE_DURATIONS.spinner)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Typewriter effect during chat phase
  useEffect(() => {
    if (phase !== 'chat') return
    const interval = setInterval(() => {
      idx.current++
      if (idx.current > TRANSCRIPT_TEXT.length) {
        clearInterval(interval)
        // Pause then loop back
        setTimeout(() => setPhase('voice'), 2500)
        return
      }
      setChars(idx.current)
    }, 35)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      {/* Voice note */}
      <div
        className="w-full transition-all duration-500"
        style={{
          opacity: phase === 'voice' ? 1 : 0,
          position: phase === 'voice' ? 'relative' : 'absolute',
          pointerEvents: phase === 'voice' ? 'auto' : 'none',
        }}
      >
        <div className="rounded-2xl bg-[#161616] px-5 py-4 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>
            <div className="flex h-12 flex-1 items-end justify-between">
              {MINI_BARS.map((height, i) => (
                <div
                  key={i}
                  className="waveform-bar w-[3px] rounded-full bg-white"
                  style={{
                    height: `${height}%`,
                    opacity: 0.6,
                    animationDelay: `${i * 60}ms`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between pl-12 text-[10px] text-white/25">
            <span>0:32</span>
            <span>1:15</span>
          </div>
        </div>
      </div>

      {/* Spinner */}
      <div
        className="transition-all duration-500"
        style={{
          opacity: phase === 'spinner' ? 1 : 0,
          position: phase === 'spinner' ? 'relative' : 'absolute',
          pointerEvents: 'none',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <span className="text-xs text-white/30">Transcribing...</span>
        </div>
      </div>

      {/* Chat bubble */}
      <div
        className="w-full transition-all duration-500"
        style={{
          opacity: phase === 'chat' ? 1 : 0,
          position: phase === 'chat' ? 'relative' : 'absolute',
          pointerEvents: phase === 'chat' ? 'auto' : 'none',
        }}
      >
        <div className="rounded-2xl bg-[#161616] px-5 py-5 ring-1 ring-white/5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-white/10" />
            <span className="text-xs font-medium text-white/40">Transcript</span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            {TRANSCRIPT_TEXT.slice(0, chars)}
            {chars < TRANSCRIPT_TEXT.length && (
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-white/60" />
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

function SignUp() {
  const { isAuthenticated, isLoading, requestMagicLink, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [googleError, setGoogleError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/home' })
    }
  }, [isLoading, isAuthenticated, navigate])

  const handleGoogleLogin = () => {
    setGoogleError('')
    const client = google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      ux_mode: 'popup',
      callback: async (response: { code?: string; error?: string }) => {
        if (response.error || !response.code) {
          setGoogleError('Google sign-in was cancelled or failed.')
          return
        }
        setGoogleLoading(true)
        try {
          await loginWithGoogle(response.code)
          navigate({ to: '/home' })
        } catch {
          setGoogleError('Google sign-in failed. Please try again.')
        } finally {
          setGoogleLoading(false)
        }
      },
    })
    client.requestCode()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    setError('')
    try {
      await requestMagicLink(email.trim())
      setSent(true)
    } catch {
      setError('Failed to send magic link. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-140px)] items-center justify-center overflow-x-clip px-5 py-16">
      <StarField count={40} />

      <div className="flex w-full max-w-4xl items-center gap-20">
        {/* Voice-to-text illustration — left side, desktop only */}
        <div className="hidden flex-1 lg:block">
          <VoiceToTextDemo />
        </div>

        {/* Form side */}
        <div className="w-full max-w-sm flex-shrink-0">
          {/* Logo — hidden on mobile (already visible above) */}
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="inline-block no-underline">
              <svg width="88" height="34" viewBox="0 0 88 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="5" x2="4" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M4 5 L16 5 C21 5 22 9 20 12 L16 16 L4 16" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M4 16 L16 16 C23 16 24 21 21 25 L16 29 L4 29" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M24 10 C26 12 26 22 24 24" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M27 7 C30 11 30 23 27 27" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" />
                <text x="34" y="26" fill="white" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="700" letterSpacing="2">ARD</text>
              </svg>
            </Link>
          </div>

          {/* Card */}
          <div className="rise-in rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5">
            <h1 className="mb-1 text-2xl font-semibold text-white">Create your account</h1>
            <p className="mb-8 text-sm text-white/40">Start transcribing in seconds</p>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              {googleLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
                </svg>
              )}
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
            {googleError && (
              <p className="mt-2 text-center text-xs text-red-400">{googleError}</p>
            )}

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/30">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Magic link */}
            {sent ? (
              <div className="rounded-xl bg-white/5 p-5 text-center">
                <p className="text-sm font-medium text-white">Check your email</p>
                <p className="mt-2 text-xs text-white/40">
                  We sent a sign-in link to <span className="text-white/60">{email}</span>
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs text-white/40 transition hover:text-white/60"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/10"
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full py-3 text-sm font-medium transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  style={{ background: '#ffffff', color: '#040404' }}
                >
                  {submitting ? 'Sending...' : 'Send magic link'}
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-white/40 lg:text-left">
            Already have an account?{' '}
            <Link to="/signin" className="text-white no-underline transition hover:text-white/70">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
