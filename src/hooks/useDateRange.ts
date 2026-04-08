import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { hasValidRange, normalizeRange } from '../utils/dateHelpers'

export function useDateRange(initialStart: string, initialEnd: string) {
  const [selectionStart, setSelectionStart] = useState(initialStart)
  const [selectionEnd, setSelectionEnd] = useState(initialEnd)
  const [draftSelectionStart, setDraftSelectionStart] = useState<string | null>(null)
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const selectedRange = useMemo(
    () => ({ selectionStart, selectionEnd, draftSelectionStart, hoveredDate }),
    [draftSelectionStart, hoveredDate, selectionEnd, selectionStart],
  )

  function handleDayClick(date: string) {
    if (!dayjs(date).isValid()) return

    if (!draftSelectionStart || draftSelectionStart === selectionStart) {
      setDraftSelectionStart(date)
      setSelectionStart(date)
      setSelectionEnd(date)
      setHoveredDate(null)
      return
    }

    const range = normalizeRange(draftSelectionStart, date)
    setSelectionStart(range.startDate)
    setSelectionEnd(range.endDate)
    setDraftSelectionStart(null)
    setHoveredDate(null)
  }

  function setRange(startDate: string, endDate: string) {
    if (!hasValidRange(startDate, endDate)) return false
    const normalized = normalizeRange(startDate, endDate)
    setSelectionStart(normalized.startDate)
    setSelectionEnd(normalized.endDate)
    setDraftSelectionStart(null)
    setHoveredDate(null)
    return true
  }

  function isBetween(date: string) {
    return (
      dayjs(date).isAfter(dayjs(selectionStart), 'day') &&
      dayjs(date).isBefore(dayjs(selectionEnd), 'day')
    )
  }

  function isPreviewBetween(date: string) {
    if (!draftSelectionStart || !hoveredDate || !dayjs(hoveredDate).isValid()) return false

    const range = normalizeRange(draftSelectionStart, hoveredDate)
    return (
      dayjs(date).isAfter(dayjs(range.startDate), 'day') &&
      dayjs(date).isBefore(dayjs(range.endDate), 'day')
    )
  }

  function beginDragSelection(date: string) {
    if (!dayjs(date).isValid()) return
    setDraftSelectionStart(date)
    setSelectionStart(date)
    setSelectionEnd(date)
    setHoveredDate(date)
    setIsDragging(true)
  }

  function updateDragSelection(date: string) {
    if (!isDragging || !draftSelectionStart || !dayjs(date).isValid()) return
    setHoveredDate(date)
    const range = normalizeRange(draftSelectionStart, date)
    setSelectionStart(range.startDate)
    setSelectionEnd(range.endDate)
  }

  function endDragSelection(date?: string) {
    if (!isDragging) return

    if (date && draftSelectionStart && dayjs(date).isValid()) {
      const range = normalizeRange(draftSelectionStart, date)
      setSelectionStart(range.startDate)
      setSelectionEnd(range.endDate)
    }

    setDraftSelectionStart(null)
    setHoveredDate(null)
    setIsDragging(false)
  }

  function resetSelection() {
    setSelectionStart(initialStart)
    setSelectionEnd(initialEnd)
    setDraftSelectionStart(null)
    setHoveredDate(null)
    setIsDragging(false)
  }

  return {
    ...selectedRange,
    beginDragSelection,
    clearHoveredDate: () => setHoveredDate(null),
    endDragSelection,
    handleDayClick,
    isDragging,
    isBetween,
    isPreviewBetween,
    resetSelection,
    setHoveredDate,
    setRange,
    updateDragSelection,
  }
}
