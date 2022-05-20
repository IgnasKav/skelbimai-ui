export interface SearchRequest {
  page: number
  query: string
  categoryFilters?: CategoryFilter[]
  userId?: string
}

export interface CategoryFilter {
  categoryId: string
  categoryFilter: string
}
