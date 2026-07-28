import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import DashboardHeader from '../components/dashboard/DashboardHeader'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [transitionKey, setTransitionKey] = useState(pathname)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTransitionKey(pathname)
    contentRef.current?.scrollTo({ top: 0 })
  }, [pathname])

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
