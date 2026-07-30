import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { VolumeHighIcon, Alert02Icon, Cancel01Icon, Add01Icon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export const Route = createFileRoute('/_dashboard/settings')({
  component: SettingsPage,
})

const DEFAULT_FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally', 'right', 'I mean']

function SettingsPage() {
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [fillerWords, setFillerWords] = useState<string[]>(DEFAULT_FILLER_WORDS)
  const [newWord, setNewWord] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('bard_filler_words')
    if (stored) {
      try {
        setFillerWords(JSON.parse(stored))
      } catch { /* ignore */ }
    }
    const speed = localStorage.getItem('bard_playback_speed')
    if (speed) setPlaybackSpeed(Number(speed))
  }, [])

  // Persist filler words
  const updateFillerWords = (words: string[]) => {
    setFillerWords(words)
    localStorage.setItem('bard_filler_words', JSON.stringify(words))
  }

  const addWord = () => {
    const word = newWord.trim().toLowerCase()
    if (word && !fillerWords.includes(word)) {
      updateFillerWords([...fillerWords, word])
      setNewWord('')
    }
  }

  const removeWord = (word: string) => {
    updateFillerWords(fillerWords.filter((w) => w !== word))
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    localStorage.setItem('bard_playback_speed', String(speed))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Settings</h1>

      {/* Playback */}
      <div className="animate-fade-up" style={{ animationDelay: '50ms' }}>
        <SettingsSection icon={VolumeHighIcon} title="Playback">
          <SettingsRow label={`Playback speed (${playbackSpeed}x)`}>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              value={playbackSpeed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              className="w-32 accent-white"
            />
          </SettingsRow>
        </SettingsSection>
      </div>

      {/* Filler Words */}
      <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <SettingsSection icon={Alert02Icon} title="Filler Words to Track">
          <div className="px-6 py-5">
            <p className="mb-4 text-xs text-white/40">
              These words will be highlighted during public speaking practice.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {fillerWords.map((word) => (
                <span
                  key={word}
                  className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/15"
                >
                  {word}
                  <button
                    onClick={() => removeWord(word)}
                    className="btn-press rounded-full p-0.5 transition hover:bg-red-500/20"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addWord()}
                placeholder="Add a word..."
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/20 outline-none transition focus:border-white/25"
              />
              <button
                onClick={addWord}
                className="btn-press flex items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10"
              >
                <HugeiconsIcon icon={Add01Icon} size={14} />
                Add
              </button>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  )
}

function SettingsSection({
  icon,
  title,
  children,
}: {
  icon: IconSvgElement
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="card-hover rounded-2xl bg-[#161616] ring-1 ring-white/5">
      <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
        <HugeiconsIcon icon={icon} size={18} className="text-white/40" />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <span className="text-sm text-white/60">{label}</span>
      {children}
    </div>
  )
}
