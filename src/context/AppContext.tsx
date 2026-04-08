import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useDateRange } from '../hooks/useDateRange'
import { useNotes } from '../hooks/useNotes'
import { createCalendarDays, createYearMonthGrid, isDateWithinRange } from '../utils/dateHelpers'
import { heroImages } from '../utils/mockData'
import { type ViewKey } from '../types'

type AppContextValue = ReturnType<typeof useAppState>

const AppContext = createContext<AppContextValue | null>(null)

function useAppState() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem('chronology-theme') === 'dark' ? 'dark' : 'light'
  })
  const [activeView, setActiveView] = useState<ViewKey>('monthly')
  const [currentMonth, setCurrentMonth] = useState(dayjs('2026-01-01'))
  const [scheduleDay] = useState(dayjs('2026-09-24'))
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const [notesSearchQuery, setNotesSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [routeLoading, setRouteLoading] = useState(false)

  const notesApi = useNotes()
  const dateRange = useDateRange('2026-01-15', '2026-01-22')
  const heroImage = heroImages[currentMonth.month() % heroImages.length]
  const calendarDays = useMemo(() => createCalendarDays(currentMonth), [currentMonth])

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', themeMode === 'dark')
    window.localStorage.setItem('chronology-theme', themeMode)
  }, [themeMode])

  const filteredNotes = useMemo(() => {
    const query = notesSearchQuery.toLowerCase().trim()
    if (!query) return notesApi.notes

    return notesApi.notes.filter((note) =>
      [note.title, note.description, note.category].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [notesApi.notes, notesSearchQuery])

  const selectedNotes = useMemo(
    () =>
      notesApi.notes.filter((note) =>
        isDateWithinRange(note.startDate, dateRange.selectionStart, dateRange.selectionEnd) ||
        isDateWithinRange(note.endDate, dateRange.selectionStart, dateRange.selectionEnd) ||
        isDateWithinRange(dateRange.selectionStart, note.startDate, note.endDate),
      ),
    [dateRange.selectionEnd, dateRange.selectionStart, notesApi.notes],
  )

  const yearlyMonths = useMemo(
    () => Array.from({ length: 12 }, (_, index) => createYearMonthGrid(currentMonth.year(), index)),
    [currentMonth],
  )

  const noteStartDates = useMemo(
    () =>
      new Set(
        notesApi.notes
          .map((note) => dayjs(note.startDate))
          .filter((date) => date.year() === currentMonth.year())
          .map((date) => date.format('YYYY-MM-DD')),
      ),
    [currentMonth, notesApi.notes],
  )

  function openComposer() {
    setIsModalOpen(true)
  }

  return {
    activeView,
    calendarDays,
    currentMonth,
    dateRange,
    filteredNotes,
    globalSearchQuery,
    heroImage,
    isMobileMenuOpen,
    isModalOpen,
    noteStartDates,
    notesSearchQuery,
    notesApi,
    openComposer,
    routeLoading,
    scheduleDay,
    selectedNotes,
    setActiveView,
    setCurrentMonth,
    setGlobalSearchQuery,
    setIsMobileMenuOpen,
    setIsModalOpen,
    setNotesSearchQuery,
    setRouteLoading,
    setThemeMode,
    themeMode,
    toggleTheme: () => setThemeMode((current) => (current === 'dark' ? 'light' : 'dark')),
    yearlyMonths,
  }
}

export function AppProvider({ children }: PropsWithChildren) {
  const value = useAppState()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
