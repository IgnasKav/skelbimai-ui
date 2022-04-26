export interface SearchRequest {
    from: number;
    size: number;
    query: string;
    categoryFilters?: CategoryFilter[];
}

export interface CategoryFilter {
    categoryId: string;
    categoryFilter: string;
}
