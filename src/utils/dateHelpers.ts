import dayjs from 'dayjs'
import { type CalendarDay } from '../types'

export function isValidDateInput(value: string) {
  return dayjs(value).isValid()
}

export function hasValidRange(startDate: string, endDate: string) {
  return isValidDateInput(startDate) && isValidDateInput(endDate)
}

export function normalizeRange(first: string, second: string) {
  if (!hasValidRange(first, second)) {
    return { startDate: first, endDate: second }
  }

  return dayjs(first).isAfter(dayjs(second))
    ? { startDate: second, endDate: first }
    : { startDate: first, endDate: second }
}

export function isDateWithinRange(date: string, startDate: string, endDate: string) {
  if (!hasValidRange(date, startDate) || !isValidDateInput(endDate)) return false

  const target = dayjs(date)
  return (
    (target.isAfter(dayjs(startDate), 'day') && target.isBefore(dayjs(endDate), 'day')) ||
    target.isSame(dayjs(startDate), 'day') ||
    target.isSame(dayjs(endDate), 'day')
  )
}

export function getRangeLabel(startDate: string, endDate: string) {
  if (!hasValidRange(startDate, endDate)) return 'Invalid date range'
  if (startDate === endDate) return dayjs(startDate).format('MMM DD, YYYY')
  return `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('MMM DD, YYYY')}`
}

export function createCalendarDays(month: dayjs.Dayjs) {
  const start = month.startOf('month').startOf('week')
  const end = month.endOf('month').endOf('week')
  const days: CalendarDay[] = []
  let cursor = start

  while (cursor.isBefore(end) || cursor.isSame(end, 'day')) {
    days.push({ date: cursor, isCurrentMonth: cursor.month() === month.month() })
    cursor = cursor.add(1, 'day')
  }

  return days
}

export function createYearMonthGrid(year: number, monthIndex: number) {
  const month = dayjs(`${year}-${String(monthIndex + 1).padStart(2, '0')}-01`)
  const startOffset = (month.startOf('month').day() + 6) % 7
  const start = month.startOf('month').subtract(startOffset, 'day')
  const endOffset = 6 - ((month.endOf('month').day() + 6) % 7)
  const end = month.endOf('month').add(endOffset, 'day')
  const days: CalendarDay[] = []
  let cursor = start

  while (cursor.isBefore(end) || cursor.isSame(end, 'day')) {
    days.push({ date: cursor, isCurrentMonth: cursor.month() === monthIndex })
    cursor = cursor.add(1, 'day')
  }

  return days
}
