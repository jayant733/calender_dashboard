import { Skeleton } from './Skeleton'

export function RouteSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-72 w-full rounded-[36px]" />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6 rounded-[36px] border border-white/80 bg-white/85 p-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-[520px] w-full rounded-[28px]" />
        </div>
        <div className="space-y-4 rounded-[36px] border border-white/80 bg-white/90 p-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
