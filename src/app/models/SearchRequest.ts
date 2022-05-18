export interface SearchRequest {
    from: number;
    size: number;
    query: string;
    categoryFilters?: CategoryFilter[];
    userId?: string;
}

export interface CategoryFilter {
    categoryId: string;
    categoryFilter: string;
}
