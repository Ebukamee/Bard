import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Copy01Icon, Download01Icon, CheckIcon, Delete01Icon } from '@hugeicons/core-free-icons'
import RecordButton from '../../components/dashboard/RecordButton'
import { useTranscriptions, useTranscription, useUploadTranscription, useDeleteTranscription, useAudioUrl, useAudioRef } from '../../lib/api-hooks'

export const Route = createFileRoute('/_dashboard/transcription')({
  component: TranscriptionPage,
})

function TranscriptionPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const audioRef = useAudioRef()
  const upload = useUploadTranscription()
  const deleteMutation = useDeleteTranscription()
  const { data: active } = useTranscription(activeId)
  const { data: recent = [], isLoading: loadingRecent } = useTranscriptions('transcription')

  const handleRecordingComplete = (blob: Blob) => {
    setUploadError('')
    upload.mutate(
      { audio: blob, type: 'transcription' },
      {
        onSuccess: (data) => setActiveId(data.id),
        onError: (err) => setUploadError(err.message),
      },
    )
  }

  const transcript = active?.cleaned_transcript || active?.original_transcript || ''
  const isProcessing = active?.status === 'pending' || active?.status === 'processing'
  const isCompleted = active?.status === 'completed'
  const { data: audioBlobUrl } = useAudioUrl(isCompleted ? activeId : null)

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Transcription</h1>

      {/* Record section */}
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5 animate-scale-in" style={{ animationDelay: '50ms' }}>
        <p className="text-sm text-white/40">Record audio to transcribe</p>
        <RecordButton onRecordingComplete={handleRecordingComplete} />
        {upload.isPending && <p className="text-xs text-white/40">Uploading...</p>}
        {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
      </div>

      {/* Processing */}
      {isProcessing && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <p className="text-sm text-white/40">Transcribing your audio...</p>
        </div>
      )}

      {/* Transcript output */}
      {isCompleted && transcript && (
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
              <button
                onClick={() => {
                  const blob = new Blob([transcript], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'transcript.txt'
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="btn-press flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
              >
                <HugeiconsIcon icon={Download01Icon} size={14} />
                Download
              </button>
            </div>
          </div>
          {audioBlobUrl && (
            <div className="mb-4">
              <audio ref={audioRef} src={audioBlobUrl} controls className="w-full h-10 rounded-lg" />
            </div>
          )}
          <p className="text-sm leading-relaxed text-white/60">{transcript}</p>
          {active?.summary && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/30">Summary</h3>
              <p className="text-sm leading-relaxed text-white/50">{active.summary}</p>
            </div>
          )}
        </div>
      )}

      {active?.status === 'failed' && (
        <div className="rounded-2xl bg-red-500/10 p-6 ring-1 ring-red-500/20 animate-scale-in">
          <p className="text-sm text-red-400">Processing failed. Please try again.</p>
        </div>
      )}

      {/* Recent */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Transcriptions</h2>
        {loadingRecent ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          </div>
        ) : recent.length === 0 ? (
          <div className="rounded-2xl bg-[#161616] p-8 text-center ring-1 ring-white/5">
            <p className="text-sm text-white/40">No transcriptions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((t, i) => (
              <div
                key={t.id}
                className="card-hover group rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${200 + i * 60}ms` }}
                onClick={() => setActiveId(activeId === t.id ? null : t.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-white">
                      {t.summary?.slice(0, 60) || t.audio_filename || 'Untitled'}
                    </h3>
                    <p className="mt-1 truncate text-xs text-white/40">
                      {t.cleaned_transcript?.slice(0, 100) || 'Processing...'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/30">{new Date(t.created_at).toLocaleDateString()}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (activeId === t.id) setActiveId(null); deleteMutation.mutate(t.id) }}
                      className="btn-press shrink-0 rounded-lg p-2 text-white/20 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={16} />
                    </button>
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
