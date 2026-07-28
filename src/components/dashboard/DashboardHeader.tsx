import { HugeiconsIcon } from '@hugeicons/react'
import { Menu01Icon } from '@hugeicons/core-free-icons'

export default function DashboardHeader({
  onMenuToggle,
}: {
  onMenuToggle: () => void
}) {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-white/5 px-4 lg:hidden">
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white"
      >
        <HugeiconsIcon icon={Menu01Icon} size={22} />
      </button>
      <span className="text-sm font-medium text-white/60">Bard</span>
    </header>
  )
}
