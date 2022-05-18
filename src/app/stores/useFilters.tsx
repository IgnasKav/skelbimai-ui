import { createContext, useContext, useState } from 'react'
import { CategoryFilter, SearchRequest } from '../models/SearchRequest'

interface FilterState {
  searchRequest: SearchRequest
  setSearchQuery: (userId: string) => void
  setCategoryFilters: (categoryFilters: CategoryFilter[]) => void
}

const initialFilterState: FilterState = {
  searchRequest: {
    from: 0,
    size: 50,
    query: '',
  },
  setSearchQuery: (searchText: string) => {},
  setCategoryFilters: (categoryFilters: CategoryFilter[]) => {},
}

const FilterContext = createContext<FilterState>(initialFilterState)

export const FilterProvider = ({ children }: { children: JSX.Element }) => {
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    from: 0,
    size: 50,
    query: '',
  })

  const setSearchQuery = (searchText: string) => {
    setSearchRequest({ ...searchRequest, query: searchText })
  }

  const setCategoryFilters = (categoryFilters: CategoryFilter[]) => {
    setSearchRequest({ ...searchRequest, categoryFilters: categoryFilters })
  }

  const value = {
    searchRequest,
    setSearchQuery,
    setCategoryFilters,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export const useFilters = () => useContext<FilterState>(FilterContext)
