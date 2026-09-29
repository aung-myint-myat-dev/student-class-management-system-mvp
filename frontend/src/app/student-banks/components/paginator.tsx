import { getPageNumbers } from "../lib/get-page-numbers"


type PaginatorProps = {
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  label?: string
}

export function Paginator({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
  label = 'Items',
}: PaginatorProps) {
  const startIndex =
    totalItems === 0
      ? 0
      : (currentPage - 1) * perPage + 1

  const endIndex = Math.min(
    currentPage * perPage,
    totalItems,
  )

  const pageNumbers = getPageNumbers({
    totalPages,
    currentPage,
  })

  return (
    <div className="flex items-center justify-between">
      {/* Showing */}
      <p className="text-sm text-zinc-500">
        Showing {startIndex} to {endIndex} of {totalItems}{' '}
        {label}
      </p>

      <div className="flex items-center gap-3">
        {/* Per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">
            Show
          </span>

          <select
            value={perPage}
            onChange={(e) => {
              onPerPageChange(Number(e.target.value))
              onPageChange(1)
            }}
            className="rounded-md border bg-white px-3 py-1.5 text-sm outline-none focus:border-zinc-400"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <span className="text-sm text-zinc-500">
            per page
          </span>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          {currentPage > 1 && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-100"
            >
              Previous
            </button>
          )}

          {/* Page numbers */}
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-2 text-zinc-500"
                >
                  ...
                </span>
              )
            }

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`rounded-md px-3 py-1.5 text-sm ${currentPage === page
                    ? 'bg-green-700 text-white'
                    : 'border hover:bg-zinc-100'
                  }`}
              >
                {page}
              </button>
            )
          })}

          {/* Next */}
          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-100"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}