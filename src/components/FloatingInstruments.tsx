export default function FloatingInstruments() {
  const s = 'rgba(255,255,255,0.3)'
  const f = 'rgba(255,255,255,0.18)'
  const t = 'rgba(255,255,255,0.12)'

  return (
    <div className="pointer-events-none absolute -inset-20 z-10 overflow-visible sm:-inset-32 lg:-inset-44" aria-hidden="true">

      {/* ── HARPS ── */}
      <svg className="absolute -left-8 -top-10 sm:-left-14 sm:-top-14" style={{ animation: 'float 8s ease-in-out infinite' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V3a2 2 0 0 1 2-2h4a8 8 0 0 1 8 8v12" /><path d="M4 7h14" /><path d="M6 3v18" /><path d="M9 3v18" /><path d="M12 7v14" /><path d="M15 9v12" />
      </svg>

      <svg className="absolute -right-6 top-1/3 sm:-right-16" style={{ animation: 'float-reverse 11s ease-in-out 3s infinite' }} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={f} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V3a2 2 0 0 1 2-2h4a8 8 0 0 1 8 8v12" /><path d="M4 7h14" /><path d="M6 3v18" /><path d="M9 3v18" /><path d="M12 7v14" /><path d="M15 9v12" />
      </svg>

      <svg className="absolute bottom-[15%] left-[60%] sm:left-[65%]" style={{ animation: 'float-slow 13s ease-in-out 5s infinite' }} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V3a2 2 0 0 1 2-2h4a8 8 0 0 1 8 8v12" /><path d="M4 7h14" /><path d="M6 3v18" /><path d="M9 3v18" /><path d="M12 7v14" /><path d="M15 9v12" />
      </svg>

      {/* ── GUITARS ── */}
      <svg className="absolute -right-5 -top-8 sm:-right-12 sm:-top-12" style={{ animation: 'float-reverse 9s ease-in-out 1s infinite' }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="m20 4-2-2-6 6-1.5-1.5a1 1 0 0 0-1.5 0L7.5 8a1 1 0 0 0 0 1.5L9 11l-4.5 4.5a4.95 4.95 0 1 0 7 7L16 18l1.5 1.5a1 1 0 0 0 1.5 0l1.5-1.5a1 1 0 0 0 0-1.5L19 15l5-5" /><circle cx="9.5" cy="16.5" r="1" />
      </svg>

      <svg className="absolute -bottom-8 -left-6 sm:-bottom-12 sm:-left-12" style={{ animation: 'float-reverse 12s ease-in-out 1.5s infinite' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={f} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m20 4-2-2-6 6-1.5-1.5a1 1 0 0 0-1.5 0L7.5 8a1 1 0 0 0 0 1.5L9 11l-4.5 4.5a4.95 4.95 0 1 0 7 7L16 18l1.5 1.5a1 1 0 0 0 1.5 0l1.5-1.5a1 1 0 0 0 0-1.5L19 15l5-5" /><circle cx="9.5" cy="16.5" r="1" />
      </svg>

      <svg className="absolute right-[20%] top-[5%]" style={{ animation: 'float 10s ease-in-out 6s infinite' }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m20 4-2-2-6 6-1.5-1.5a1 1 0 0 0-1.5 0L7.5 8a1 1 0 0 0 0 1.5L9 11l-4.5 4.5a4.95 4.95 0 1 0 7 7L16 18l1.5 1.5a1 1 0 0 0 1.5 0l1.5-1.5a1 1 0 0 0 0-1.5L19 15l5-5" /><circle cx="9.5" cy="16.5" r="1" />
      </svg>

      {/* ── MUSICAL NOTES ── */}
      <svg className="absolute -left-10 top-1/2 -translate-y-1/2 sm:-left-20" style={{ animation: 'float-slow 10s ease-in-out 2s infinite' }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>

      <svg className="absolute -bottom-10 -right-4 sm:-bottom-14 sm:-right-10" style={{ animation: 'float-slow 9s ease-in-out 4s infinite' }} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>

      <svg className="absolute left-[25%] top-[2%]" style={{ animation: 'float 7s ease-in-out 0.5s infinite' }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>

      <svg className="absolute bottom-[10%] right-[30%]" style={{ animation: 'float-reverse 8s ease-in-out 2.5s infinite' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>

      {/* ── HEADPHONES ── */}
      <svg className="absolute -left-4 bottom-[30%] sm:-left-12" style={{ animation: 'float 9s ease-in-out 2s infinite' }} width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>

      {/* ── MICROPHONE ── */}
      <svg className="absolute -right-8 bottom-[20%] sm:-right-18" style={{ animation: 'float-slow 10s ease-in-out 4.5s infinite' }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={f} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
      </svg>

      {/* ── PIANO KEYS (simplified) ── */}
      <svg className="absolute left-[40%] -top-10 sm:-top-16" style={{ animation: 'float-reverse 10s ease-in-out 3.5s infinite' }} width="40" height="28" viewBox="0 0 40 28" fill="none" stroke={f} strokeWidth="1">
        <rect x="1" y="1" width="38" height="26" rx="3" />
        <line x1="6" y1="1" x2="6" y2="27" /><line x1="12" y1="1" x2="12" y2="27" /><line x1="18" y1="1" x2="18" y2="27" /><line x1="24" y1="1" x2="24" y2="27" /><line x1="30" y1="1" x2="30" y2="27" /><line x1="36" y1="1" x2="36" y2="27" />
        <rect x="4" y="1" width="4" height="15" rx="1" fill="rgba(255,255,255,0.1)" /><rect x="10" y="1" width="4" height="15" rx="1" fill="rgba(255,255,255,0.1)" /><rect x="22" y="1" width="4" height="15" rx="1" fill="rgba(255,255,255,0.1)" /><rect x="28" y="1" width="4" height="15" rx="1" fill="rgba(255,255,255,0.1)" />
      </svg>

      {/* ── VINYL / RECORD ── */}
      <svg className="absolute -bottom-12 left-[35%] sm:-bottom-16" style={{ animation: 'float 14s ease-in-out 1s infinite' }} width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={f} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>

      {/* ── SPEAKER ── */}
      <svg className="absolute right-[10%] top-[55%]" style={{ animation: 'float-slow 11s ease-in-out 5.5s infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>

      {/* ── DRUM ── */}
      <svg className="absolute left-[12%] top-[10%]" style={{ animation: 'float 9s ease-in-out 7s infinite' }} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="7" rx="9" ry="4" /><path d="M3 7v8a9 4 0 0 0 18 0V7" /><path d="M3 11a9 4 0 0 0 18 0" />
      </svg>

      {/* ── TRUMPET (simplified) ── */}
      <svg className="absolute bottom-[5%] left-[10%] sm:left-[8%]" style={{ animation: 'float-reverse 13s ease-in-out 6s infinite' }} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={t} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h2l2-4h10l2 4h2" /><circle cx="12" cy="10" r="2" /><path d="M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
      </svg>
    </div>
  )
}
