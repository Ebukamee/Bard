import { useMemo } from 'react'

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function StarField({ count = 120 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = i + 1
      const x = seededRandom(seed * 1) * 100
      const y = seededRandom(seed * 2) * 100
      const size = seededRandom(seed * 3) * 2 + 0.5
      const delay = seededRandom(seed * 4) * 6
      const duration = seededRandom(seed * 5) * 4 + 3
      const bright = seededRandom(seed * 6) > 0.85
      return { x, y, size, delay, duration, bright }
    })
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: '#ffffff',
            animation: `${star.bright ? 'twinkle-bright' : 'twinkle'} ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
