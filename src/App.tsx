import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppLayout } from './components/layout/AppLayout'
import { MonthlyView } from './components/calendar/MonthlyView'
import { QuarterlyView } from './components/quarterly/QuarterlyView'
import { YearGrid } from './components/yearly/YearGrid'
import { TimelineView } from './components/schedule/TimelineView'
import { NotesView } from './components/notes/NotesView'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/monthly" replace />} />
            <Route path="/monthly" element={<MonthlyView />} />
            <Route path="/quarterly" element={<QuarterlyView />} />
            <Route path="/yearly" element={<YearGrid />} />
            <Route path="/schedule" element={<TimelineView />} />
            <Route path="/notes" element={<NotesView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
