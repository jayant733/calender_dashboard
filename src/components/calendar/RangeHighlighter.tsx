import { memo } from 'react'
import { motion } from 'motion/react'
import { getRangeLabel } from '../../utils/dateHelpers'

type RangeHighlighterProps = {
  startDate: string
  endDate: string
  noteCount: number
}

function RangeHighlighterComponent({ endDate, noteCount, startDate }: RangeHighlighterProps) {
  return (
    <motion.div
      layout
      className="rounded-[24px] bg-slate-50/80 p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <p className="font-label text-[11px] uppercase tracking-[0.35em] text-slate-400">Selected Range</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <motion.p layout className="font-headline text-2xl font-bold tracking-tight text-slate-950">
          {getRangeLabel(startDate, endDate)}
        </motion.p>
        <motion.span
          layout
          className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#006193]"
        >
          {noteCount} linked notes
        </motion.span>
      </div>
    </motion.div>
  )
}

export const RangeHighlighter = memo(RangeHighlighterComponent)
