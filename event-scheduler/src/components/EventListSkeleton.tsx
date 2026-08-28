export function EventListSkeleton() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="card bg-base-100 shadow-sm"
        >
          <div className="card-body">
            <div className="skeleton h-7 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />

            <div className="mt-4 space-y-2">
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-2/3" />
            </div>

            <div className="skeleton mt-5 h-10 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}
