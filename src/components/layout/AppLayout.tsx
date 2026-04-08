import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useAppContext } from '../../context/AppContext'
import { ErrorBanner } from '../common/ErrorBanner'
import { RouteSkeleton } from '../common/RouteSkeleton'
import { NoteModal } from '../notes/NoteModal'
import { type ViewKey } from '../../types'

const routeViewMap: Record<string, ViewKey> = {
  '/monthly': 'monthly',
  '/quarterly': 'quarterly',
  '/yearly': 'yearly',
  '/schedule': 'schedule',
  '/notes': 'notes',
}

export function AppLayout() {
  const location = useLocation()
  const { isMobileMenuOpen, notesApi, setActiveView, setIsMobileMenuOpen, themeMode } = useAppContext()

  useEffect(() => {
    setActiveView(routeViewMap[location.pathname] ?? 'monthly')
  }, [location.pathname, setActiveView])

  return (
    <div
      className={`min-h-screen text-slate-900 ${
        themeMode === 'dark'
          ? 'bg-[radial-gradient(circle_at_top,#12332d_0%,#081113_45%,#040809_100%)] text-emerald-50'
          : 'bg-[linear-gradient(135deg,#f8f9fa_0%,#eef2f6_60%,#dde6ec_100%)]'
      }`}
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.button
              key="backdrop"
              type="button"
              className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ) : null}
        </AnimatePresence>
        <Sidebar />
        <main className="min-w-0 flex-1 pb-20 pt-[84px] lg:pb-0">
          <Topbar />
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {notesApi.error ? <ErrorBanner error={notesApi.error} onDismiss={notesApi.clearError} /> : null}
            {notesApi.isLoading ? (
              <RouteSkeleton />
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
      <MobileNav />
      <NoteModal />
    </div>
  )
}
