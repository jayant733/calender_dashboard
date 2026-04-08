import { type FormEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { hasValidRange, normalizeRange } from '../../utils/dateHelpers'

export function NoteModal() {
  const { currentMonth, dateRange, isModalOpen, notesApi, setCurrentMonth, setIsModalOpen } = useAppContext()
  const [form, setForm] = useState({ title: '', startDate: '', endDate: '', description: '', category: 'Planning' })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (isModalOpen) {
      setFormError('')
      setForm({
        title: '',
        startDate: dateRange.selectionStart,
        endDate: dateRange.selectionEnd,
        description: '',
        category: 'Planning',
      })
    }
  }, [dateRange.selectionEnd, dateRange.selectionStart, isModalOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      setFormError('Please add both a title and description.')
      return
    }
    if (!hasValidRange(form.startDate, form.endDate)) {
      setFormError('Please choose a valid start and end date.')
      return
    }
    const normalized = normalizeRange(form.startDate, form.endDate)
    const success = notesApi.createNote({ ...form, id: crypto.randomUUID(), title: form.title.trim(), description: form.description.trim(), ...normalized })
    if (!success) {
      setFormError('The note could not be saved. Please review the date range and try again.')
      return
    }
    setCurrentMonth(currentMonth.year(dayjs(normalized.startDate).year()).month(dayjs(normalized.startDate).month()))
    setIsModalOpen(false)
  }

  return (
    <AnimatePresence>
      {isModalOpen ? (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.2 }} className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/95 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.2)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-headline text-4xl font-bold tracking-tight text-[#006193]">Add Note / Event</h3>
                <p className="mt-2 text-slate-500">Schedule a new entry in your editorial chronology.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input required aria-label="Note title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Enter title..." className="w-full border-0 border-b-2 border-[#006193] bg-slate-100/80 px-4 py-4 font-headline text-xl outline-none transition focus:border-[#007bb9] focus-visible:ring-2 focus-visible:ring-[#006193]/20" />
              <div className="grid gap-6 sm:grid-cols-2">
                <input required aria-label="Start date" type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#006193] focus-visible:ring-2 focus-visible:ring-[#006193]/20" />
                <input required aria-label="End date" type="date" value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#006193] focus-visible:ring-2 focus-visible:ring-[#006193]/20" />
              </div>
              <select aria-label="Note category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#006193] focus-visible:ring-2 focus-visible:ring-[#006193]/20">
                {['Planning', 'Strategy', 'Architecture', 'Design', 'Resources'].map((option) => <option key={option}>{option}</option>)}
              </select>
              <textarea required aria-label="Note description" rows={5} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Draft your notes here..." className="w-full resize-none border-0 bg-[linear-gradient(180deg,transparent_31px,rgba(191,199,210,0.2)_31px)] bg-[length:100%_2rem] px-0 py-1 leading-8 outline-none" />
              {formError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{formError}</p> : null}
              <div className="flex items-center justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-2xl px-5 py-3 font-semibold text-slate-500 transition hover:bg-slate-100">Cancel</button>
                <button type="submit" className="rounded-2xl bg-[#006193] px-8 py-3 font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#007bb9]">Save</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
