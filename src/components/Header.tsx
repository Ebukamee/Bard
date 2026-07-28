import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 px-5 transition-[background-color,border-color,backdrop-filter] duration-300"
      style={{
        background: scrolled ? 'rgba(4,4,4,0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="cont flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 text-white no-underline">
          <svg width="88" height="34" viewBox="0 0 88 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="5" x2="4" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M4 5 L16 5 C21 5 22 9 20 12 L16 16 L4 16" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M4 16 L16 16 C23 16 24 21 21 25 L16 29 L4 29" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M24 10 C26 12 26 22 24 24" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M27 7 C30 11 30 23 27 27" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" />
            <text x="34" y="26" fill="white" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="700" letterSpacing="2">ARD</text>
          </svg>
        </Link>

        {/* Center nav links */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link to="/" className="text-sm text-white/50 no-underline transition hover:text-white">
            Home
          </Link>
          <a href="/#features" className="text-sm text-white/50 no-underline transition hover:text-white">
            Features
          </a>
          <a href="/#who-its-for" className="text-sm text-white/50 no-underline transition hover:text-white">
            Who it's for
          </a>
          <Link to="/about" className="text-sm text-white/50 no-underline transition hover:text-white">
            About
          </Link>
        </div>

        {/* Right — auth */}
        <div className="hidden items-center gap-4 sm:flex">
          <Link to="/signin" className="group/signin text-sm text-white/50 no-underline transition hover:text-white">
            <span className="inline-flex">
              {'Sign in'.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block group-hover/signin:animate-[dance_0.5s_ease-in-out_forwards]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </Link>
          <Link
            to="/signup"
            className="group/signup rounded-full px-5 py-2 text-sm font-medium no-underline transition hover:-translate-y-0.5"
            style={{ background: '#ffffff', color: '#040404' }}
          >
            <span className="inline-flex">
              {'Sign up'.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block group-hover/signup:animate-[dance_0.5s_ease-in-out_forwards]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 sm:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="pb-4 pt-3 sm:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" className="rounded px-3 py-2.5 text-sm text-white/50 no-underline transition hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>Home</Link>
            <a href="/#features" className="rounded px-3 py-2.5 text-sm text-white/50 no-underline transition hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="/#who-its-for" className="rounded px-3 py-2.5 text-sm text-white/50 no-underline transition hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>Who it's for</a>
            <Link to="/about" className="rounded px-3 py-2.5 text-sm text-white/50 no-underline transition hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
            <div className="mt-2 flex items-center gap-3 px-3">
              <Link to="/signin" className="text-sm text-white/50 no-underline transition hover:text-white" onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link to="/signup" className="rounded-full px-5 py-2 text-sm font-medium no-underline" style={{ background: '#ffffff', color: '#040404' }} onClick={() => setMobileOpen(false)}>Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
