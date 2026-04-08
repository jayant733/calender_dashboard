import { memo } from 'react'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { getRangeLabel } from '../../utils/dateHelpers'

function NotesPanelComponent() {
  const { dateRange, openComposer, selectedNotes } = useAppContext()

  return (
    <motion.aside
      initial={{ opacity: 0, x: 18, y: 18 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.18, delay: 0.06, ease: 'easeOut' }}
      className="rounded-[36px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    >
      <div className="mb-8">
        <h3 className="font-headline text-4xl font-bold tracking-tight text-slate-950">Notes</h3>
        <p className="mt-2 font-label text-[11px] uppercase tracking-[0.35em] text-[#006193]">
          {getRangeLabel(dateRange.selectionStart, dateRange.selectionEnd)}
        </p>
      </div>
      <div className="space-y-6 bg-[linear-gradient(180deg,transparent_31px,rgba(191,199,210,0.2)_31px)] bg-[length:100%_2rem] pb-4">
        {selectedNotes.length ? (
          selectedNotes.map((note) => (
            <article key={note.id} className="border-b border-slate-100/80 pb-4">
              <h4 className="font-headline text-2xl font-bold tracking-tight text-slate-950">{note.title}</h4>
              <p className="mt-2 text-sm font-medium text-slate-400">
                {getRangeLabel(note.startDate, note.endDate)}
              </p>
              <p className="mt-2 leading-8 text-slate-500">{note.description}</p>
            </article>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50/60 p-5">
            <p className="font-headline text-xl font-bold text-slate-800">No notes in this date range</p>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Select a different range or add a new note tied to these days.
            </p>
          </div>
        )}
      </div>
      <motion.button
        type="button"
        onClick={openComposer}
        whileHover={{ y: -2, boxShadow: '0 18px 40px rgba(12,74,110,0.22)' }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#006193] px-5 py-4 font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#007bb9]"
      >
        <Plus className="h-5 w-5" />Add Event
      </motion.button>
    </motion.aside>
  )
}

export const NotesPanel = memo(NotesPanelComponent)
