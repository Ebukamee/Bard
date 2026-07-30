import { createFileRoute, Outlet, redirect, useNavigate, useRouterState } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import { useAuth } from '../lib/auth'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('bard_access_token')
      if (!token) {
        throw redirect({ to: '/signin' })
      }
    }
  },
})

function DashboardLayout() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const nav = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // React-level auth fallback (handles expired token after /auth/me fails)
  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      nav({ to: '/signin' })
    } else if (!user?.name) {
      nav({ to: '/auth/setup' })
    }
  }, [isLoading, isAuthenticated, user, nav])
  const [transitionKey, setTransitionKey] = useState(pathname)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTransitionKey(pathname)
    contentRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#040404]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#040404]">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main ref={contentRef} className="flex-1 overflow-y-auto p-5 lg:p-8">
          <div key={transitionKey} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
