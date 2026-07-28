import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import StarField from '../components/StarField'
import { useInView } from '../hooks/useInView'

export const Route = createFileRoute('/about')({
  component: About,
})

const VALUES = [
  {
    icon: 'shield',
    title: 'Privacy First',
    desc: 'Your voice data is encrypted end-to-end. We process in real-time and never store recordings after transcription.',
  },
  {
    icon: 'zap',
    title: 'Blazing Accuracy',
    desc: '99.2% accuracy across 50+ languages. Our models are trained on diverse accents, dialects, and speaking styles.',
  },
  {
    icon: 'heart',
    title: 'Dead Simple',
    desc: 'No complex setup, no learning curve. Hit record and get your transcript. That\'s it.',
  },
  {
    icon: 'globe',
    title: 'Built for Everyone',
    desc: 'From solo creators to enterprise teams — Bard scales with you. One tool, every workflow.',
  },
]

function About() {
  const heroRef = useInView()
  const missionRef = useInView()
  const valuesRef = useInView()
  const ctaRef = useInView({ threshold: 0.3 })

  return (
    <main className="relative overflow-x-clip">
      <StarField count={60} />

      {/* ━━━ HERO ━━━ */}
      <section
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative px-5 pb-20 pt-32 ${heroRef.inView ? 'is-visible' : ''}`}
      >
        <div className="cont text-center">
          <p className="reveal-up section-label mb-3">About</p>
          <h1
            className="reveal-up text-gradient-animated mx-auto mb-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            We believe your voice deserves better
          </h1>
          <p
            className="reveal-up mx-auto max-w-xl text-base leading-relaxed text-white/60"
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            Bard was born from a simple frustration: transcription tools that are
            slow, inaccurate, or invasive. We set out to build the opposite.
          </p>
        </div>
      </section>

      {/* ━━━ MISSION ━━━ */}
      <section
        ref={missionRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-20 ${missionRef.inView ? 'is-visible' : ''}`}
      >
        <div className="cont flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="reveal-left flex-1">
            <p className="section-label mb-3">Our Mission</p>
            <h2 className="text-gradient-animated mb-5 text-3xl font-semibold md:text-4xl">
              Make voice the fastest way to write
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-white/60">
              Every day, millions of thoughts are lost because typing can't keep up
              with thinking. Meetings go unrecorded. Lectures fade from memory.
              Ideas vanish before they reach the page.
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              Bard changes that. We've built a transcription engine that's fast enough
              to feel instant, accurate enough to trust, and private enough to use
              for anything. Your words, captured perfectly — the moment you speak them.
            </p>
          </div>
          <div className="reveal-right flex-1">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '99.2%', label: 'Accuracy' },
                { value: '50+', label: 'Languages' },
                { value: '<1s', label: 'Latency' },
                { value: '0', label: 'Data Stored' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-[#161616] p-6 text-center ring-1 ring-white/5"
                >
                  <p className="mb-1 text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="m-0 text-xs font-medium uppercase tracking-wider text-white/30">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ VALUES ━━━ */}
      <section
        ref={valuesRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-20 ${valuesRef.inView ? 'is-visible' : ''}`}
      >
        <div className="cont">
          <p className="reveal-up section-label mb-3 text-center">What We Stand For</p>
          <h2
            className="reveal-up text-gradient-animated mx-auto mb-14 max-w-2xl text-center text-3xl font-semibold md:text-4xl"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            Built on principles, not compromises
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="reveal-flip rounded-2xl bg-[#161616] p-7 ring-1 ring-white/5 sm:p-8"
                style={{ '--delay': `${i * 150}ms` } as React.CSSProperties}
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <ValueIcon name={v.icon} />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">{v.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-white/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section
        ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-20 ${ctaRef.inView ? 'is-visible' : ''}`}
      >
        <div className="cont">
          <div className="reveal-scale relative overflow-hidden rounded-3xl bg-[#161616] px-8 py-16 text-center ring-1 ring-white/5 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
            <h2 className="reveal-up text-gradient-animated relative mb-4 text-3xl font-semibold sm:text-5xl">
              Ready to try Bard?
            </h2>
            <p
              className="reveal-up relative mx-auto mb-8 max-w-lg text-sm text-white/60"
              style={{ '--delay': '150ms' } as React.CSSProperties}
            >
              Join thousands who've made their voice their most powerful tool.
            </p>
            <div
              className="reveal-up relative"
              style={{ '--delay': '300ms' } as React.CSSProperties}
            >
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium tracking-wider text-white no-underline backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              >
                Get started free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ValueIcon({ name }: { name: string }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'white',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'shield':
      return <svg {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
    case 'zap':
      return <svg {...props}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    case 'heart':
      return <svg {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    default:
      return null
  }
}
