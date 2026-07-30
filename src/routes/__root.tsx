import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { AuthProvider } from '../lib/auth'

import StoreDevtools from '../lib/demo-store-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Bard — Voice to Transcription',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#040404] px-6 text-center">
      {/* Large 404 */}
      <h1 className="animate-fade-up text-[8rem] font-bold leading-none tracking-tight text-white/10 sm:text-[12rem]">
        404
      </h1>

      {/* Message */}
      <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
        <p className="mt-2 text-xl font-semibold text-white">Page not found</p>
        <p className="mt-2 max-w-md text-sm text-white/40">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
        <Link
          to="/"
          className="group/home btn-press inline-block rounded-full px-6 py-2.5 text-sm font-medium no-underline transition hover:-translate-y-0.5"
          style={{ background: '#ffffff', color: '#040404' }}
        >
          {'Go Home'.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block group-hover/home:animate-[dance_0.5s_ease-in-out_forwards]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </Link>
        <Link
          to="/home"
          className="group/dash btn-press inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/60 no-underline transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
        >
          {'Dashboard'.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block group-hover/dash:animate-[dance_0.5s_ease-in-out_forwards]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {char}
            </span>
          ))}
        </Link>
      </div>
    </div>
  )
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const DASHBOARD_ROUTES = ['/home', '/diary', '/transcription', '/audio', '/speaking', '/settings', '/profile']
  const isDashboard = DASHBOARD_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))

  return (
    <AuthProvider>
      {!isDashboard && <Header />}
      <Outlet />
      {!isDashboard && <Footer />}
    </AuthProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script src="https://accounts.google.com/gsi/client" async defer />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            StoreDevtools,
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
