import { memo, useCallback } from 'react'
import { motion } from 'motion/react'
import dayjs from 'dayjs'
import { weekdayLabels } from '../../utils/mockData'
import { DayCell } from './DayCell'
import { type CalendarDay, type CalendarNote } from '../../types'

type CalendarGridProps = {
  days: CalendarDay[]
  getNotesForDay: (isoDate: string) => CalendarNote[]
  isBetween: (date: string) => boolean
  isPreviewBetween: (date: string) => boolean
  isDragging: boolean
  onDragEnd: () => void
  onDragStart: (date: string) => void
  onDragUpdate: (date: string) => void
  onSelect: (date: string) => void
  onHover: (date: string) => void
  onHoverEnd: () => void
  selectionEnd: string
  selectionStart: string
}

function CalendarGridComponent(props: CalendarGridProps) {
  const {
    days,
    isDragging,
    getNotesForDay,
    isBetween,
    isPreviewBetween,
    onDragEnd,
    onDragStart,
    onDragUpdate,
    onHover,
    onHoverEnd,
    onSelect,
    selectionEnd,
    selectionStart,
  } = props
  const validDates = days.map((day) => day.date.format('YYYY-MM-DD'))

  const handleNavigate = useCallback(
    (date: string, delta: number) => {
      const nextDate = dayjs(date).add(delta, 'day').format('YYYY-MM-DD')
      if (!validDates.includes(nextDate)) return
      const target = document.querySelector<HTMLButtonElement>(`[data-calendar-date="${nextDate}"]`)
      target?.focus()
    },
    [validDates],
  )

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.012, delayChildren: 0.01 } },
      }}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-7 overflow-hidden rounded-[28px] border border-slate-100"
      role="grid"
      aria-label="Monthly calendar"
      onPointerUpCapture={() => onDragEnd()}
    >
      {weekdayLabels.map((weekday) => (
        <div
          key={weekday}
          className="border-b border-slate-100 bg-slate-50/70 px-2 py-4 text-center font-label text-[11px] font-bold uppercase tracking-[0.35em] text-slate-400"
        >
          {weekday}
        </div>
      ))}
      {days.map((day) => (
        <DayCell
          key={day.date.format('YYYY-MM-DD')}
          day={day}
          notes={getNotesForDay(day.date.format('YYYY-MM-DD'))}
          isDragging={isDragging}
          onNavigate={handleNavigate}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onHover={onHover}
          onHoverEnd={onHoverEnd}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          isBetween={isBetween}
          isPreviewBetween={isPreviewBetween}
          onSelect={onSelect}
        />
      ))}
    </motion.div>
  )
}

export const CalendarGrid = memo(CalendarGridComponent)
