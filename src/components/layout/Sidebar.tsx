import { memo } from 'react'
import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { CalendarDays, FileText, Grid2x2, LayoutGrid, MenuSquare } from 'lucide-react'
import clsx from 'clsx'
import { useAppContext } from '../../context/AppContext'

const items = [
  { to: '/monthly', label: 'Monthly', icon: CalendarDays },
  { to: '/quarterly', label: 'Quarterly', icon: Grid2x2 },
  { to: '/yearly', label: 'Yearly', icon: LayoutGrid },
  { to: '/schedule', label: 'Schedule', icon: MenuSquare },
  { to: '/notes', label: 'Notes', icon: FileText },
]

function SidebarComponent() {
  const { isMobileMenuOpen, openComposer, setIsMobileMenuOpen } = useAppContext()

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-50 flex w-[288px] flex-col border-r border-white/70 bg-white/85 px-5 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-transform lg:sticky lg:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006193] text-white shadow-lg shadow-sky-900/20">
          <CalendarDays className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-headline text-xl font-extrabold text-[#006193]">Chronology</h1>
          <p className="font-label text-[11px] uppercase tracking-[0.35em] text-slate-500">
            Editorial Mgmt
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block"
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 2 }}
                className={clsx(
                  'relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all',
                  isActive ? 'bg-[#f7fbff] text-[#006193]' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                )}
              >
                {isActive ? (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 rounded-2xl bg-[#f7fbff] shadow-[inset_4px_0_0_0_#006193]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <Icon className="relative z-10 h-4 w-4 transition-colors duration-200" />
                <span className="relative z-10 font-semibold">{label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <motion.button
          type="button"
          onClick={openComposer}
          whileHover={{ y: -2, boxShadow: '0 16px 34px rgba(12,74,110,0.22)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006193] px-4 py-3 font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#007bb9]"
        >
          <span>+</span> New Entry
        </motion.button>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.35em] text-[#006193]">
            Archive Space
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[65%] rounded-full bg-[#006193]" />
          </div>
          <p className="mt-2 text-xs text-slate-500">65% of 2GB utilized</p>
        </div>
      </div>
    </aside>
  )
}

export const Sidebar = memo(SidebarComponent)
