export type GetPageNumbersParams = {
  totalPages: number
  currentPage: number
}

export type PageNumber = number | '...'

export function getPageNumbers({
  totalPages,
  currentPage,
}: GetPageNumbersParams): PageNumber[] {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    )
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      '...',
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}