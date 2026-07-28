import { Link } from '@tanstack/react-router'
import { useInView } from '../hooks/useInView'

export default function Footer() {
  const year = new Date().getFullYear()
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative z-10 px-5 pb-12 pt-16 ${inView ? 'is-visible' : ''}`}
    >
      <div className="cont">
        <div className="grid gap-10 sm:grid-cols-4">
          <div className="reveal-up sm:col-span-1">
            <div className="mb-4">
              <svg width="88" height="34" viewBox="0 0 88 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="5" x2="4" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M4 5 L16 5 C21 5 22 9 20 12 L16 16 L4 16" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M4 16 L16 16 C23 16 24 21 21 25 L16 29 L4 29" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M24 10 C26 12 26 22 24 24" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M27 7 C30 11 30 23 27 27" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" />
                <text x="34" y="26" fill="white" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="700" letterSpacing="2">ARD</text>
              </svg>
            </div>
            <p className="m-0 text-sm leading-relaxed text-white/40">
              Voice to text, beautifully simple.
            </p>
          </div>

          <div className="reveal-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/30">Product</p>
            <ul className="m-0 list-none space-y-2 p-0">
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">Features</a></li>
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">API</a></li>
            </ul>
          </div>

          <div className="reveal-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/30">Company</p>
            <ul className="m-0 list-none space-y-2 p-0">
              <li><Link to="/about" className="text-sm text-white/60 transition hover:text-white">About</Link></li>
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">Blog</a></li>
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">Careers</a></li>
            </ul>
          </div>

          <div className="reveal-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/30">Legal</p>
            <ul className="m-0 list-none space-y-2 p-0">
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">Terms</a></li>
              <li><a href="#" className="text-sm text-white/60 transition hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>

        <div
          className="reveal-up mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row"
          style={{ '--delay': '400ms' } as React.CSSProperties}
        >
          <p className="m-0 text-xs text-white/30">
            &copy; {year} Bard. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/30 transition hover:text-white" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.6 1h2.2L10 6.48 15.64 15h-4.41L7.78 9.82 3.23 15H1l5.14-5.84L.72 1h4.52l3.12 4.73L12.6 1zm-.77 12.67h1.22L4.57 2.26H3.26l8.57 11.41z" />
              </svg>
            </a>
            <a href="#" className="text-white/30 transition hover:text-white" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
