import { motion } from 'motion/react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { mondayWeekdayLabels } from '../../utils/mockData'
import { type CalendarDay } from '../../types'

type MonthCardProps = {
  monthDays: CalendarDay[]
  monthIndex: number
  noteStartDates: Set<string>
  onOpenMonth: (monthIndex: number) => void
}

export function MonthCard({ monthDays, monthIndex, noteStartDates, onOpenMonth }: MonthCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpenMonth(monthIndex)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay: monthIndex * 0.03 }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 20px 40px rgba(25,28,29,0.08)' }}
      whileTap={{ scale: 0.98 }}
      className="rounded-[28px] border border-white/80 bg-white/90 p-6 text-left shadow-[0_12px_32px_rgba(25,28,29,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(25,28,29,0.08)]"
    >
      <h3 className="mb-4 border-b border-slate-100 pb-3 font-headline text-xl font-bold tracking-tight text-[#006193]">
        {dayjs().month(monthIndex).format('MMMM').toUpperCase()}
      </h3>
      <div className="mb-3 grid grid-cols-7 gap-y-2 text-center text-[10px] font-label text-slate-400">
        {mondayWeekdayLabels.map((label) => (
          <span key={`${monthIndex}-${label}`}>{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {monthDays.map(({ date, isCurrentMonth }) => {
          const iso = date.format('YYYY-MM-DD')
          return (
            <span
              key={iso}
              className={clsx(
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                !isCurrentMonth && 'text-slate-300',
                noteStartDates.has(iso) && 'bg-[#006193] font-semibold text-white',
              )}
            >
              {date.date()}
            </span>
          )
        })}
      </div>
    </motion.button>
  )
}
