import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { isDateWithinRange } from '../../utils/dateHelpers'
import { CalendarGrid } from './CalendarGrid'
import { RangeHighlighter } from './RangeHighlighter'
import { NotesPanel } from '../notes/NotesPanel'
import { PageTransition } from '../common/PageTransition'
import { Skeleton } from '../common/Skeleton'

export function MonthlyView() {
  const { calendarDays, currentMonth, dateRange, heroImage, notesApi, selectedNotes, setCurrentMonth } =
    useAppContext()
  const [isCalendarLoading, setIsCalendarLoading] = useState(false)

  useEffect(() => {
    setIsCalendarLoading(true)
    const timer = window.setTimeout(() => setIsCalendarLoading(false), 160)
    return () => window.clearTimeout(timer)
  }, [currentMonth])

  function getNotesForDay(isoDate: string) {
    return notesApi.notes.filter((note) => isDateWithinRange(isoDate, note.startDate, note.endDate))
  }

  return (
    <PageTransition>
      <section className="space-y-8">
        <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/75 p-3 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
      >
        <div className="relative h-[280px] overflow-hidden rounded-[30px] sm:h-[380px]">
          <img src={heroImage} alt="Editorial calendar hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(10,78,121,0.48),rgba(4,27,45,0.08),rgba(225,178,70,0.34))]" />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,12,27,0.55),transparent_58%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute bottom-6 left-6 max-w-[70%] text-white sm:bottom-10 sm:left-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04, ease: 'easeOut' }}
          >
            <p className="font-label text-[11px] uppercase tracking-[0.45em] text-white/80">Archive Series</p>
            <h2 className="mt-3 font-headline text-4xl font-light tracking-tight sm:text-7xl">
              {currentMonth.format('MMMM YYYY')}
            </h2>
            <p className="mt-3 font-headline text-lg italic text-white/80 sm:text-2xl">
              Climbing Season — Peak Performance
            </p>
          </motion.div>
        </div>
        </motion.section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.04, ease: 'easeOut' }}
          className="space-y-6 rounded-[36px] border border-white/80 bg-white/85 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6"
          onKeyDownCapture={(event) => {
            if (event.key === 'Escape') {
              dateRange.resetSelection()
            }
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-label text-[11px] uppercase tracking-[0.4em] text-slate-400">Interactive Calendar</p>
              <h3 className="mt-2 font-headline text-3xl font-bold tracking-tight text-slate-950">
                {currentMonth.format('MMMM YYYY')}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => setCurrentMonth((month) => month.subtract(1, 'month'))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-[#006193]"><ChevronLeft className="h-5 w-5" /></motion.button>
              <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => setCurrentMonth((month) => month.add(1, 'month'))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-[#006193]"><ChevronRight className="h-5 w-5" /></motion.button>
            </div>
          </div>
          <RangeHighlighter startDate={dateRange.selectionStart} endDate={dateRange.selectionEnd} noteCount={selectedNotes.length} />
          {isCalendarLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-14 w-full rounded-[20px]" />
              <Skeleton className="h-[620px] w-full rounded-[28px]" />
            </div>
          ) : (
            <CalendarGrid
              days={calendarDays}
              getNotesForDay={getNotesForDay}
              isDragging={dateRange.isDragging}
              isBetween={dateRange.isBetween}
              isPreviewBetween={dateRange.isPreviewBetween}
              onDragEnd={() => dateRange.endDragSelection()}
              onDragStart={dateRange.beginDragSelection}
              onDragUpdate={dateRange.updateDragSelection}
              onHover={dateRange.setHoveredDate}
              onHoverEnd={dateRange.clearHoveredDate}
              onSelect={dateRange.handleDayClick}
              selectionStart={dateRange.selectionStart}
              selectionEnd={dateRange.selectionEnd}
            />
          )}
          </motion.section>
          <NotesPanel />
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            ['Planned Coverage', '12', '+2 from Dec'],
            ['Ad Slots Filled', '84%', 'Ahead of target'],
            ['Team Allocation', '8', 'Cross-functional editors'],
          ].map(([label, value, meta]) => (
            <div key={label} className="rounded-[30px] border border-white/80 bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
              <p className="font-label text-[11px] uppercase tracking-[0.35em] text-slate-400">{label}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <span className="font-headline text-5xl font-light tracking-tight text-slate-950">{value}</span>
                <span className="text-sm font-semibold text-[#006193]">{meta}</span>
              </div>
            </div>
          ))}
        </section>
      </section>
    </PageTransition>
  )
}
