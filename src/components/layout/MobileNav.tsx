import { memo } from 'react'
import { CalendarDays, FileText, Grid2x2, LayoutGrid, MenuSquare, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useAppContext } from '../../context/AppContext'

const items = [
  { to: '/monthly', label: 'MONTH', icon: CalendarDays },
  { to: '/quarterly', label: 'QTR', icon: Grid2x2 },
  { to: '/notes', label: 'NOTES', icon: FileText },
  { to: '/yearly', label: 'YEAR', icon: LayoutGrid },
  { to: '/schedule', label: 'SCHED', icon: MenuSquare },
]

function MobileNavComponent() {
  const { openComposer } = useAppContext()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around bg-white/95 px-6 shadow-[0_-1px_10px_rgba(0,0,0,0.05)] backdrop-blur-md lg:hidden">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            clsx('flex flex-col items-center gap-1 text-[10px] font-bold', isActive ? 'text-sky-800' : 'text-slate-500')
          }
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </NavLink>
      ))}
      <button
        type="button"
        onClick={openComposer}
        className="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#006193] text-white shadow-lg ring-4 ring-white"
      >
        <Plus className="h-6 w-6" />
      </button>
    </nav>
  )
}

export const MobileNav = memo(MobileNavComponent)
