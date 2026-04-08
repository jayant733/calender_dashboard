import { motion } from 'motion/react'
import { FileText, Plus, Search } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { EmptyState } from './EmptyState'
import { NoteCard } from './NoteCard'
import { PageTransition } from '../common/PageTransition'

export function NotesView() {
  const { filteredNotes, notesApi, notesSearchQuery, openComposer, setNotesSearchQuery } = useAppContext()

  return (
    <PageTransition>
      <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Notes</h2>
          <p className="mt-2 max-w-2xl text-lg text-slate-500">
            A curated archive of editorial insights and chronological drafts.
          </p>
        </div>
        <button
          type="button"
          onClick={openComposer}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#006193] px-6 py-3 font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#007bb9]"
        >
          <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2">
            <Plus className="h-5 w-5" />Add Note
          </motion.span>
        </button>
      </div>

      <label className="flex items-center gap-3 rounded-[28px] border border-white/70 bg-white/85 px-5 py-4 text-slate-400 shadow-sm transition duration-200 focus-within:scale-[1.01] focus-within:shadow-md">
        <Search className="h-5 w-5" />
        <input
          value={notesSearchQuery}
          onChange={(event) => setNotesSearchQuery(event.target.value)}
          placeholder="Search archive, tags, or chronological markers..."
          className="w-full bg-transparent text-base outline-none placeholder:text-slate-300"
        />
      </label>

      {notesApi.notes.length === 0 ? (
        <EmptyState mode="empty" onAdd={openComposer} />
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          mode="search"
          onAdd={openComposer}
          onClear={() => setNotesSearchQuery('')}
          query={notesSearchQuery}
        />
      ) : (
        <motion.div
          layout
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
          }}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
          <motion.button
            layout
            type="button"
            onClick={openComposer}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex min-h-[320px] flex-col items-center justify-center rounded-[30px] border border-dashed border-slate-300 bg-white/60 px-6 text-center text-slate-400 transition hover:border-[#006193] hover:text-[#006193]"
          >
            <FileText className="mb-4 h-12 w-12" />
            <p className="font-headline text-2xl font-bold">Create new chronological note</p>
            <p className="mt-2 text-sm">Start drafting your next insight</p>
          </motion.button>
        </motion.div>
      )}
      </div>
    </PageTransition>
  )
}
