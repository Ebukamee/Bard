import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'
import RecordButton from '../../components/dashboard/RecordButton'
import { MOCK_DIARY_ENTRIES, SAMPLE_TRANSCRIPT_TEXT } from '../../data/mock-dashboard'
import type { DiaryEntry } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/diary')({
  component: DiaryPage,
})

function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>(MOCK_DIARY_ENTRIES)
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const idx = useRef(0)

  // Typewriter after recording
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
    }, 120)
    return () => clearInterval(interval)
  }, [isTyping])

  const handleRecordingComplete = () => {
    setRecording(false)
    setIsTyping(true)
  }

  const handleSave = () => {
    if (!transcript) return
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      title: 'New entry',
      content: transcript,
      date: new Date().toISOString().split('T')[0],
      mood: 'Thoughtful',
      duration: '1:30',
    }
    setEntries([newEntry, ...entries])
    setTranscript('')
    setRecording(false)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between animate-fade-up">
        <h1 className="text-2xl font-semibold text-white">Voice Diary</h1>
        <button
          onClick={() => setRecording(true)}
          className="btn-press flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          New Entry
        </button>
      </div>

      {/* Record / new entry area */}
      {(recording || transcript) && (
        <div className="rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5 animate-scale-in">
          {!transcript && !isTyping && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-white/40">Speak your thoughts</p>
              <RecordButton onRecordingComplete={handleRecordingComplete} />
            </div>
          )}

          {(transcript || isTyping) && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-white">New Entry</h2>
              <p className="mb-4 text-sm leading-relaxed text-white/60">
                {transcript}
                {isTyping && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-white/60" />
                )}
              </p>
              {!isTyping && transcript && (
                <div className="flex gap-3 animate-fade-up">
                  <button
                    onClick={handleSave}
                    className="btn-press rounded-lg bg-white px-5 py-2 text-sm font-medium text-[#040404] transition hover:bg-white/90"
                  >
                    Save Entry
                  </button>
                  <button
                    onClick={() => { setTranscript(''); setRecording(false) }}
                    className="btn-press rounded-lg bg-white/5 px-5 py-2 text-sm text-white/60 transition hover:bg-white/10"
                  >
                    Discard
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Past entries */}
      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Past Entries</h2>
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="card-hover rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up"
              style={{ animationDelay: `${150 + i * 60}ms` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-medium text-white">{entry.title}</h3>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                    {entry.mood}
                  </span>
                </div>
                <div className="text-xs text-white/30">
                  <span>{entry.duration}</span>
                  <span className="ml-3">{entry.date}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/50">{entry.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
