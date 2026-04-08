import { motion } from 'motion/react'
import clsx from 'clsx'
import { type ScheduleEntry } from '../../types'

type TimelineItemProps = {
  entry: ScheduleEntry
}

export function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={{ x: 2 }}
      className="rounded-[24px] transition-colors duration-200 hover:bg-white/35"
    >
      <div className="flex gap-6 sm:gap-10">
        <div className="w-24 shrink-0 pt-1">
          <span className={clsx('font-label text-sm font-bold tracking-tight', entry.completed ? 'text-slate-300' : 'text-[#006193]')}>
            {entry.time}
          </span>
        </div>
        <div className={clsx('flex-1 pb-3', entry.noteStyle && 'border-l-2 border-sky-100 pl-6')}>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className={clsx('font-headline text-3xl font-bold tracking-tight', entry.completed ? 'text-slate-400 line-through' : 'text-slate-950')}>
              {entry.title}
            </h3>
            <span className={clsx('rounded-md px-3 py-1 text-[10px] font-label uppercase tracking-[0.25em]', entry.tone)}>
              {entry.category}
            </span>
          </div>
          <p className={clsx('max-w-3xl text-xl leading-8', entry.noteStyle ? 'italic text-slate-600' : 'text-slate-600', entry.completed && 'text-slate-300')}>
            {entry.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
