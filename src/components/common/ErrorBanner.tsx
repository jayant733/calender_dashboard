import { AlertCircle, X } from 'lucide-react'
import { type NotesError } from '../../types'

type ErrorBannerProps = {
  error: NotesError
  onDismiss: () => void
}

export function ErrorBanner({ error, onDismiss }: ErrorBannerProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4 rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900 shadow-sm">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">{error.title}</p>
          <p className="text-sm text-rose-800/80">{error.message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-full p-1 text-rose-700 transition hover:bg-rose-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
