import { motion } from 'motion/react'
import { LayoutGrid, StickyNote } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { quarterlyMilestones, quarterlyNotes } from '../../utils/mockData'
import { QuarterMonthCard } from './QuarterMonthCard'
import { PageTransition } from '../common/PageTransition'

export function QuarterlyView() {
  const { openComposer } = useAppContext()

  return (
    <PageTransition>
      <section className="space-y-12">
      <section className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/75 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="relative h-[360px] overflow-hidden sm:h-[460px]">
          <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80" alt="Quarterly architectural hero" className="h-full w-full object-cover" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#006193]/65 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end">
            <div className="flex w-full items-center justify-between bg-white/95 px-8 py-6 backdrop-blur-xl [clip-path:polygon(0_0,100%_0,100%_100%,0_82%)] sm:px-12">
              <div className="pb-2">
                <h2 className="font-headline text-4xl font-light tracking-tight text-slate-950 sm:text-6xl">First Quarter <span className="font-extrabold text-[#006193]">2024</span></h2>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500">Phase: Pre-production & Ideation</p>
              </div>
              <button type="button" onClick={openComposer} className="hidden items-center gap-2 rounded-2xl bg-sky-100 px-6 py-3 font-semibold text-[#006193] transition hover:bg-sky-200 lg:inline-flex"><StickyNote className="h-5 w-5" />+ Add Note</button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-3">
        {quarterlyMilestones.map((milestone, index) => <QuarterMonthCard key={milestone.monthName} milestone={milestone} monthIndex={index} />)}
      </section>

      <section className="relative overflow-hidden rounded-[32px] bg-slate-50 p-8 shadow-[0_12px_32px_rgba(25,28,29,0.04)] sm:p-12">
        <div className="relative z-10">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-headline text-4xl font-bold text-sky-900">Strategic Quarterly Notes</h3>
              <p className="mt-2 text-sm text-slate-500">Drafting the architectural narrative for Q1 outcomes.</p>
            </div>
            <span className="rounded-full bg-white px-4 py-1 font-label text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">Confidential</span>
          </div>
          <div className="space-y-0">
            {quarterlyNotes.map((line, index) => (
              <div key={line} className="flex h-8 items-center border-b border-slate-200/70 px-4">
                <span className="mr-6 font-label text-[10px] font-bold text-[#006193]/30">{String(index + 1).padStart(3, '0')}</span>
                <span className="text-lg text-slate-900">{line}</span>
              </div>
            ))}
            <div className="flex h-8 items-center border-b border-slate-200/70 px-4"><span className="mr-6 font-label text-[10px] font-bold text-[#006193]/30">004</span><input className="w-full bg-transparent text-lg outline-none placeholder:text-slate-300" placeholder="Type to add an architectural reflection..." /></div>
            <div className="h-8 border-b border-slate-200/70" />
            <div className="h-8 border-b border-slate-200/70" />
          </div>
        </div>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#006193]/5 blur-3xl" />
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        <div className="rounded-[30px] bg-[#006193] p-8 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] md:col-span-2">
          <LayoutGrid className="mb-6 h-10 w-10" />
          <p className="mb-3 text-sm font-light text-sky-100">Quarterly Progress</p>
          <h4 className="font-headline text-5xl font-bold leading-tight">64% of Milestones Achieved</h4>
        </div>
        <div className="rounded-[30px] border border-black/[0.03] bg-white p-8 shadow-sm">
          <p className="mb-4 font-label text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">Remaining Tasks</p>
          <div className="flex items-baseline gap-2"><span className="font-headline text-6xl font-bold text-sky-900">12</span><span className="text-sm font-medium text-slate-500">Critical</span></div>
        </div>
        <div className="rounded-[30px] border border-black/[0.03] bg-white p-8 shadow-sm">
          <p className="mb-4 font-label text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">Collaborators</p>
          <div className="flex -space-x-2">{['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'].map((src) => <img key={src} src={src} alt="Collaborator" className="h-9 w-9 rounded-full border-2 border-white object-cover" />)}<div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-400">+4</div></div>
        </div>
      </section>
      </section>
    </PageTransition>
  )
}
