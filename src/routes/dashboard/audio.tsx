import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Upload01Icon, MusicNote01Icon, PlayIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'
import { MOCK_AUDIO_LIBRARY } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/audio')({
  component: AudioPage,
})

function AudioPage() {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState('')

  const handleUpload = () => {
    setProcessing(true)
    setProgress(0)
    setResult('')
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setProcessing(false)
          setResult(
            '[0:00] Is this the real life, is this just fantasy\n' +
            '[0:08] Caught in a landslide, no escape from reality\n' +
            '[0:15] Open your eyes, look up to the skies and see\n' +
            '[0:22] I\'m just a poor boy, I need no sympathy\n' +
            '[0:30] Because I\'m easy come, easy go\n' +
            '[0:34] Little high, little low\n' +
            '[0:38] Any way the wind blows\n' +
            '[0:42] Doesn\'t really matter to me, to me'
          )
          return 100
        }
        return p + 2
      })
    }, 80)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Audio & Songs</h1>

      {/* Upload area */}
      <div
        className="btn-press flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-white/10 bg-[#161616] p-10 transition hover:border-white/20 cursor-pointer animate-scale-in"
        style={{ animationDelay: '50ms' }}
        onClick={!processing ? handleUpload : undefined}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition hover:scale-110">
          <HugeiconsIcon icon={Upload01Icon} size={28} className="text-white/40" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/60">
            {processing ? 'Processing...' : 'Click to upload audio file'}
          </p>
          <p className="mt-1 text-xs text-white/30">MP3, WAV, M4A, FLAC supported</p>
        </div>
      </div>

      {/* Progress bar */}
      {processing && (
        <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-white/60">Transcribing audio...</span>
            <span className="text-white/40">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-white/30 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="mb-4 flex items-center gap-2">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-green-400" />
            <h2 className="text-sm font-semibold text-white">Transcript Ready</h2>
          </div>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-white/50">
            {result}
          </pre>
        </div>
      )}

      {/* Library */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Library</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {MOCK_AUDIO_LIBRARY.map((audio, i) => (
            <div
              key={audio.id}
              className="card-hover group flex items-center gap-4 rounded-2xl bg-[#161616] p-4 ring-1 ring-white/5 transition hover:ring-white/10 animate-fade-up"
              style={{ animationDelay: `${200 + i * 60}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition group-hover:scale-110">
                <HugeiconsIcon icon={MusicNote01Icon} size={20} className="text-white/40" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{audio.title}</p>
                <p className="text-xs text-white/40">{audio.artist}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30">{audio.duration}</span>
                <button className="btn-press rounded-full bg-white/5 p-2 text-white/40 opacity-0 transition group-hover:opacity-100 hover:bg-white/10">
                  <HugeiconsIcon icon={PlayIcon} size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
