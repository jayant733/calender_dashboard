import { motion } from 'motion/react'
import { memo } from 'react'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

function TopbarComponent() {
  const { globalSearchQuery, setGlobalSearchQuery, setIsMobileMenuOpen, themeMode, toggleTheme } =
    useAppContext()

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-emerald-900/50 dark:bg-[#071113]/80">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="font-headline text-xl font-extrabold tracking-tight text-[#006193] sm:text-3xl">
            Editorial Chronology
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <label className="hidden items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500 shadow-inner transition duration-200 focus-within:scale-[1.02] focus-within:shadow-md sm:flex dark:bg-emerald-950/70 dark:text-emerald-200">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm dark:bg-emerald-950/80 dark:text-emerald-200"
            aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {themeMode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2, boxShadow: '0 10px 24px rgba(15,23,42,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm dark:bg-emerald-950/80 dark:text-emerald-200"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
          </motion.button>
          <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200 shadow-sm dark:border-emerald-900/60">
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
