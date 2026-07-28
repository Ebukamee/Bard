import { useState, useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import StarField from '../components/StarField'
import FloatingInstruments from '../components/FloatingInstruments'
import { useInView } from '../hooks/useInView'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const aboutRef = useInView()
  const useCasesRef = useInView()
  const featuresRef = useInView()

  const faqRef = useInView()
  const ctaRef = useInView({ threshold: 0.3 })

  return (
    <main className="relative overflow-x-clip">
      {/* Morphing ambient background */}
      <div className="bg-morph-layer" aria-hidden="true" />
      <ParallaxBlobs />
      <StarField count={100} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen px-5">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-20 left-0 h-60 w-60 rounded-full bg-white/10 blur-3xl md:h-[400px] md:w-[400px]" />

        <div className="cont flex min-h-[calc(100vh-120px)] flex-col items-center justify-center pt-10 text-center">
          <h1
            className="rise-in text-gradient-animated mb-5 max-w-4xl text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontWeight: 600 }}
          >
            Turn your voice into text, instantly
          </h1>

          <p
            className="rise-in mx-auto mb-10 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base"
            style={{ animationDelay: '150ms' }}
          >
            Speak naturally and watch your words appear as clean, accurate text.
            Bard captures every word so you don't have to type a single one.
          </p>

          {/* CTA */}
          <div className="rise-in group/cta mb-16" style={{ animationDelay: '300ms' }}>
            <a
              href="#"
              className="relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium tracking-wider text-white no-underline backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              <span className="relative z-10 inline-flex">
                {'Check it out'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-300 group-hover/cta:animate-[dance_0.5s_ease-in-out_forwards]"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <svg className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 group-hover/cta:translate-x-full" />
            </a>
          </div>

          {/* Waveform */}
          <div
            className="rise-in relative w-full max-w-2xl overflow-visible"
            style={{ animationDelay: '450ms' }}
          >
            <FloatingInstruments />
            <div className="waveform-wobble relative overflow-hidden rounded-2xl ring-1 ring-white/5 bg-[#161616] px-6 py-5 sm:px-10 sm:py-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <button
                  type="button"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 sm:h-12 sm:w-12"
                  aria-label="Play voice note"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none" className="ml-0.5 sm:h-5 sm:w-5">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                </button>
                <div className="flex h-20 flex-1 items-end gap-[3px] sm:h-24 sm:gap-1">
                  {WAVEFORM_BARS.map((height, i) => (
                    <div
                      key={i}
                      className="waveform-bar w-[3px] rounded-full bg-white sm:w-1"
                      style={{
                        height: `${height}%`,
                        opacity: i < PLAYHEAD_INDEX ? 0.7 : 0.15,
                        animationDelay: `${i * 60}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between pl-14 text-xs text-white/30 sm:pl-17">
                <span>1:24</span>
                <span>3:47</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT / WHAT IS BARD ━━━ */}
      <section
        ref={aboutRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-28 ${aboutRef.inView ? 'is-visible' : ''}`}
      >
        <div className="cont">
          <p className="reveal-up section-label mb-3 text-center">What is Bard</p>
          <h2
            className="reveal-up text-gradient-animated mx-auto mb-6 max-w-2xl text-center text-3xl font-semibold md:text-4xl lg:text-5xl"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            Voice transcription that just works
          </h2>
          <p
            className="reveal-up mx-auto mb-16 max-w-lg text-center text-sm leading-relaxed text-white/60"
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            No complex setup, no learning curve. Hit record, speak, and get
            your transcript. Built for speed, accuracy, and simplicity.
          </p>

          {/* Video/demo placeholder */}
          <div
            className="reveal-zoom mx-auto max-w-3xl overflow-hidden rounded-2xl ring-1 ring-white/5 bg-[#161616]"
            style={{ '--delay': '350ms' } as React.CSSProperties}
          >
            <div className="flex aspect-video items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                </div>
                <span className="text-xs text-white/30">Watch demo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ USE CASES ━━━ */}
      <section
        id="who-its-for"
        ref={useCasesRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-28 ${useCasesRef.inView ? 'is-visible' : ''}`}
      >
        {/* Decorative headphones — right side */}
        <svg className="pointer-events-none absolute -right-6 top-1/2 z-20 -translate-y-1/2 svg-breathe sm:-right-4 lg:right-[2%]" width="320" height="320" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Headband */}
          <path d="M30 110 C30 50, 60 15, 100 15 C140 15, 170 50, 170 110" strokeWidth="4" />
          <path d="M75 20 C85 12, 115 12, 125 20" strokeWidth="2" />
          <rect x="18" y="100" width="35" height="55" rx="12" />
          <rect x="22" y="105" width="27" height="45" rx="9" />
          <circle cx="35" cy="127" r="8" strokeWidth="1" />
          <path d="M30 100 L30 95" strokeWidth="3" />
          <rect x="147" y="100" width="35" height="55" rx="12" />
          <rect x="151" y="105" width="27" height="45" rx="9" />
          <circle cx="165" cy="127" r="8" strokeWidth="1" />
          <path d="M170 100 L170 95" strokeWidth="3" />
          <path d="M30 110 C30 54, 60 22, 100 22 C140 22, 170 54, 170 110" strokeWidth="1.5" />
        </svg>
        <div className="cont flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left column — sticky text + guitar below */}
          <div className="reveal-left lg:w-[40%] lg:self-stretch">
            <div className="lg:sticky lg:top-24">
              <p className="section-label mb-3">Who it's for</p>
              <h2 className="text-gradient-animated mb-4 text-3xl font-semibold md:text-4xl lg:text-5xl">
                Built for everyone who speaks
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Whether you're a journalist, student, podcaster, or professional —
                Bard fits into your workflow.
              </p>
            </div>

            {/* Guitar illustration below sticky text — scrolls naturally */}
            <svg className="mx-auto mt-10 opacity-[0.18] lg:mx-0" width="180" height="450" viewBox="0 0 200 500" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M88 10 C88 4, 92 0, 100 0 C108 0, 112 4, 112 10 L112 70 L88 70 Z" />
              <line x1="88" y1="18" x2="72" y2="18" /><circle cx="68" cy="18" r="4" />
              <line x1="88" y1="34" x2="72" y2="34" /><circle cx="68" cy="34" r="4" />
              <line x1="88" y1="50" x2="72" y2="50" /><circle cx="68" cy="50" r="4" />
              <line x1="112" y1="18" x2="128" y2="18" /><circle cx="132" cy="18" r="4" />
              <line x1="112" y1="34" x2="128" y2="34" /><circle cx="132" cy="34" r="4" />
              <line x1="112" y1="50" x2="128" y2="50" /><circle cx="132" cy="50" r="4" />
              <line x1="86" y1="70" x2="114" y2="70" strokeWidth="3" />
              <rect x="90" y="70" width="20" height="180" rx="2" />
              <line x1="90" y1="100" x2="110" y2="100" />
              <line x1="90" y1="128" x2="110" y2="128" />
              <line x1="90" y1="154" x2="110" y2="154" />
              <line x1="90" y1="178" x2="110" y2="178" />
              <line x1="90" y1="200" x2="110" y2="200" />
              <line x1="90" y1="220" x2="110" y2="220" />
              <line x1="90" y1="238" x2="110" y2="238" />
              <circle cx="100" cy="114" r="2" fill="white" fillOpacity="0.15" />
              <circle cx="100" cy="166" r="2" fill="white" fillOpacity="0.15" />
              <circle cx="100" cy="210" r="2" fill="white" fillOpacity="0.15" />
              <line x1="94" y1="70" x2="94" y2="250" strokeWidth="0.5" />
              <line x1="97" y1="70" x2="97" y2="250" strokeWidth="0.5" />
              <line x1="100" y1="70" x2="100" y2="250" strokeWidth="0.5" />
              <line x1="103" y1="70" x2="103" y2="250" strokeWidth="0.5" />
              <line x1="106" y1="70" x2="106" y2="250" strokeWidth="0.5" />
              <path d="M90 250 C90 250, 40 260, 30 300 C20 340, 35 360, 55 370" />
              <path d="M110 250 C110 250, 160 260, 170 300 C180 340, 165 360, 145 370" />
              <path d="M55 370 C65 378, 70 385, 65 400" />
              <path d="M145 370 C135 378, 130 385, 135 400" />
              <path d="M65 400 C50 420, 30 445, 40 470 C50 495, 80 500, 100 498" />
              <path d="M135 400 C150 420, 170 445, 160 470 C150 495, 120 500, 100 498" />
              <circle cx="100" cy="320" r="28" />
              <circle cx="100" cy="320" r="26" strokeWidth="1" />
              <circle cx="100" cy="320" r="32" strokeWidth="0.5" />
              <circle cx="100" cy="320" r="35" strokeWidth="0.5" />
              <rect x="80" y="410" width="40" height="8" rx="3" />
              <line x1="85" y1="414" x2="115" y2="414" strokeWidth="1" />
              <line x1="94" y1="250" x2="88" y2="410" strokeWidth="0.5" />
              <line x1="97" y1="250" x2="94" y2="410" strokeWidth="0.5" />
              <line x1="100" y1="250" x2="100" y2="410" strokeWidth="0.5" />
              <line x1="103" y1="250" x2="106" y2="410" strokeWidth="0.5" />
              <line x1="106" y1="250" x2="112" y2="410" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Cards */}
          <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            {USE_CASES.map((uc, i) => (
              <TiltCard
                key={uc.title}
                className="reveal-flip group rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 transition-[box-shadow] duration-300 hover:ring-white/10 sm:p-8"
                style={{ '--delay': `${i * 180}ms` } as React.CSSProperties}
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition-colors group-hover:bg-white/10">
                  <FeatureIcon name={uc.icon} />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">{uc.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-white/60">{uc.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FEATURES — STICKY CARD STACK ━━━ */}
      <section
        id="features"
        ref={featuresRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-28 ${featuresRef.inView ? 'is-visible' : ''}`}
      >
        <div className="cont">
          <p className="reveal-up section-label mb-3 text-center">Features</p>
          <h2
            className="reveal-up text-gradient-animated mx-auto mb-16 max-w-2xl text-center text-3xl font-semibold md:text-4xl lg:text-5xl"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            Everything you need, nothing you don't
          </h2>

          <div className="flex flex-col gap-6">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ━━━ FAQ ━━━ */}
      <section
        ref={faqRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-28 ${faqRef.inView ? 'is-visible' : ''}`}
      >
        {/* Decorative microphone — left side */}
        <svg className="pointer-events-none absolute -left-6 top-1/3 svg-breathe sm:-left-4 lg:left-[2%]" width="280" height="400" viewBox="0 0 120 300" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animationDelay: '3s' }}>
          <path d="M35 90 C35 40, 40 10, 60 10 C80 10, 85 40, 85 90" />
          <path d="M35 90 L35 110 C35 115, 40 120, 60 120 C80 120, 85 115, 85 110 L85 90" />
          <path d="M38 35 C50 30, 70 30, 82 35" strokeWidth="1" />
          <path d="M36 50 C50 45, 70 45, 84 50" strokeWidth="1" />
          <path d="M35 65 C50 60, 70 60, 85 65" strokeWidth="1" />
          <path d="M35 80 C50 75, 70 75, 85 80" strokeWidth="1" />
          <path d="M36 95 C50 90, 70 90, 84 95" strokeWidth="1" />
          <path d="M50 12 C48 50, 48 80, 50 118" strokeWidth="0.8" />
          <path d="M60 10 L60 120" strokeWidth="0.8" />
          <path d="M70 12 C72 50, 72 80, 70 118" strokeWidth="0.8" />
          <ellipse cx="60" cy="120" rx="25" ry="5" strokeWidth="2.5" />
          <rect x="52" y="125" width="16" height="120" rx="8" />
          <line x1="54" y1="150" x2="66" y2="150" strokeWidth="0.8" />
          <line x1="54" y1="160" x2="66" y2="160" strokeWidth="0.8" />
          <line x1="54" y1="170" x2="66" y2="170" strokeWidth="0.8" />
          <line x1="54" y1="180" x2="66" y2="180" strokeWidth="0.8" />
          <line x1="54" y1="190" x2="66" y2="190" strokeWidth="0.8" />
          <line x1="54" y1="200" x2="66" y2="200" strokeWidth="0.8" />
          <circle cx="60" cy="250" r="6" />
          <line x1="60" y1="245" x2="60" y2="256" strokeWidth="1" />
          <path d="M60 256 C60 270, 45 280, 40 290" strokeWidth="1.5" />
        </svg>
        <div className="cont flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
          <div className="reveal-left flex flex-col lg:sticky lg:top-24 lg:w-[40%]">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="text-gradient-animated mb-4 text-3xl font-semibold md:text-4xl">
              Questions? Answers.
            </h2>
          </div>
          <div className="reveal-right flex-1" style={{ '--delay': '150ms' } as React.CSSProperties}>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ━━━ CTA BANNER ━━━ */}
      <section
        ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-5 py-28 ${ctaRef.inView ? 'is-visible' : ''}`}
      >
        {/* Decorative megaphone — right side */}
        <svg className="pointer-events-none absolute -right-8 top-1/2 z-20 -translate-y-1/2 rotate-[-10deg] svg-breathe lg:right-[2%]" width="260" height="400" viewBox="0 0 200 320" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animationDelay: '0.8s' }}>
          <path d="M60 40 L170 10 C180 8, 190 14, 190 24 L190 216 C190 226, 180 232, 170 230 L60 200" />
          <path d="M170 10 C185 30, 195 60, 198 120 C195 180, 185 210, 170 230" strokeWidth="1" />
          <path d="M180 20 C192 50, 200 80, 202 120 C200 160, 192 190, 180 220" strokeWidth="0.8" />
          <rect x="30" y="40" width="30" height="160" rx="6" />
          <path d="M45 200 L45 280" strokeWidth="6" />
          <path d="M38 270 C38 290, 52 290, 52 270" strokeWidth="2" />
          <line x1="38" y1="230" x2="52" y2="230" strokeWidth="1.5" />
          <line x1="38" y1="245" x2="52" y2="245" strokeWidth="1.5" />
          <line x1="38" y1="260" x2="52" y2="260" strokeWidth="1.5" />
          <circle cx="28" cy="120" r="8" />
          <circle cx="28" cy="120" r="4" fill="white" fillOpacity="0.1" />
          <path d="M200 90 C215 100, 215 140, 200 150" strokeWidth="1.5" />
          <path d="M210 70 C235 90, 235 150, 210 170" strokeWidth="1.2" />
          <path d="M220 50 C255 80, 255 160, 220 190" strokeWidth="0.8" />
          <line x1="60" y1="80" x2="170" y2="60" strokeWidth="0.5" />
          <line x1="60" y1="120" x2="170" y2="120" strokeWidth="0.5" />
          <line x1="60" y1="160" x2="170" y2="180" strokeWidth="0.5" />
        </svg>
        <div className="cont">
          <div className="reveal-scale relative overflow-hidden rounded-3xl bg-[#161616] px-8 py-16 text-center ring-1 ring-white/5 sm:px-16 sm:py-20">
            {/* Breathing inner glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" style={{ animation: 'svg-breathe 4s ease-in-out infinite' }} />
            <h2
              className="reveal-up text-gradient-animated relative mb-4 text-3xl font-semibold sm:text-5xl"
            >
              Ready to let your voice do the work?
            </h2>
            <p
              className="reveal-up relative mx-auto mb-8 max-w-lg text-sm text-white/60"
              style={{ '--delay': '150ms' } as React.CSSProperties}
            >
              Join thousands who trust Bard for fast, accurate transcription.
            </p>
            <div
              className="reveal-up relative"
              style={{ '--delay': '300ms' } as React.CSSProperties}
            >
              <MagneticButton groupName="cta2">
                <span className="relative z-10 inline-flex">
                  {'Check it out'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="inline-block transition-transform duration-300 group-hover/cta2:animate-[dance_0.5s_ease-in-out_forwards]"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <svg className="relative z-10 transition-transform duration-300 group-hover/cta2:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 group-hover/cta2:translate-x-full" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ── Data ── */

const PLAYHEAD_INDEX = 28

const WAVEFORM_BARS = [
  18, 30, 45, 25, 55, 35, 70, 40, 85, 50,
  65, 90, 45, 75, 55, 30, 80, 60, 95, 40,
  70, 35, 85, 55, 45, 75, 60, 90,
  50, 35, 65, 80, 40, 55, 70, 30, 85, 45,
  60, 95, 35, 50, 75, 40, 65, 55, 80, 30,
  45, 70, 55, 85, 40, 60, 35, 75, 50, 90,
  45, 65,
]

const USE_CASES = [
  {
    icon: 'mic',
    title: 'Podcasters & Creators',
    desc: 'Record interviews and get show notes, transcripts, and quotes automatically. No more manual timestamps.',
  },
  {
    icon: 'book',
    title: 'Students & Researchers',
    desc: 'Capture lectures and meetings word-for-word. Search through hours of recordings by keyword.',
  },
  {
    icon: 'briefcase',
    title: 'Professionals & Teams',
    desc: 'Turn meetings into action items. Share transcripts with your team and never miss a decision.',
  },
  {
    icon: 'pen',
    title: 'Writers & Journalists',
    desc: 'Dictate articles, interview subjects, and draft stories — all with perfect transcription.',
  },
  {
    icon: 'podium',
    title: 'Public Speaking Practice',
    desc: 'Rehearse presentations and track filler words like "um", "like", and "you know". Build confidence by seeing exactly where you stumble.',
  },
  {
    icon: 'journal',
    title: 'Voice Diary',
    desc: 'Speak your thoughts and let Bard turn them into a written diary. Capture your day hands-free, anytime, anywhere.',
  },
]

const FEATURES = [
  {
    icon: 'zap',
    title: 'Real-Time Transcription',
    desc: 'Words appear as you speak. No waiting, no batch processing — just instant text flowing on screen.',
    color: '#c6b7f7',
    visual: 'Live',
  },
  {
    icon: 'globe',
    title: 'Multi-Language Support',
    desc: 'Supports 50+ languages with automatic detection. Switch languages mid-sentence without skipping a beat.',
    color: '#fac8dd',
    visual: '50+',
  },
  {
    icon: 'shield',
    title: 'End-to-End Encryption',
    desc: 'Your voice data is encrypted in transit and at rest. We never store your recordings after processing.',
    color: '#f8e9b7',
    visual: 'E2EE',
  },
  {
    icon: 'layers',
    title: 'API & Integrations',
    desc: 'Connect Bard to your apps via REST API, webhooks, or native integrations with Notion, Slack, and more.',
    color: '#d4faae',
    visual: 'API',
  },
]


const FAQ_ITEMS = [
  { q: 'How accurate is Bard?', a: 'Bard uses state-of-the-art speech recognition models with strong performance across accents and dialects. Accuracy varies by language and audio quality.' },
  { q: 'Is my data private?', a: 'Yes. All audio is encrypted in transit and at rest. We process your recordings in real-time and do not store them after transcription is complete.' },
  { q: 'What languages are supported?', a: 'We support a wide range of languages including English, Spanish, French, German, Japanese, Mandarin, Arabic, Hindi, and many more. Language detection is automatic.' },
  { q: 'Can I use Bard with my team?', a: 'Absolutely. Our Teams plan includes shared workspaces, collaborative editing, and centralized billing for organizations of any size.' },
  { q: 'How does public speaking practice work?', a: 'Record yourself rehearsing a speech or presentation. Bard transcribes it in real time and highlights filler words like "um", "like", and "you know" so you can see exactly where you stumble and improve over time.' },
  { q: 'Can I use Bard as a voice diary?', a: 'Yes. Just hit record and speak your thoughts. Bard transcribes everything into a written diary entry you can review, search, and revisit anytime — completely hands-free.' },
]

/* ── Components ── */

/* Parallax blobs that move on scroll */
function ParallaxBlobs() {
  const blob1 = useRef<HTMLDivElement>(null)
  const blob2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (blob1.current) blob1.current.style.transform = `translateY(${y * 0.15}px)`
      if (blob2.current) blob2.current.style.transform = `translateY(${-y * 0.1}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div ref={blob1} className="parallax-blob parallax-blob-1" aria-hidden="true" />
      <div ref={blob2} className="parallax-blob parallax-blob-2" aria-hidden="true" />
    </>
  )
}

/* Typewriter effect for hero heading */
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        idx.current++
        setDisplayed(text.slice(0, idx.current))
        if (idx.current >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 38)
      return () => clearInterval(interval)
    }, 400)
    return () => clearTimeout(startTimer)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  )
}

/* 3D tilt card wrapper */
function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.02)`
    card.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform = ''
      ref.current.style.boxShadow = ''
    }
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className || ''}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

/* Feature card with individual scroll reveal + tilt */
function FeatureCard({ f, i }: { f: typeof FEATURES[number]; i: number }) {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Combine both refs onto one element
  const setRefs = (node: HTMLDivElement | null) => {
    cardRef.current = node;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.01)`
    card.style.boxShadow = `${-x * 15}px ${y * 15}px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
      cardRef.current.style.boxShadow = ''
    }
  }

  return (
    <div
      ref={setRefs}
      className="tilt-card sticky rounded-2xl bg-[#040404] ring-1 ring-white/5 p-8 sm:p-10 lg:p-12"
      style={{
        top: `${40 + i * 20}px`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'none'
          : 'perspective(800px) translateY(60px) rotateX(12deg) scale(0.92)',
        filter: inView ? 'blur(0px)' : 'blur(8px)',
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms, filter 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
        transitionDelay: `${i * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
            <FeatureIcon name={f.icon} />
          </span>
          <h3 className="mb-3 text-xl font-semibold text-white lg:text-2xl">{f.title}</h3>
          <p className="m-0 max-w-md text-sm leading-relaxed text-white/60">{f.desc}</p>
        </div>
        {/* Visual block */}
        <div
          className="flex h-40 flex-1 items-center justify-center rounded-xl lg:h-52"
          style={{ background: f.color }}
        >
          <FeatureIllustration name={f.visual} />
        </div>
      </div>
    </div>
  )
}


/* Magnetic button effect */
function MagneticButton({
  children,
  groupName,
}: {
  children: React.ReactNode
  groupName: string
}) {
  const btnRef = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    btn.style.transform = `translate(${dx}px, ${dy}px)`
  }

  function handleMouseLeave() {
    if (btnRef.current) btnRef.current.style.transform = ''
  }

  return (
    <div
      className={`group/${groupName} relative inline-block`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ padding: '20px', margin: '-20px' }}
    >
      <a
        ref={btnRef}
        href="#"
        className="btn-magnetic relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium tracking-wider text-white no-underline backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
      >
        {children}
      </a>
    </div>
  )
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className="rounded-xl bg-[#161616] ring-1 ring-white/5">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium text-white"
          >
            {item.q}
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0 transition-transform duration-300"
              style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)' }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: openIndex === i ? '12rem' : '0' }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeatureIcon({ name }: { name: string }) {
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
    case 'zap':
      return <svg {...props}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    case 'shield':
      return <svg {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
    case 'layers':
      return <svg {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" /><path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" /></svg>
    case 'mic':
      return <svg {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
    case 'book':
      return <svg {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
    case 'briefcase':
      return <svg {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    case 'pen':
      return <svg {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
    case 'podium':
      return <svg {...props}><path d="M12 2v8" /><path d="M5 10h14" /><path d="M8 10v12" /><path d="M16 10v12" /><path d="M5 22h14" /><circle cx="12" cy="6" r="2" /></svg>
    case 'journal':
      return <svg {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M8 7h8" /><path d="M8 11h6" /></svg>
    default:
      return null
  }
}

function FeatureIllustration({ name }: { name: string }) {
  const color = '#040404'

  switch (name) {
    // Real-Time — waveform with a cursor
    case 'Live':
      return (
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          {/* Waveform bars */}
          {[
            { x: 12, h: 20 }, { x: 22, h: 40 }, { x: 32, h: 28 },
            { x: 42, h: 55 }, { x: 52, h: 35 }, { x: 62, h: 60 },
            { x: 72, h: 45 }, { x: 82, h: 70 }, { x: 92, h: 38 },
            { x: 102, h: 50 }, { x: 112, h: 25 }, { x: 122, h: 42 },
          ].map((bar, i) => (
            <rect
              key={i}
              x={bar.x}
              y={50 - bar.h / 2}
              width="6"
              height={bar.h}
              rx="3"
              fill={color}
              opacity={i > 9 ? 0.3 : 0.8}
            />
          ))}
          {/* Blinking cursor */}
          <rect x="136" y="30" width="3" height="40" rx="1.5" fill={color} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1s" repeatCount="indefinite" />
          </rect>
          {/* Text line underneath */}
          <rect x="12" y="82" width="80" height="4" rx="2" fill={color} opacity="0.2" />
          <rect x="98" y="82" width="30" height="4" rx="2" fill={color} opacity="0.12" />
        </svg>
      )

    // Multi-Language — overlapping speech bubbles with different scripts
    case '50+':
      return (
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          <rect x="16" y="12" width="72" height="42" rx="12" fill={color} opacity="0.12" />
          <path d="M40 54 l-6 12 l12 -6" fill={color} opacity="0.12" />
          <text x="30" y="38" fontFamily="serif" fontSize="16" fill={color} opacity="0.5">こんにちは</text>
          <rect x="50" y="24" width="72" height="42" rx="12" fill={color} opacity="0.2" />
          <path d="M100 66 l8 12 l-2 -14" fill={color} opacity="0.2" />
          <text x="62" y="50" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill={color} opacity="0.6">Hola!</text>
          <rect x="72" y="8" width="76" height="42" rx="12" fill={color} opacity="0.35" />
          <path d="M126 50 l6 12 l-2 -14" fill={color} opacity="0.35" />
          <text x="84" y="34" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill={color} opacity="0.8">Hello</text>
          <circle cx="30" cy="80" r="12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.25" />
          <ellipse cx="30" cy="80" rx="5" ry="12" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
          <line x1="18" y1="80" x2="42" y2="80" stroke={color} strokeWidth="1" opacity="0.2" />
        </svg>
      )

    // Encryption — lock with keyhole
    case 'E2EE':
      return (
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <path d="M60 8 L95 22 C95 22 98 60 60 90 C22 60 25 22 25 22 Z" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.08" />
          <rect x="45" y="44" width="30" height="24" rx="4" fill={color} opacity="0.7" />
          <path d="M50 44 V36 C50 28 70 28 70 36 V44" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="54" r="4" fill="#c6b7f7" />
          <rect x="58.5" y="56" width="3" height="6" rx="1" fill="#c6b7f7" />
          {[
            { x: 14, y: 30, t: '01' }, { x: 98, y: 28, t: '10' },
            { x: 18, y: 64, t: '11' }, { x: 96, y: 60, t: '00' },
            { x: 10, y: 48, t: '1' }, { x: 104, y: 44, t: '0' },
          ].map((bit, i) => (
            <text key={i} x={bit.x} y={bit.y} fontSize="9" fontFamily="monospace" fill={color} opacity="0.2">
              {bit.t}
            </text>
          ))}
        </svg>
      )

    // API & Integrations — connected nodes / plugs
    case 'API':
      return (
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          <circle cx="80" cy="50" r="16" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
          <text x="68" y="54" fontSize="10" fontFamily="monospace" fontWeight="700" fill={color} opacity="0.7">{'{ }'}</text>
          {[
            { cx: 26, cy: 22, label: 'S', r: 12 },
            { cx: 134, cy: 22, label: 'N', r: 12 },
            { cx: 26, cy: 78, label: 'W', r: 12 },
            { cx: 134, cy: 78, label: 'Z', r: 12 },
          ].map((node, i) => (
            <g key={i}>
              <line x1="80" y1="50" x2={node.cx} y2={node.cy} stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
              <circle cx={node.cx} cy={node.cy} r={node.r} fill={color} opacity="0.1" stroke={color} strokeWidth="1.5" />
              <text x={node.cx} y={node.cy + 4} fontSize="10" fontWeight="600" textAnchor="middle" fill={color} opacity="0.5">
                {node.label}
              </text>
            </g>
          ))}
          <circle r="3" fill={color} opacity="0.6">
            <animateMotion dur="2s" repeatCount="indefinite" path="M80,50 L134,22" />
          </circle>
          <circle r="3" fill={color} opacity="0.6">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M80,50 L26,78" />
          </circle>
        </svg>
      )

    default:
      return <span className="text-2xl font-bold" style={{ color }}>{name}</span>
  }
}
