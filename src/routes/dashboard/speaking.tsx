import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert02Icon, AnalyticsUpIcon, Clock01Icon, HashtagIcon } from '@hugeicons/core-free-icons'
import RecordButton from '../../components/dashboard/RecordButton'
import { MOCK_SPEAKING_SESSIONS, FILLER_WORDS } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/speaking')({
  component: SpeakingPage,
})

const MOCK_RESULT = {
  transcript:
    'Good morning everyone. So, um, today I want to talk about, like, our vision for the next generation of voice technology. You know, we have been working on this for, um, quite some time and I think, basically, the results speak for themselves. Actually, let me show you some examples of what we have built. I mean, the accuracy is, like, really impressive and our users, um, love it.',
  score: 68,
  wpm: 138,
  duration: '1:45',
  fillerWords: [
    { word: 'um', count: 3 },
    { word: 'like', count: 2 },
    { word: 'you know', count: 1 },
    { word: 'so', count: 1 },
    { word: 'basically', count: 1 },
    { word: 'actually', count: 1 },
    { word: 'I mean', count: 1 },
  ],
}

function highlightFillers(text: string) {
  const sorted = [...FILLER_WORDS].sort((a, b) => b.length - a.length)
  const parts: { text: string; isFiller: boolean }[] = []

  let remaining = text
  while (remaining.length > 0) {
    let earliest = -1
    let matchedWord = ''
    for (const word of sorted) {
      const idx = remaining.toLowerCase().indexOf(word.toLowerCase())
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx
        matchedWord = word
      }
    }
    if (earliest === -1) {
      parts.push({ text: remaining, isFiller: false })
      break
    }
    if (earliest > 0) {
      parts.push({ text: remaining.slice(0, earliest), isFiller: false })
    }
    parts.push({ text: remaining.slice(earliest, earliest + matchedWord.length), isFiller: true })
    remaining = remaining.slice(earliest + matchedWord.length)
  }
  return parts
}

function SpeakingPage() {
  const [showResult, setShowResult] = useState(false)

  const handleRecordingComplete = () => {
    setShowResult(true)
  }

  const totalFillers = showResult
    ? MOCK_RESULT.fillerWords.reduce((sum, f) => sum + f.count, 0)
    : 0

  const parts = showResult ? highlightFillers(MOCK_RESULT.transcript) : []

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Public Speaking Practice</h1>

      {/* Record */}
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5 animate-scale-in" style={{ animationDelay: '50ms' }}>
        <p className="text-center text-sm text-white/40">
          Record your speech to analyze filler words
        </p>
        <RecordButton onRecordingComplete={handleRecordingComplete} />
      </div>

      {/* Analysis */}
      {showResult && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in" style={{ animationDelay: '0ms' }}>
              <HugeiconsIcon icon={AnalyticsUpIcon} size={20} className="mx-auto mb-2 text-white/30" />
              <p className="text-2xl font-semibold text-white animate-glow-in">{MOCK_RESULT.score}</p>
              <p className="mt-1 text-xs text-white/40">Score / 100</p>
            </div>
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in" style={{ animationDelay: '60ms' }}>
              <HugeiconsIcon icon={Alert02Icon} size={20} className="mx-auto mb-2 text-red-400/60" />
              <p className="text-2xl font-semibold text-white animate-glow-in" style={{ animationDelay: '60ms' }}>{totalFillers}</p>
              <p className="mt-1 text-xs text-white/40">Filler Words</p>
            </div>
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in" style={{ animationDelay: '120ms' }}>
              <HugeiconsIcon icon={HashtagIcon} size={20} className="mx-auto mb-2 text-white/30" />
              <p className="text-2xl font-semibold text-white animate-glow-in" style={{ animationDelay: '120ms' }}>{MOCK_RESULT.wpm}</p>
              <p className="mt-1 text-xs text-white/40">Words / Min</p>
            </div>
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in" style={{ animationDelay: '180ms' }}>
              <HugeiconsIcon icon={Clock01Icon} size={20} className="mx-auto mb-2 text-white/30" />
              <p className="text-2xl font-semibold text-white animate-glow-in" style={{ animationDelay: '180ms' }}>{MOCK_RESULT.duration}</p>
              <p className="mt-1 text-xs text-white/40">Duration</p>
            </div>
          </div>

          {/* Filler breakdown */}
          <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <h2 className="mb-4 text-sm font-semibold text-white">Filler Word Breakdown</h2>
            <div className="space-y-3">
              {MOCK_RESULT.fillerWords.map((f, i) => (
                <div key={f.word} className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: `${250 + i * 40}ms` }}>
                  <span className="w-20 text-sm text-white/60">"{f.word}"</span>
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-red-400/40 transition-all duration-700"
                        style={{ width: `${(f.count / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right text-sm font-medium text-white/40">
                    {f.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transcript with highlights */}
          <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '350ms' }}>
            <h2 className="mb-4 text-sm font-semibold text-white">Transcript</h2>
            <p className="text-sm leading-relaxed text-white/50">
              {parts.map((part, i) =>
                part.isFiller ? (
                  <span
                    key={i}
                    className="rounded bg-red-500/20 px-1 py-0.5 text-red-400 transition hover:bg-red-500/30"
                  >
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </p>
          </div>
        </>
      )}

      {/* History */}
      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Past Sessions</h2>
        <div className="space-y-3">
          {MOCK_SPEAKING_SESSIONS.map((session, i) => {
            const total = session.fillerWords.reduce((s, f) => s + f.count, 0)
            return (
              <div
                key={session.id}
                className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up"
                style={{ animationDelay: `${150 + i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-white">{session.title}</h3>
                    <p className="mt-1 text-xs text-white/40">
                      Score: {session.score}/100 &middot; {total} fillers &middot; {session.wpm} wpm
                    </p>
                  </div>
                  <div className="text-right text-xs text-white/30">
                    <p>{session.duration}</p>
                    <p className="mt-0.5">{session.date}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
