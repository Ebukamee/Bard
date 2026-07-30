import { Link } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  DashboardSquare01Icon,
  Book02Icon,
  Mic01Icon,
  MusicNote01Icon,
  PodiumIcon,
  Settings02Icon,
  UserIcon,
  Cancel01Icon,
  SidebarLeft01Icon,
  Logout01Icon,
} from '@hugeicons/core-free-icons'
import { useAuth } from '../../lib/auth'
import { useNavigate } from '@tanstack/react-router'

const NAV_ITEMS = [
  { to: '/home' as const, label: 'Dashboard', icon: DashboardSquare01Icon, exact: true },
  { to: '/diary' as const, label: 'Diary', icon: Book02Icon },
  { to: '/transcription' as const, label: 'Transcription', icon: Mic01Icon },
  { to: '/audio' as const, label: 'Audio & Songs', icon: MusicNote01Icon },
  { to: '/speaking' as const, label: 'Public Speaking', icon: PodiumIcon },
]

const BOTTOM_NAV = [
  { to: '/settings' as const, label: 'Settings', icon: Settings02Icon },
  { to: '/profile' as const, label: 'Profile', icon: UserIcon },
]

export default function DashboardSidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapse,
}: {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}) {
  const { user } = useAuth()
  const name = user?.name ?? 'User'
  const initial = name.charAt(0).toUpperCase()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-[#0a0a0a] transition-all duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'w-[72px]' : 'w-72'}`}
      >
        {/* Logo + close/collapse */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-6'} py-6`}>
          {!collapsed && (
            <Link to="/" className="no-underline">
              <svg width="88" height="34" viewBox="0 0 88 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="5" x2="4" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M4 5 L16 5 C21 5 22 9 20 12 L16 16 L4 16" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M4 16 L16 16 C23 16 24 21 21 25 L16 29 L4 29" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M24 10 C26 12 26 22 24 24" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M27 7 C30 11 30 23 27 27" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" />
                <text x="34" y="26" fill="white" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="700" letterSpacing="2">ARD</text>
              </svg>
            </Link>
          )}
          {collapsed && (
            <Link to="/" className="no-underline">
              <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="5" x2="4" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M4 5 L16 5 C21 5 22 9 20 12 L16 16 L4 16" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M4 16 L16 16 C23 16 24 21 21 25 L16 29 L4 29" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M24 10 C26 12 26 22 24 24" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M27 7 C30 11 30 23 27 27" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </Link>
          )}
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        {/* Collapse toggle (desktop only) */}
        <div className={`hidden lg:flex ${collapsed ? 'justify-center px-3' : 'px-3'} pb-2`}>
          <button
            onClick={onToggleCollapse}
            className={`btn-press rounded-lg p-2 text-white/30 transition hover:bg-white/5 hover:text-white/60 ${collapsed ? '' : 'ml-auto'}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <HugeiconsIcon
              icon={SidebarLeft01Icon}
              size={18}
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className={`nav-slide flex items-center rounded-xl text-base text-white/50 no-underline transition hover:bg-white/5 hover:text-white [&.active]:bg-white/5 [&.active]:text-white ${
                collapsed ? 'justify-center px-3 py-3' : 'gap-4 px-4 py-4'
              }`}
              activeProps={{ className: 'active' }}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
            >
              <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.5} className="shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-white/5 px-3 py-3">
          {BOTTOM_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-slide flex items-center rounded-xl text-base text-white/50 no-underline transition hover:bg-white/5 hover:text-white [&.active]:bg-white/5 [&.active]:text-white ${
                collapsed ? 'justify-center px-3 py-3' : 'gap-4 px-4 py-4'
              }`}
              activeProps={{ className: 'active' }}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
            >
              <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.5} className="shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* User info */}
        <UserMenu initial={initial} collapsed={collapsed} userName={name} userEmail={user?.email ?? ''} userAvatar={user?.avatar_url} />
      </aside>
    </>
  )
}

function UserMenu({ initial, collapsed, userName, userEmail, userAvatar }: { initial: string; collapsed: boolean; userName: string; userEmail: string; userAvatar?: string }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={menuRef} className={`relative border-t border-white/5 ${collapsed ? 'flex justify-center px-3' : 'px-6'} py-5`}>
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center ${collapsed ? '' : 'gap-3'} w-full text-left transition hover:opacity-80`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white cursor-pointer transition hover:ring-2 hover:ring-white/20 overflow-hidden">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-medium text-white">{userName}</p>
          </div>
        )}
      </button>

      {/* Popup */}
      {open && (
        <div
          className={`absolute ${collapsed ? 'left-[72px]' : 'left-6 right-6'} bottom-full mb-2 rounded-xl bg-[#1a1a1a] p-4 ring-1 ring-white/10 shadow-xl animate-scale-in`}
          style={{ minWidth: '200px' }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-white/40 truncate">{userEmail}</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-3">
            <button
              onClick={() => {
                setOpen(false)
                logout()
                navigate({ to: '/signin' })
              }}
              className="btn-press flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <HugeiconsIcon icon={Logout01Icon} size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
