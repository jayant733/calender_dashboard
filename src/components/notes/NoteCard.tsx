import { memo } from 'react'
import { motion } from 'motion/react'
import { NotebookPen, Send, StickyNote } from 'lucide-react'
import { type CalendarNote } from '../../types'
import { getRangeLabel } from '../../utils/dateHelpers'

type NoteCardProps = {
  note: CalendarNote
  delay?: number
}

function NoteCardComponent({ note }: NoteCardProps) {
  return (
    <motion.article
      layout="position"
      variants={{
        hidden: { opacity: 0, scale: 0.98, y: 12 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
      }}
      whileHover={{ y: -2 }}
      className="group overflow-hidden rounded-[30px] border border-white/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm"
    >
      {note.image ? (
        <div className="relative h-36 overflow-hidden">
          <img
            src={note.image}
            alt={note.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        </div>
      ) : null}
      <div className="flex h-full min-h-[260px] flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="font-label text-[11px] uppercase tracking-[0.35em] text-slate-400">
            {getRangeLabel(note.startDate, note.endDate)}
          </p>
          {note.pinned ? <StickyNote className="h-4 w-4 text-[#006193]" /> : null}
        </div>
        <h3 className="mt-4 font-headline text-3xl font-bold leading-tight tracking-tight text-slate-900 transition group-hover:text-[#006193]">
          {note.title}
        </h3>
        <div className="mt-4 flex-1 bg-[linear-gradient(180deg,transparent_31px,rgba(191,199,210,0.2)_31px)] bg-[length:100%_2rem]">
          <p className="line-clamp-4 leading-8 text-slate-500">{note.description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {note.category}
          </span>
          <div className="flex items-center gap-3 text-slate-300">
            <NotebookPen className="h-4 w-4" />
            <Send className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export const NoteCard = memo(NoteCardComponent)
