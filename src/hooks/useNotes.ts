import { useEffect, useMemo, useState } from 'react'
import { type CalendarNote, type NotesError } from '../types'
import { STORAGE_KEY, initialNotes } from '../utils/mockData'
import { hasValidRange } from '../utils/dateHelpers'

export function useNotes() {
  const [notes, setNotes] = useState<CalendarNote[]>(initialNotes)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<NotesError | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) {
          setNotes(initialNotes)
        } else {
          const parsed = JSON.parse(raw) as CalendarNote[]
          setNotes(parsed.filter((note) => hasValidRange(note.startDate, note.endDate)))
        }
      } catch {
        setError({
          title: 'Storage unavailable',
          message: 'Saved notes could not be loaded. Using local defaults for this session.',
        })
        setNotes(initialNotes)
      } finally {
        setIsLoading(false)
      }
    }, 160)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
      if (error?.title === 'Storage unavailable') setError(null)
    } catch {
      setError({
        title: 'Storage unavailable',
        message: 'Changes are visible now, but the browser could not persist them locally.',
      })
    }
  }, [error?.title, isLoading, notes])

  const api = useMemo(
    () => ({
      createNote(note: CalendarNote) {
        if (!hasValidRange(note.startDate, note.endDate)) {
          setError({
            title: 'Invalid dates',
            message: 'The note could not be saved because the selected date range is invalid.',
          })
          return false
        }
        setNotes((current) => [note, ...current])
        return true
      },
      updateNote(id: string, updates: Partial<CalendarNote>) {
        setNotes((current) => current.map((note) => (note.id === id ? { ...note, ...updates } : note)))
      },
      deleteNote(id: string) {
        setNotes((current) => current.filter((note) => note.id !== id))
      },
      clearError() {
        setError(null)
      },
      setNotes,
    }),
    [],
  )

  return { error, isLoading, notes, ...api }
}
