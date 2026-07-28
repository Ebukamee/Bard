import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Copy01Icon, Download01Icon, CheckIcon } from '@hugeicons/core-free-icons'
import RecordButton from '../../components/dashboard/RecordButton'
import { SAMPLE_TRANSCRIPT_TEXT, MOCK_TRANSCRIPTIONS } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/transcription')({
  component: TranscriptionPage,
})

function TranscriptionPage() {
  const [transcript, setTranscript] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copied, setCopied] = useState(false)
  const idx = useRef(0)

  // Typewriter simulation after recording completes
  useEffect(() => {
    if (!isTyping) return
    idx.current = 0
    setTranscript('')
    const words = SAMPLE_TRANSCRIPT_TEXT.split(' ')
    const interval = setInterval(() => {
      idx.current++
      if (idx.current > words.length) {
        clearInterval(interval)
        setIsTyping(false)
        return
      }
      setTranscript(words.slice(0, idx.current).join(' '))
    }, 150)
    return () => clearInterval(interval)
  }, [isTyping])

  const handleRecordingComplete = () => {
    setIsTyping(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const recentTranscriptions = MOCK_TRANSCRIPTIONS.filter((t) => t.type === 'transcription')

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Transcription</h1>

      {/* Record section */}
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5 animate-scale-in" style={{ animationDelay: '50ms' }}>
        <p className="text-sm text-white/40">Record audio to transcribe</p>
        <RecordButton onRecordingComplete={handleRecordingComplete} />
      </div>

      {/* Transcript output */}
      {transcript && (
        <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Transcript</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="btn-press flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
              >
                {copied ? <HugeiconsIcon icon={CheckIcon} size={14} /> : <HugeiconsIcon icon={Copy01Icon} size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn-press flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10">
                <HugeiconsIcon icon={Download01Icon} size={14} />
                Download
              </button>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {transcript}
            {isTyping && (
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-white/60" />
            )}
          </p>
        </div>
      )}

      {/* Recent */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Transcriptions</h2>
        <div className="space-y-3">
          {recentTranscriptions.map((t, i) => (
            <div
              key={t.id}
              className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up"
              style={{ animationDelay: `${200 + i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-white">{t.title}</h3>
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
