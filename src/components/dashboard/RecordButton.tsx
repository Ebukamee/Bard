import { useState, useEffect, useRef } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Mic01Icon, StopIcon, Loading03Icon } from '@hugeicons/core-free-icons'

interface RecordButtonProps {
  onRecordingComplete?: (duration: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function RecordButton({ onRecordingComplete, size = 'lg' }: RecordButtonProps) {
  const [state, setState] = useState<'idle' | 'recording' | 'processing'>('idle')
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (state === 'recording') {
      setSeconds(0)
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [state])

  const handleClick = () => {
    if (state === 'idle') {
      setState('recording')
    } else if (state === 'recording') {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setState('processing')
      setTimeout(() => {
        setState('idle')
        onRecordingComplete?.(seconds)
      }, 1500)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const dims = size === 'lg' ? 'h-20 w-20' : size === 'md' ? 'h-14 w-14' : 'h-10 w-10'
  const iconSize = size === 'lg' ? 32 : size === 'md' ? 22 : 16

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
        className={`${dims} btn-press flex items-center justify-center rounded-full transition-all ${
          state === 'recording'
            ? 'recording-pulse bg-red-500 text-white'
            : state === 'processing'
              ? 'bg-white/10 text-white/60'
              : 'bg-white/10 text-white hover:bg-white/15'
        }`}
      >
        {state === 'idle' && <HugeiconsIcon icon={Mic01Icon} size={iconSize} />}
        {state === 'recording' && <HugeiconsIcon icon={StopIcon} size={iconSize} />}
        {state === 'processing' && <HugeiconsIcon icon={Loading03Icon} size={iconSize} className="animate-spin" />}
      </button>
      {state === 'recording' && (
        <span className="text-sm font-medium text-red-400">{formatTime(seconds)}</span>
      )}
      {state === 'processing' && (
        <span className="text-xs text-white/40">Processing...</span>
      )}
      {state === 'idle' && (
        <span className="text-xs text-white/30">Tap to record</span>
      )}
    </div>
  )
}
