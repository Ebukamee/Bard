import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Logout01Icon, Delete01Icon, PencilEdit01Icon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'
import { useAuth } from '../../lib/auth'

export const Route = createFileRoute('/_dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user, logout, updateName } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const name = user?.name ?? 'User'
  const email = user?.email ?? ''
  const initial = name.charAt(0).toUpperCase()

  const handleEditName = () => {
    setEditName(user?.name ?? '')
    setEditing(true)
  }

  const handleSaveName = async () => {
    const trimmed = editName.trim()
    if (!trimmed || trimmed === user?.name) {
      setEditing(false)
      return
    }
    setSaving(true)
    setSaveError('')
    try {
      await updateName(trimmed)
      setEditing(false)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to update name')
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = () => {
    logout()
    navigate({ to: '/signin' })
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Profile</h1>

      {/* Avatar + info */}
      <div className="card-hover flex items-center gap-6 rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '50ms' }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white transition hover:scale-105">
          {user?.avatar_url ? (
            <img src={user.avatar_url} alt={name} className="h-full w-full rounded-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{name}</p>
          <p className="text-sm text-white/40">{email}</p>
        </div>
      </div>

      {/* Account info */}
      <div className="card-hover rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="mb-4 text-sm font-semibold text-white">Account Details</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/40">Name</span>
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white outline-none transition focus:border-white/25"
                  autoFocus
                  disabled={saving}
                />
                <button
                  onClick={handleSaveName}
                  disabled={saving}
                  className="btn-press rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white"
                >
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">{name}</span>
                <button
                  onClick={handleEditName}
                  className="btn-press rounded-lg p-1.5 text-white/20 transition hover:bg-white/5 hover:text-white/60"
                >
                  <HugeiconsIcon icon={PencilEdit01Icon} size={14} />
                </button>
              </div>
            )}
          </div>
          {saveError && (
            <p className="text-xs text-red-400">{saveError}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/40">Email</span>
            <span className="text-sm text-white/60">{email}</span>
          </div>
          {user?.created_at && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">Member since</span>
              <span className="text-sm text-white/60">
                {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Account actions */}
      <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h2 className="mb-4 text-sm font-semibold text-white">Account</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleSignOut}
            className="btn-press flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/10"
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} />
            Sign Out
          </button>
          <button className="btn-press flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/20">
            <HugeiconsIcon icon={Delete01Icon} size={16} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
