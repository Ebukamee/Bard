import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert02Icon, AnalyticsUpIcon, HashtagIcon, Delete01Icon } from '@hugeicons/core-free-icons'
import RecordButton from '../../components/dashboard/RecordButton'
import { useTranscriptions, useTranscription, useUploadTranscription, useDeleteTranscription, useAudioUrl, useAudioRef } from '../../lib/api-hooks'

export const Route = createFileRoute('/_dashboard/speaking')({
  component: SpeakingPage,
})

const DEFAULT_FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally', 'right', 'I mean']

function getFillerWords(): string[] {
  if (typeof window === 'undefined') return DEFAULT_FILLER_WORDS
  const stored = localStorage.getItem('bard_filler_words')
  return stored ? JSON.parse(stored) : DEFAULT_FILLER_WORDS
}

function parseHighlightedTranscript(text: string) {
  const parts: { text: string; isFiller: boolean }[] = []
  const regex = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isFiller: false })
    }
    parts.push({ text: match[1], isFiller: true })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isFiller: false })
  }
  return parts
}

function SpeakingPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [fillerWords, setFillerWords] = useState<string[]>(DEFAULT_FILLER_WORDS)

  useEffect(() => {
    setFillerWords(getFillerWords())
  }, [])

  const audioRef = useAudioRef()
  const upload = useUploadTranscription()
  const deleteMutation = useDeleteTranscription()
  const { data: active } = useTranscription(activeId)
  const { data: history = [], isLoading } = useTranscriptions('practice')

  const handleRecordingComplete = (blob: Blob) => {
    setUploadError('')
    upload.mutate(
      { audio: blob, type: 'practice', fillerWords },
      {
        onSuccess: (data) => setActiveId(data.id),
        onError: (err) => setUploadError(err.message),
      },
    )
  }

  const isProcessing = active?.status === 'pending' || active?.status === 'processing'
  const isCompleted = active?.status === 'completed'
  const { data: audioBlobUrl } = useAudioUrl(isCompleted ? activeId : null)

  // Parse filler word counts from completed result
  const fillerCounts: Record<string, number> = {}
  let totalFillers = 0
  if (isCompleted && active?.filler_word_counts) {
    try {
      Object.assign(fillerCounts, JSON.parse(active.filler_word_counts))
      totalFillers = Object.values(fillerCounts).reduce((sum, n) => sum + n, 0)
    } catch { /* ignore parse errors */ }
  }

  const parts = isCompleted && active?.cleaned_transcript
    ? parseHighlightedTranscript(active.cleaned_transcript)
    : []

  // Estimate WPM from transcript
  const wordCount = active?.original_transcript?.split(/\s+/).length ?? 0

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Public Speaking Practice</h1>

      {/* Record */}
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5 animate-scale-in" style={{ animationDelay: '50ms' }}>
        <p className="text-center text-sm text-white/40">
          Record your speech to analyze filler words
        </p>
        <RecordButton onRecordingComplete={handleRecordingComplete} />
        {upload.isPending && <p className="text-xs text-white/40">Uploading...</p>}
        {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
      </div>

      {/* Processing */}
      {isProcessing && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <p className="text-sm text-white/40">Analyzing your speech...</p>
        </div>
      )}

      {/* Analysis */}
      {isCompleted && active && (
        <>
          {/* Audio playback */}
          {audioBlobUrl && (
            <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
              <h2 className="mb-3 text-sm font-semibold text-white">Your Recording</h2>
              <audio ref={audioRef} src={audioBlobUrl} controls className="w-full h-10 rounded-lg" />
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in">
              <HugeiconsIcon icon={Alert02Icon} size={20} className="mx-auto mb-2 text-red-400/60" />
              <p className="text-2xl font-semibold text-white animate-glow-in">{totalFillers}</p>
              <p className="mt-1 text-xs text-white/40">Filler Words</p>
            </div>
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in" style={{ animationDelay: '60ms' }}>
              <HugeiconsIcon icon={HashtagIcon} size={20} className="mx-auto mb-2 text-white/30" />
              <p className="text-2xl font-semibold text-white animate-glow-in" style={{ animationDelay: '60ms' }}>{wordCount}</p>
              <p className="mt-1 text-xs text-white/40">Total Words</p>
            </div>
            <div className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 text-center animate-scale-in" style={{ animationDelay: '120ms' }}>
              <HugeiconsIcon icon={AnalyticsUpIcon} size={20} className="mx-auto mb-2 text-white/30" />
              <p className="text-2xl font-semibold text-white animate-glow-in" style={{ animationDelay: '120ms' }}>
                {wordCount > 0 ? Math.round(((wordCount - totalFillers) / wordCount) * 100) : 0}%
              </p>
              <p className="mt-1 text-xs text-white/40">Clean Speech</p>
            </div>
          </div>

          {/* Filler breakdown */}
          {Object.keys(fillerCounts).length > 0 && (
            <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <h2 className="mb-4 text-sm font-semibold text-white">Filler Word Breakdown</h2>
              <div className="space-y-3">
                {Object.entries(fillerCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([word, count], i) => {
                    const maxCount = Math.max(...Object.values(fillerCounts), 1)
                    return (
                      <div key={word} className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: `${250 + i * 40}ms` }}>
                        <span className="w-20 text-sm text-white/60">"{word}"</span>
                        <div className="flex-1">
                          <div className="h-2 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-red-400/40 transition-all duration-700"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-8 text-right text-sm font-medium text-white/40">{count}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Transcript with highlights */}
          {parts.length > 0 && (
            <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '350ms' }}>
              <h2 className="mb-4 text-sm font-semibold text-white">Transcript</h2>
              <p className="text-sm leading-relaxed text-white/50">
                {parts.map((part, i) =>
                  part.isFiller ? (
                    <span key={i} className="rounded bg-red-500/20 px-1 py-0.5 text-red-400 transition hover:bg-red-500/30">
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </p>
            </div>
          )}

          {/* AI Feedback */}
          {active.summary && (
            <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <h2 className="mb-4 text-sm font-semibold text-white">Coaching Feedback</h2>
              <p className="text-sm leading-relaxed text-white/50">{active.summary}</p>
            </div>
          )}
        </>
      )}

      {active?.status === 'failed' && (
        <div className="rounded-2xl bg-red-500/10 p-6 ring-1 ring-red-500/20">
          <p className="text-sm text-red-400">Processing failed. Please try again.</p>
        </div>
      )}

      {/* History */}
      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Past Sessions</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          </div>
        ) : history.length === 0 ? (
          <div className="rounded-2xl bg-[#161616] p-8 text-center ring-1 ring-white/5">
            <p className="text-sm text-white/40">No practice sessions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((session, i) => {
              let sessionFillers = 0
              try {
                if (session.filler_word_counts) {
                  sessionFillers = Object.values(JSON.parse(session.filler_word_counts) as Record<string, number>).reduce((s, n) => s + n, 0)
                }
              } catch { /* ignore */ }
              return (
                <div
                  key={session.id}
                  className="card-hover group rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up cursor-pointer"
                  style={{ animationDelay: `${150 + i * 60}ms` }}
                  onClick={() => setActiveId(activeId === session.id ? null : session.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {session.summary?.slice(0, 50) || 'Practice Session'}
                      </h3>
                      <p className="mt-1 text-xs text-white/40">
                        {sessionFillers} fillers
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/30">{new Date(session.created_at).toLocaleDateString()}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); if (activeId === session.id) setActiveId(null); deleteMutation.mutate(session.id) }}
                        className="btn-press shrink-0 rounded-lg p-2 text-white/20 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
