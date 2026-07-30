import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Delete01Icon } from '@hugeicons/core-free-icons'
import RecordButton from '../../components/dashboard/RecordButton'
import { useTranscriptions, useTranscription, useUploadTranscription, useDeleteTranscription, useAudioUrl, useAudioRef } from '../../lib/api-hooks'

export const Route = createFileRoute('/_dashboard/diary')({
  component: DiaryPage,
})

function DiaryPage() {
  const [recording, setRecording] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')

  const audioRef = useAudioRef()
  const upload = useUploadTranscription()
  const deleteMutation = useDeleteTranscription()
  const { data: active } = useTranscription(activeId)
  const { data: entries = [], isLoading } = useTranscriptions('diary')

  const handleRecordingComplete = (blob: Blob) => {
    setUploadError('')
    upload.mutate(
      {
        audio: blob,
        type: 'diary',
        diaryDate: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: (data) => {
          setActiveId(data.id)
          setRecording(false)
        },
        onError: (err) => setUploadError(err.message),
      },
    )
  }

  const isProcessing = active?.status === 'pending' || active?.status === 'processing'
  const isCompleted = active?.status === 'completed'
  const { data: audioBlobUrl } = useAudioUrl(isCompleted ? activeId : null)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between animate-fade-up">
        <h1 className="text-2xl font-semibold text-white">Voice Diary</h1>
        <button
          onClick={() => { setRecording(true); setActiveId(null) }}
          className="btn-press flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          New Entry
        </button>
      </div>

      {/* Record area */}
      {recording && !activeId && (
        <div className="rounded-2xl bg-[#161616] p-8 ring-1 ring-white/5 animate-scale-in">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-white/40">Speak your thoughts</p>
            <RecordButton onRecordingComplete={handleRecordingComplete} />
            {upload.isPending && <p className="text-xs text-white/40">Uploading...</p>}
            {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
          </div>
        </div>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <p className="text-sm text-white/40">Creating your diary entry...</p>
        </div>
      )}

      {/* Completed entry */}
      {isCompleted && active && (
        <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-scale-in">
          <h2 className="mb-3 text-sm font-semibold text-white">New Entry</h2>
          {audioBlobUrl && (
            <div className="mb-4">
              <audio ref={audioRef} src={audioBlobUrl} controls className="w-full h-10 rounded-lg" />
            </div>
          )}
          <p className="text-sm leading-relaxed text-white/60">
            {active.cleaned_transcript || active.original_transcript}
          </p>
          {active.summary && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/30">Journal</h3>
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

      {/* Past entries */}
      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="mb-4 text-lg font-semibold text-white">Past Entries</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl bg-[#161616] p-8 text-center ring-1 ring-white/5">
            <p className="text-sm text-white/40">No diary entries yet. Record your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="card-hover group rounded-2xl bg-[#161616] p-5 ring-1 ring-white/5 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${150 + i * 60}ms` }}
                onClick={() => setActiveId(activeId === entry.id ? null : entry.id)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">
                    {entry.diary_date || new Date(entry.created_at).toLocaleDateString()}
                  </h3>
                  <div className="flex items-center gap-2">
                    {entry.status !== 'completed' && (
                      <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-yellow-400/60">
                        {entry.status}
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); if (activeId === entry.id) setActiveId(null); deleteMutation.mutate(entry.id) }}
                      className="btn-press shrink-0 rounded-lg p-2 text-white/20 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/50">
                  {entry.summary || entry.cleaned_transcript?.slice(0, 200) || 'Processing...'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
