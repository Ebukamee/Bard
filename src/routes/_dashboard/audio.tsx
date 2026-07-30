import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useCallback } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Upload01Icon,
  MusicNote01Icon,
  CheckmarkCircle01Icon,
  PlayIcon,
  PauseIcon,
  Delete01Icon,
} from '@hugeicons/core-free-icons'
import { useTranscriptions, useTranscription, useUploadTranscription, useDeleteTranscription, useAudioUrl, useAudioRef } from '../../lib/api-hooks'
import { apiClient } from '../../lib/api-client'

export const Route = createFileRoute('/_dashboard/audio')({
  component: AudioPage,
})

function AudioPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const activeAudioRef = useAudioRef()
  const upload = useUploadTranscription()
  const deleteMutation = useDeleteTranscription()
  const { data: active } = useTranscription(activeId)
  const { data: library = [], isLoading } = useTranscriptions('transcription', 20)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    upload.mutate(
      { audio: file, type: 'transcription', label: 'song', filename: file.name },
      {
        onSuccess: (data) => setActiveId(data.id),
        onError: (err) => setUploadError(err.message),
      },
    )
    e.target.value = ''
  }

  const blobCache = useRef<Map<string, string>>(new Map())

  const handlePlay = useCallback(async (id: string) => {
    if (playingId === id) {
      audioRef.current?.pause()
      setPlayingId(null)
      return
    }
    if (!audioRef.current) return

    let url = blobCache.current.get(id)
    if (!url) {
      const res = await apiClient(`/transcriptions/${id}/audio`)
      if (!res.ok) return
      const blob = await res.blob()
      url = URL.createObjectURL(blob)
      blobCache.current.set(id, url)
    }
    audioRef.current.src = url
    const speed = localStorage.getItem('bard_playback_speed')
    audioRef.current.playbackRate = speed ? Number(speed) : 1
    audioRef.current.play()
    setPlayingId(id)
  }, [playingId])

  const handleDelete = (id: string) => {
    if (playingId === id) {
      audioRef.current?.pause()
      setPlayingId(null)
    }
    if (activeId === id) setActiveId(null)
    deleteMutation.mutate(id)
  }

  const isProcessing = active?.status === 'pending' || active?.status === 'processing'
  const isCompleted = active?.status === 'completed'
  const { data: audioBlobUrl } = useAudioUrl(isCompleted ? activeId : null)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Audio & Songs</h1>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingId(null)}
        onPause={() => setPlayingId(null)}
        className="hidden"
      />

      {/* Upload area */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div
        className="btn-press flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-white/10 bg-[#161616] p-10 transition hover:border-white/20 cursor-pointer animate-scale-in"
        style={{ animationDelay: '50ms' }}
        onClick={() => !upload.isPending && fileInputRef.current?.click()}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition hover:scale-110">
          <HugeiconsIcon icon={Upload01Icon} size={28} className="text-white/40" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/60">
            {upload.isPending ? 'Uploading...' : 'Click to upload audio file'}
          </p>
          <p className="mt-1 text-xs text-white/30">MP3, WAV, M4A, FLAC supported</p>
        </div>
      </div>

      {uploadError && (
        <p className="text-center text-xs text-red-400">{uploadError}</p>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <p className="text-sm text-white/40">Transcribing audio...</p>
        </div>
      )}

      {/* Result */}
      {isCompleted && active && (
        <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="mb-4 flex items-center gap-2">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-green-400" />
            <h2 className="text-sm font-semibold text-white">Transcript Ready</h2>
          </div>

          {audioBlobUrl && (
            <div className="mb-4">
              <audio ref={activeAudioRef} src={audioBlobUrl} controls className="w-full h-10 rounded-lg" />
            </div>
          )}

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/50">
            {active.cleaned_transcript || active.original_transcript}
          </p>
          {active.summary && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/30">Summary</h3>
              <p className="text-sm leading-relaxed text-white/50">{active.summary}</p>
            </div>
          )}
        </div>
      )}

      {active?.status === 'failed' && (
        <div className="rounded-2xl bg-red-500/10 p-6 ring-1 ring-red-500/20">
          <p className="text-sm text-red-400">Processing failed. Please try again.</p>
        </div>
      )}

      {/* Library */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Library</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          </div>
        ) : library.length === 0 ? (
          <div className="rounded-2xl bg-[#161616] p-8 text-center ring-1 ring-white/5">
            <p className="text-sm text-white/40">No audio files yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {library.map((audio, i) => {
              const isPlaying = playingId === audio.id
              return (
                <div
                  key={audio.id}
                  className="card-hover group flex items-center gap-4 rounded-2xl bg-[#161616] p-4 ring-1 ring-white/5 transition hover:ring-white/10 animate-fade-up"
                  style={{ animationDelay: `${200 + i * 60}ms` }}
                >
                  {audio.status === 'completed' ? (
                    <button
                      onClick={() => handlePlay(audio.id)}
                      className="btn-press flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 transition hover:bg-white/10 hover:scale-110"
                    >
                      <HugeiconsIcon
                        icon={isPlaying ? PauseIcon : PlayIcon}
                        size={20}
                        className={isPlaying ? 'text-white' : 'text-white/40'}
                      />
                    </button>
                  ) : (
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 cursor-pointer transition group-hover:scale-110"
                      onClick={() => setActiveId(activeId === audio.id ? null : audio.id)}
                    >
                      <HugeiconsIcon icon={MusicNote01Icon} size={20} className="text-white/40" />
                    </div>
                  )}
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => setActiveId(activeId === audio.id ? null : audio.id)}
                  >
                    <p className="text-sm font-medium text-white truncate">{audio.audio_filename || 'Untitled'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {audio.label && (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/30">
                          {audio.label}
                        </span>
                      )}
                      <span className="text-xs text-white/30">{new Date(audio.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {audio.status !== 'completed' ? (
                    <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-yellow-400/60">
                      {audio.status}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDelete(audio.id)}
                      className="btn-press shrink-0 rounded-lg p-2 text-white/20 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={16} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
