import { type CalendarNote, type QuarterlyMilestone, type ScheduleEntry } from '../types'

export const STORAGE_KEY = 'chronology-notes-v1'
export const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const mondayWeekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export const heroImages = [
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80',
]

export const initialNotes: CalendarNote[] = [
  {
    id: 'note-1',
    title: 'Spatial Integrity in Brutalist Restoration',
    description:
      'The core challenge remains the preservation of raw texture while integrating modern HVAC systems without compromising the monolithic intent of the original.',
    startDate: '2026-01-15',
    endDate: '2026-01-22',
    category: 'Architecture',
    pinned: true,
  },
  {
    id: 'note-2',
    title: 'The Editorial Horizon: Q1 Shift',
    description:
      'Pivot strategy from long-form investigative pieces toward interactive data storytelling for the upcoming urban development series.',
    startDate: '2026-02-02',
    endDate: '2026-02-02',
    category: 'Strategy',
  },
  {
    id: 'note-3',
    title: 'Visual Grammar of Bauhaus',
    description:
      'Exploration of primary colors and their emotional impact on modern workspace design for the spring issue.',
    startDate: '2026-03-12',
    endDate: '2026-03-15',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'note-4',
    title: 'Sustainable Materials Inventory',
    description:
      'Cross-referencing bamboo composites against traditional oak for the pavilion project. Cost analysis suggests a 15% saving if sourced locally.',
    startDate: '2026-04-05',
    endDate: '2026-04-05',
    category: 'Resources',
  },
  {
    id: 'note-5',
    title: 'Editorial Guidelines v2.0',
    description:
      "Finalizing the tone of voice for the 'Global South' special issue. Emphasis on authentic perspective and non-Western architectural norms.",
    startDate: '2026-05-19',
    endDate: '2026-05-22',
    category: 'Planning',
    pinned: true,
  },
]

export const scheduleEntries: ScheduleEntry[] = [
  {
    time: '09:00 AM',
    title: 'Morning Manuscript Review',
    category: 'Editorial',
    tone: 'bg-sky-100 text-sky-700',
    description:
      "Finalizing the visual pacing for the 'Brutalist Residencies' feature. Need to verify contrast ratios on high-gloss stock samples.",
  },
  {
    time: '11:30 AM',
    title: 'Light Study: South Studio',
    category: 'Note',
    tone: 'bg-amber-100 text-amber-700',
    description:
      'Direct sunlight hit the layout table at precisely 11:34 AM today. The casting shadow of the compass created a perfect geometric intersection. Capture for November spread.',
    noteStyle: true,
  },
  {
    time: '02:00 PM',
    title: 'Quarterly Production Sync',
    category: 'Meeting',
    tone: 'bg-slate-100 text-slate-600',
    description:
      'Discussing the transition to heavier 140gsm tactile paper for the winter anthology. Reviewing binding tolerances with the Swiss team.',
  },
  {
    time: '04:45 PM',
    title: 'Archive Tagging: Issue #42',
    category: 'Completed',
    tone: 'bg-slate-100 text-slate-500',
    description:
      "All metadata entries for the photographic essay 'Vanishing Horizons' have been cataloged and cross-referenced.",
    completed: true,
  },
  {
    time: '08:00 AM',
    title: 'Dawn Field Research',
    category: 'On-site',
    tone: 'bg-sky-100 text-sky-700',
    description:
      "Site visit to the derelict clocktower. Documenting the structural acoustics for the 'Echoes of Industry' audio-visual hybrid piece.",
    tomorrow: true,
  },
]

export const quarterlyMilestones: QuarterlyMilestone[] = [
  {
    monthLabel: '01',
    monthName: 'January',
    keyMilestone: 'Concept Approval',
    keyMilestoneDates: 'Jan 13-17',
    keyMilestoneDescription: 'Final review of editorial pillars for the fiscal year.',
    rangeStart: 13,
    rangeEnd: 17,
    featuredDay: 9,
  },
  {
    monthLabel: '02',
    monthName: 'February',
    keyMilestone: 'Visual Direction Lock',
    keyMilestoneDates: 'Feb 12-14',
    keyMilestoneDescription: 'Design team alignment on aesthetic benchmarks.',
    rangeStart: 12,
    rangeEnd: 14,
    featuredDay: 19,
  },
  {
    monthLabel: '03',
    monthName: 'March',
    keyMilestone: 'Spring Issue Reveal',
    keyMilestoneDates: 'Mar 22-24',
    keyMilestoneDescription: 'Public announcement and digital unveil.',
    rangeStart: 22,
    rangeEnd: 24,
    featuredDay: 24,
    urgentDay: 24,
  },
]

export const quarterlyNotes = [
  'Prioritize long-form essays regarding sustainable urban sprawl.',
  'Collaborate with the photography team for the "Concrete Shadows" series.',
  'March reveal should include a teaser for the London Architectural Biennial.',
]

export const yearlyStrategyNote =
  'Focus on the Architectural Ephemera theme for the Q2 release. Consolidate digital assets by April 23rd. The October release will be our biggest editorial milestone of the year. Keep whitespace generous in all layouts.'
