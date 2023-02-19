export interface SearchRequest {
    page: number
    query: string
    categoryFilters?: CategoryFilter[]
    onlyUnapproved?: boolean
    userId?: string
}

export interface CategoryFilter {
    categoryId: string
    categoryFilter: string
}
