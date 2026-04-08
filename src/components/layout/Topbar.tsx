import { motion } from 'motion/react'
import { memo } from 'react'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

function TopbarComponent() {
  const { globalSearchQuery, setGlobalSearchQuery, setIsMobileMenuOpen, themeMode, toggleTheme } =
    useAppContext()

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 border-b px-4 py-4 backdrop-blur-xl sm:px-6 lg:left-[288px] lg:px-8 ${
        themeMode === 'dark'
          ? 'border-emerald-900/50 bg-[#071113]/80'
          : 'border-white/60 bg-white/88'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border lg:hidden ${
              themeMode === 'dark'
                ? 'border-emerald-900/60 bg-emerald-950/80 text-emerald-100'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <p
            className={`font-headline text-xl font-extrabold tracking-tight sm:text-3xl ${
              themeMode === 'dark' ? 'text-[#41d9b3]' : 'text-[#006193]'
            }`}
          >
            Editorial Chronology
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <label
            className={`hidden items-center gap-3 rounded-full px-4 py-2 text-sm shadow-inner transition duration-200 focus-within:scale-[1.02] focus-within:shadow-md sm:flex ${
              themeMode === 'dark'
                ? 'bg-emerald-950/70 text-emerald-200'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Search className="h-4 w-4" />
            <input
              value={globalSearchQuery}
              onChange={(event) => setGlobalSearchQuery(event.target.value)}
              placeholder="Search events..."
              className="w-48 bg-transparent outline-none transition-[width] duration-200 xl:w-64 focus:w-56 xl:focus:w-72"
            />
          </label>
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileHover={{ y: -2, boxShadow: '0 10px 24px rgba(15,23,42,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm ${
              themeMode === 'dark'
                ? 'bg-emerald-950/80 text-emerald-200'
                : 'bg-white text-slate-600'
            }`}
            aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {themeMode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2, boxShadow: '0 10px 24px rgba(15,23,42,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm ${
              themeMode === 'dark'
                ? 'bg-emerald-950/80 text-emerald-200'
                : 'bg-white text-slate-600'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
          </motion.button>
          <div
            className={`h-11 w-11 overflow-hidden rounded-full border shadow-sm ${
              themeMode === 'dark' ? 'border-emerald-900/60' : 'border-slate-200'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export const Topbar = memo(TopbarComponent)
