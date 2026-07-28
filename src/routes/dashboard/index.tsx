import { createFileRoute, Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Mic01Icon,
  Book02Icon,
  PodiumIcon,
  File01Icon,
  Clock01Icon,
  HashtagIcon,
  FireIcon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { MOCK_USER, MOCK_USAGE_STATS, MOCK_TRANSCRIPTIONS } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Greeting */}
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold text-white">
          {greeting}, {MOCK_USER.name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-sm text-white/40">{dateStr}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          to="/dashboard/transcription"
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
          to="/dashboard/diary"
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
          to="/dashboard/speaking"
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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={File01Icon} label="Transcriptions" value={MOCK_USAGE_STATS.totalTranscriptions} delay={200} />
        <StatCard icon={Clock01Icon} label="Minutes" value={MOCK_USAGE_STATS.totalMinutes} delay={250} />
        <StatCard icon={HashtagIcon} label="Words" value={MOCK_USAGE_STATS.wordsTranscribed.toLocaleString()} delay={300} />
        <StatCard icon={FireIcon} label="Day Streak" value={MOCK_USAGE_STATS.streak} delay={350} />
      </div>

      {/* Recent */}
      <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent</h2>
        <div className="space-y-3">
          {MOCK_TRANSCRIPTIONS.map((t, i) => (
            <div
              key={t.id}
              className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up cursor-pointer"
              style={{ animationDelay: `${350 + i * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-white">{t.title}</h3>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/30">
                      {t.type}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-white/40">{t.text}</p>
                </div>
                <div className="text-right text-xs text-white/30">
                  <p>{t.duration}</p>
                  <p className="mt-0.5">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
