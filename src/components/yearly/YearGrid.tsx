import { motion } from 'motion/react'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { yearlyStrategyNote } from '../../utils/mockData'
import { MonthCard } from './MonthCard'
import { PageTransition } from '../common/PageTransition'

export function YearGrid() {
  const navigate = useNavigate()
  const { currentMonth, noteStartDates, setCurrentMonth, yearlyMonths } = useAppContext()

  return (
    <PageTransition>
      <section className="space-y-10">
      <motion.section className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/75 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="relative h-[340px] overflow-hidden sm:h-[400px]">
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80" alt="Architectural workspace" className="h-full w-full object-cover" />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,97,147,0.78),rgba(0,123,185,0.42))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col justify-center px-8 text-white sm:px-14"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04, ease: 'easeOut' }}
          >
            <h2 className="font-headline text-6xl font-extrabold tracking-tighter sm:text-8xl">{currentMonth.year()}</h2>
            <p className="mt-3 max-w-2xl font-headline text-xl font-light text-sky-50 sm:text-3xl">
              A complete overview of your editorial architectural journey and scheduled milestones.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="rounded-[30px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setCurrentMonth((month) => month.subtract(1, 'year'))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-[#006193]"><ChevronLeft className="h-5 w-5" /></button>
            <span className="font-headline text-3xl font-light tracking-tight text-slate-950">Annual Register</span>
            <button type="button" onClick={() => setCurrentMonth((month) => month.add(1, 'year'))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-[#006193]"><ChevronRight className="h-5 w-5" /></button>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-label uppercase tracking-[0.25em] text-slate-400">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#006193]" />Editorial Release</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-200" />Review Period</div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {yearlyMonths.map((monthDays, monthIndex) => (
          <MonthCard
            key={`${currentMonth.year()}-${monthIndex}`}
            monthDays={monthDays}
            monthIndex={monthIndex}
            noteStartDates={noteStartDates}
            onOpenMonth={(index) => {
              setCurrentMonth(dayjs(`${currentMonth.year()}-${String(index + 1).padStart(2, '0')}-01`))
              navigate('/monthly')
            }}
          />
        ))}
      </div>

      <section className="rounded-[30px] border border-white/80 bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h4 className="font-headline text-3xl font-light uppercase tracking-[0.25em] text-sky-900">Yearly Strategy Notes</h4>
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-slate-400">Last updated: Oct 14, 2025</span>
        </div>
        <div className="min-h-52 bg-[linear-gradient(180deg,transparent_31px,rgba(191,199,210,0.35)_31px)] bg-[length:100%_2rem] px-2 py-1 text-lg leading-8 text-slate-500">
          {yearlyStrategyNote}
        </div>
      </section>
      </section>
    </PageTransition>
  )
}
