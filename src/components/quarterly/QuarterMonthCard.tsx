import { motion } from 'motion/react'
import clsx from 'clsx'
import { type QuarterlyMilestone } from '../../types'
import { mondayWeekdayLabels } from '../../utils/mockData'
import { createYearMonthGrid } from '../../utils/dateHelpers'

type QuarterMonthCardProps = {
  milestone: QuarterlyMilestone
  monthIndex: number
}

export function QuarterMonthCard({ milestone, monthIndex }: QuarterMonthCardProps) {
  const monthDays = createYearMonthGrid(2024, monthIndex)

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay: monthIndex * 0.04 }}
      whileHover={{ y: -3, boxShadow: '0 18px 36px rgba(25,28,29,0.08)' }}
      className="rounded-[30px] border border-white/80 bg-white/90 p-8 shadow-[0_12px_32px_rgba(25,28,29,0.04)]"
    >
      <div className="mb-8 flex items-baseline justify-between">
        <h3 className="font-headline text-6xl font-light text-slate-300">{milestone.monthLabel}</h3>
        <span className="font-headline text-3xl font-bold tracking-tight text-slate-950">
          {milestone.monthName.toUpperCase()}
        </span>
      </div>
      <div className="mb-6 grid grid-cols-7 gap-y-4 text-center text-[10px] font-label font-semibold uppercase tracking-[0.2em] text-slate-400">
        {mondayWeekdayLabels.map((label) => <span key={`${milestone.monthName}-${label}`}>{label}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
        {monthDays.map(({ date, isCurrentMonth }) => {
          const dayNumber = date.date()
          const inRange = isCurrentMonth && dayNumber >= milestone.rangeStart && dayNumber <= milestone.rangeEnd
          const isFeatured = isCurrentMonth && dayNumber === milestone.featuredDay
          const isUrgent = isCurrentMonth && dayNumber === milestone.urgentDay

          return (
            <div key={date.format('YYYY-MM-DD')} className="relative py-1">
              <span
                className={clsx(
                  'relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                  !isCurrentMonth && 'text-slate-300',
                  inRange && 'rounded-none bg-sky-50 text-slate-900',
                  inRange && dayNumber === milestone.rangeStart && 'rounded-l-full',
                  inRange && dayNumber === milestone.rangeEnd && 'rounded-r-full',
                  isFeatured && monthIndex === 0 && 'bg-[#006193] font-semibold text-white',
                  isFeatured && monthIndex === 1 && 'font-bold text-[#006193]',
                  isFeatured && monthIndex === 2 && 'bg-sky-900 font-semibold text-white',
                )}
              >
                {String(dayNumber).padStart(2, '0')}
              </span>
              {isUrgent ? <span className="absolute right-2 top-0 h-2 w-2 rounded-full bg-rose-500" /> : null}
            </div>
          )
        })}
      </div>
      <div className="mt-8 border-t border-slate-100 pt-8">
        <p className="mb-3 font-label text-[10px] font-bold uppercase tracking-[0.35em] text-[#006193]">Key Milestone</p>
        <h4 className="font-headline text-xl font-bold text-slate-950">{milestone.keyMilestone}</h4>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          {milestone.keyMilestoneDates}: {milestone.keyMilestoneDescription}
        </p>
      </div>
    </motion.article>
  )
}
