import { createFileRoute, Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Mic01Icon,
  Book02Icon,
  PodiumIcon,
  File01Icon,
  Clock01Icon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { useAuth } from '../../lib/auth'
import { useTranscriptions } from '../../lib/api-hooks'

export const Route = createFileRoute('/_dashboard/home')({
  component: DashboardHome,
})

function DashboardHome() {
  const { user } = useAuth()
  const { data: recent = [], isLoading } = useTranscriptions(undefined, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Greeting */}
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold text-white">
          {greeting}, {firstName}
        </h1>
        <p className="mt-1 text-sm text-white/40">{dateStr}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          to="/transcription"
          className="card-hover group flex items-center gap-4 rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 no-underline transition hover:ring-white/10 animate-fade-up"
          style={{ animationDelay: '50ms' }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-white/10 group-hover:scale-110">
            <HugeiconsIcon icon={Mic01Icon} size={24} className="text-white/70" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">New Transcription</p>
            <p className="text-xs text-white/40">Record or upload</p>
          </div>
        </Link>

        <Link
          to="/diary"
          className="card-hover group flex items-center gap-4 rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 no-underline transition hover:ring-white/10 animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-white/10 group-hover:scale-110">
            <HugeiconsIcon icon={Book02Icon} size={24} className="text-white/70" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Record Diary</p>
            <p className="text-xs text-white/40">Capture your thoughts</p>
          </div>
        </Link>

        <Link
          to="/speaking"
          className="card-hover group flex items-center gap-4 rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 no-underline transition hover:ring-white/10 animate-fade-up"
          style={{ animationDelay: '150ms' }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-white/10 group-hover:scale-110">
            <HugeiconsIcon icon={PodiumIcon} size={24} className="text-white/70" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Practice Speaking</p>
            <p className="text-xs text-white/40">Track filler words</p>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
        <StatCard icon={File01Icon} label="Transcriptions" value={recent.length} delay={200} />
        <StatCard icon={Clock01Icon} label="Completed" value={recent.filter(t => t.status === 'completed').length} delay={250} />
      </div>

      {/* Recent */}
      <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          </div>
        ) : recent.length === 0 ? (
          <div className="rounded-2xl bg-[#161616] p-8 text-center ring-1 ring-white/5">
            <p className="text-sm text-white/40">No transcriptions yet. Record something to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((t, i) => (
              <div
                key={t.id}
                className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${350 + i * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-white">
                        {t.summary?.slice(0, 60) || t.audio_filename || 'Untitled'}
                      </h3>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/30">
                        {t.type}
                      </span>
                      {t.status !== 'completed' && (
                        <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-yellow-400/60">
                          {t.status}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-xs text-white/40">
                      {t.cleaned_transcript?.slice(0, 100) || t.original_transcript?.slice(0, 100) || 'Processing...'}
                    </p>
                  </div>
                  <div className="text-right text-xs text-white/30">
                    <p>{new Date(t.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: IconSvgElement
  label: string
  value: string | number
  delay: number
}) {
  return (
    <div
      className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <HugeiconsIcon icon={icon} size={20} className="mb-3 text-white/30" />
      <p className="text-2xl font-semibold text-white animate-glow-in" style={{ animationDelay: `${delay + 200}ms` }}>{value}</p>
      <p className="mt-1 text-xs text-white/40">{label}</p>
    </div>
  )
}
