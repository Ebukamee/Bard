import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { apiClient } from './api-client'

// ── Types ──

export interface Transcription {
  id: string
  user_id: string
  audio_filename: string
  audio_url?: string
  label?: string
  type: 'transcription' | 'practice' | 'diary'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  original_transcript?: string
  cleaned_transcript?: string
  summary?: string
  filler_words?: string
  filler_word_counts?: string // JSON string, e.g. '{"um": 3, "like": 7}'
  diary_date?: string
  processing_ended_at?: string
  created_at: string
  updated_at: string
}

interface TranscriptionListResponse {
  transcriptions: Transcription[]
  limit: number
  offset: number
}

// ── Queries ──

export function useTranscriptions(type?: string, limit = 20, offset = 0) {
  const params = new URLSearchParams()
  if (type) params.set('type', type)
  params.set('limit', String(limit))
  params.set('offset', String(offset))

  return useQuery({
    queryKey: ['transcriptions', { type, limit, offset }],
    queryFn: async () => {
      const res = await apiClient(`/transcriptions?${params}`)
      if (!res.ok) throw new Error('Failed to fetch transcriptions')
      const data: TranscriptionListResponse = await res.json()
      return data.transcriptions
    },
  })
}

export function useTranscription(id: string | null) {
  return useQuery({
    queryKey: ['transcription', id],
    queryFn: async () => {
      const res = await apiClient(`/transcriptions/${id}`)
      if (!res.ok) throw new Error('Failed to fetch transcription')
      return res.json() as Promise<Transcription>
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      return status === 'pending' || status === 'processing' ? 2000 : false
    },
  })
}

export function useAudioUrl(id: string | null) {
  return useQuery({
    queryKey: ['audio-url', id],
    queryFn: async () => {
      const res = await apiClient(`/transcriptions/${id}/audio`)
      if (!res.ok) throw new Error('Failed to fetch audio')
      const blob = await res.blob()
      return URL.createObjectURL(blob)
    },
    enabled: !!id,
    staleTime: Infinity,
  })
}

// ── Mutations ──

export function useUploadTranscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: {
      audio: Blob
      type: 'transcription' | 'practice' | 'diary'
      label?: string
      fillerWords?: string[]
      diaryDate?: string
      filename?: string
    }) => {
      const formData = new FormData()
      formData.append('audio', params.audio, params.filename || 'recording.webm')
      formData.append('type', params.type)
      if (params.label) {
        formData.append('label', params.label)
      }
      if (params.fillerWords?.length) {
        formData.append('filler_words', params.fillerWords.join(','))
      }
      if (params.diaryDate) {
        formData.append('diary_date', params.diaryDate)
      }

      const res = await apiClient('/transcriptions/upload', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error(err.error || 'Upload failed')
      }
      return res.json() as Promise<Transcription>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] })
    },
  })
}

export function useDeleteTranscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient(`/transcriptions/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transcriptions'] })
    },
  })
}

// ── Playback Speed ──

function getPlaybackSpeed(): number {
  if (typeof window === 'undefined') return 1
  const stored = localStorage.getItem('bard_playback_speed')
  return stored ? Number(stored) : 1
}

export function useAudioRef() {
  return useCallback((el: HTMLAudioElement | null) => {
    if (el) el.playbackRate = getPlaybackSpeed()
  }, [])
}
