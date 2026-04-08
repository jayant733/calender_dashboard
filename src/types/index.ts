import dayjs from 'dayjs'

export type ViewKey = 'monthly' | 'quarterly' | 'yearly' | 'schedule' | 'notes'

export type CalendarNote = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  category: string
  pinned?: boolean
  image?: string
}

export type CalendarDay = {
  date: dayjs.Dayjs
  isCurrentMonth: boolean
}

export type ScheduleEntry = {
  time: string
  title: string
  category: string
  tone: string
  description: string
  noteStyle?: boolean
  completed?: boolean
  tomorrow?: boolean
}

export type QuarterlyMilestone = {
  monthLabel: string
  monthName: string
  keyMilestone: string
  keyMilestoneDates: string
  keyMilestoneDescription: string
  rangeStart: number
  rangeEnd: number
  featuredDay: number
  urgentDay?: number
}

export type DateRangeState = {
  selectionStart: string
  selectionEnd: string
  draftSelectionStart: string | null
  hoveredDate: string | null
}

export type NotesError = {
  title: string
  message: string
}
