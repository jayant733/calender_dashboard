import { memo } from 'react'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { type CalendarDay, type CalendarNote } from '../../types'

type DayCellProps = {
  isDragging: boolean
  onDragEnd: () => void
  onDragStart: (date: string) => void
  onDragUpdate: (date: string) => void
  onNavigate: (date: string, delta: number) => void
  onHover: (date: string) => void
  onHoverEnd: () => void
  day: CalendarDay
  notes: CalendarNote[]
  selectionStart: string
  selectionEnd: string
  isBetween: (date: string) => boolean
  isPreviewBetween: (date: string) => boolean
  onSelect: (date: string) => void
}

function DayCellComponent({
  day,
  isBetween,
  isDragging,
  isPreviewBetween,
  notes,
  onDragEnd,
  onDragStart,
  onDragUpdate,
  onNavigate,
  onHover,
  onHoverEnd,
  onSelect,
  selectionEnd,
  selectionStart,
}: DayCellProps) {
  const iso = day.date.format('YYYY-MM-DD')
  const isStart = iso === selectionStart
  const isEnd = iso === selectionEnd
  const inRange = isBetween(iso)
  const inPreview = isPreviewBetween(iso)

  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.14, ease: 'easeOut' } },
      }}
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={() => onSelect(iso)}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' || event.pointerType === 'touch' || event.pointerType === 'pen') {
          onDragStart(iso)
        }
      }}
      onPointerEnter={() => {
        onHover(iso)
        if (isDragging) onDragUpdate(iso)
      }}
      onPointerUp={() => onDragEnd()}
      onMouseEnter={() => onHover(iso)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHover(iso)}
      onBlur={onHoverEnd}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          onNavigate(iso, 1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          onNavigate(iso, -1)
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          onNavigate(iso, 7)
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          onNavigate(iso, -7)
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(iso)
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          onDragEnd()
          onHoverEnd()
        }
      }}
      aria-label={`${day.date.format('dddd, MMMM D, YYYY')}${notes.length ? `, ${notes.length} notes` : ''}`}
      data-calendar-date={iso}
      className={clsx(
        'group relative min-h-[112px] select-none border-b border-r border-slate-100 p-3 text-left transition outline-none duration-150 sm:min-h-[140px] sm:p-4',
        day.isCurrentMonth ? 'bg-white' : 'bg-slate-50/50 text-slate-300',
        inPreview && 'bg-sky-50/55',
        'focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#006193] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      )}
    >
      {inRange || inPreview ? (
        <motion.div
          layout
          className={clsx(
            'absolute inset-y-1 rounded-xl',
            inRange ? 'bg-sky-100/90' : 'bg-sky-50/80',
            isStart && 'left-1 right-1 sm:left-2 sm:right-0',
            isEnd && 'left-1 right-1 sm:left-0 sm:right-2',
            !isStart && !isEnd && 'inset-x-0 rounded-none',
          )}
          initial={{ opacity: 0, scaleX: 0.72 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{ originX: 0 }}
        />
      ) : null}
      <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center">
        {isStart || isEnd ? (
          <motion.span
            layoutId={isStart ? 'calendar-selected-start' : 'calendar-selected-end'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#006193] font-headline text-lg text-white"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            {day.date.date()}
          </motion.span>
        ) : (
          <span
            className={clsx(
              'inline-flex h-9 w-9 items-center justify-center rounded-full font-headline text-lg transition duration-150',
              day.isCurrentMonth ? 'text-slate-900' : 'text-slate-300',
            )}
          >
            {day.date.date()}
          </span>
        )}
      </span>
      <div className="relative z-10 mt-3 space-y-1">
        {notes.slice(0, 2).map((note) => (
          <div
            key={`${note.id}-${iso}`}
            className="max-w-full truncate rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500"
          >
            {note.title}
          </div>
        ))}
        {notes.length > 2 ? (
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#006193]">
            +{notes.length - 2} more
          </div>
        ) : null}
      </div>
    </motion.button>
  )
}

export const DayCell = memo(DayCellComponent)
