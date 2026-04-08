import { motion } from 'motion/react'
import { FileText, Plus, SquarePen } from 'lucide-react'

type EmptyStateProps = {
  mode: 'empty' | 'search'
  query?: string
  onAdd: () => void
  onClear?: () => void
}

export function EmptyState({ mode, onAdd, onClear, query }: EmptyStateProps) {
  if (mode === 'search') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className="rounded-[36px] border border-white/80 bg-white/90 p-10 text-center shadow-[0_25px_60px_rgba(15,23,42,0.1)]"
      >
        <h3 className="font-headline text-3xl font-bold tracking-tight text-slate-950">
          No matching notes
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-500">
          No notes matched "{query}". Try a different keyword or clear the search.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <motion.button
            type="button"
            onClick={onClear}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear Search
          </motion.button>
          <motion.button
            type="button"
            onClick={onAdd}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl bg-[#006193] px-5 py-3 font-semibold text-white transition hover:bg-[#007bb9]"
          >
            Add Note
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[36px] border border-white/80 bg-[radial-gradient(circle_at_top_right,rgba(0,123,185,0.08),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fbfd_100%)] px-6 py-16 shadow-[0_25px_60px_rgba(15,23,42,0.1)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-sky-200 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_31px,rgba(191,199,210,0.35)_31px)] bg-[length:100%_2rem]" />
      </div>
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        <div className="relative mb-10">
          <div className="flex h-32 w-32 items-center justify-center rounded-[28px] bg-white shadow-[0_12px_32px_rgba(25,28,29,0.06)] ring-1 ring-slate-200">
            <SquarePen className="h-14 w-14 text-[#006193]/35" />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-10 w-10 rotate-12 items-center justify-center rounded-xl bg-sky-200 text-[#006193] shadow-sm">
            <Plus className="h-5 w-5" />
          </div>
        </div>
        <h3 className="font-headline text-5xl font-bold tracking-tight text-slate-950">No notes yet</h3>
        <p className="mt-4 text-lg leading-9 text-slate-500">
          Capture your editorial thoughts, research snippets, and calendar reminders. Start by adding your first note.
        </p>
        <motion.button
          type="button"
          onClick={onAdd}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#006193] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#007bb9]"
        >
          <FileText className="h-5 w-5" />+ Add Note
        </motion.button>
      </div>
    </motion.div>
  )
}
