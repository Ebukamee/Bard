import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Logout01Icon, Delete01Icon } from '@hugeicons/core-free-icons'
import { MOCK_USER } from '../../data/mock-dashboard'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const [name, setName] = useState(MOCK_USER.name)
  const [email, setEmail] = useState(MOCK_USER.email)
  const [bio, setBio] = useState('')
  const [saved, setSaved] = useState(false)

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-white animate-fade-up">Profile</h1>

      {/* Avatar + info */}
      <div className="card-hover flex items-center gap-6 rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '50ms' }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white transition hover:scale-105">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{name}</p>
          <p className="text-sm text-white/40">{email}</p>
          <span className="mt-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            {MOCK_USER.plan} Plan
          </span>
        </div>
      </div>

      {/* Edit form */}
      <div className="card-hover rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="mb-5 text-sm font-semibold text-white">Edit Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/25"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/25"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-white/25"
            />
          </div>
          <button
            onClick={handleSave}
            className="btn-press rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-[#040404] transition hover:bg-white/90"
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Plan info */}
      <div className="card-hover rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h2 className="mb-4 text-sm font-semibold text-white">Plan & Usage</h2>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-white/60">Minutes used this month</span>
          <span className="text-white/40">52 / 500</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-white/20" style={{ width: '10.4%' }} />
        </div>
        <p className="mt-2 text-xs text-white/30">Member since {MOCK_USER.joinDate}</p>
      </div>

      {/* Account actions */}
      <div className="rounded-2xl bg-[#161616] p-6 ring-1 ring-white/5 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <h2 className="mb-4 text-sm font-semibold text-white">Account</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="btn-press flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/10">
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
