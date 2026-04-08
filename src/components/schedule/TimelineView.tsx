import { NotebookPen } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { scheduleEntries } from '../../utils/mockData'
import { TimelineItem } from './TimelineItem'
import { PageTransition } from '../common/PageTransition'

export function TimelineView() {
  const { openComposer, scheduleDay } = useAppContext()

  return (
    <PageTransition>
      <section className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/75 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="relative h-[250px] overflow-hidden sm:h-[320px]">
          <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80" alt="Schedule hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,97,147,0.86),rgba(0,123,185,0.55))]" />
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-10 text-white sm:px-12">
            <div>
              <h2 className="font-headline text-5xl font-light tracking-tight sm:text-7xl">Schedule View</h2>
              <p className="mt-3 font-label text-xs uppercase tracking-[0.35em] text-sky-100">Upcoming Editorial Milestones & Observations</p>
            </div>
            <button type="button" onClick={openComposer} className="hidden items-center gap-2 rounded-2xl bg-white px-6 py-4 font-headline text-lg font-semibold text-[#006193] shadow-sm lg:inline-flex"><NotebookPen className="h-5 w-5" />+ Add Note</button>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-[36px] border border-white/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="border-b border-slate-100 bg-slate-50/90 px-8 py-6 sm:px-10">
            <div className="flex items-baseline gap-4">
              <span className="font-headline text-6xl font-bold text-[#006193]">{scheduleDay.format('DD')}</span>
              <div>
                <p className="font-headline text-4xl font-semibold text-slate-950">{scheduleDay.format('MMMM')}</p>
                <p className="mt-1 font-label text-xs uppercase tracking-[0.35em] text-slate-400">{scheduleDay.format('dddd')} • Autumn Equinox Phase</p>
              </div>
            </div>
          </div>
          <div className="min-h-[760px] bg-[linear-gradient(180deg,transparent_31px,rgba(191,199,210,0.35)_31px)] bg-[length:100%_2rem] px-8 pt-5 sm:px-10">
            {scheduleEntries.map((entry) => (
              <div key={`${entry.time}-${entry.title}`} className="mb-10">
                {entry.tomorrow ? (
                  <div className="mb-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="font-label text-[10px] uppercase tracking-[0.35em] text-slate-400">Tomorrow: September 25</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                ) : null}
                <TimelineItem entry={entry} />
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <p className="mb-4 font-label text-[10px] font-bold uppercase tracking-[0.35em] text-[#006193]">Focus of the Week</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm"><span className="text-slate-700">Typographic Balance</span><span className="font-bold text-[#006193]">80%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-4/5 rounded-full bg-[#006193]" /></div>
              <p className="text-sm leading-7 text-slate-500">Current issue requires 12 more editorial approvals by Friday.</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-[#006193] p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
            <p className="mb-3 font-label text-[10px] uppercase tracking-[0.35em] text-sky-100">Editorial Insight</p>
            <p className="font-headline text-3xl font-light leading-tight">Whitespace is not the absence of content, but the presence of clarity.</p>
          </div>
        </aside>
      </div>
      </section>
    </PageTransition>
  )
}
