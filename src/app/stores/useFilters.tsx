import React, { createContext, useContext, useState } from 'react'
import { CategoryFilter, SearchRequest } from '../models/SearchRequest'

interface FilterState {
  searchRequest: SearchRequest
  setSearchQuery: (searchText: string) => void
  setCategoryFilters: (categoryFilters: CategoryFilter[]) => void
}

const initialFilterState: FilterState = {
  searchRequest: {
    page: 0,
    query: '',
    categoryFilters: [],
  },
  setSearchQuery: (searchText: string) => {},
  setCategoryFilters: (categoryFilters: CategoryFilter[]) => {},
}

const FilterContext = createContext<FilterState>(initialFilterState)

export const FilterProvider = ({ children }: { children: JSX.Element }) => {
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    page: 0,
    query: '',
    categoryFilters: [],
  })

  const setCategoryFilters = (categoryFilters: CategoryFilter[]) => {
    console.log('set filters')
    console.log(JSON.parse(JSON.stringify(searchRequest)))
    setSearchRequest({ ...searchRequest, categoryFilters: categoryFilters })
  }

  const setSearchQuery = (searchText: string) => {
    console.log('set query')
    console.log(JSON.parse(JSON.stringify(searchRequest)))
    setSearchRequest({ ...searchRequest, query: searchText })
  }

  const value = {
    searchRequest,
    setCategoryFilters,
    setSearchQuery,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export const useFilters = () => useContext<FilterState>(FilterContext)
