import React, { useEffect } from 'react'
import css from './header.module.scss'
import { useStore } from 'app/stores/store'
import SearchInput from 'app/shared/inputs/search-input/search-input'
import { Header as MantineHeader, Group } from '@mantine/core'
import { useFilters } from '../../stores/useFilters'

export default function Header() {
  const { categoryStore } = useStore()
  const { setSearchQuery } = useFilters()

  const handleInputChange = (searchText: string) => {
    setSearchQuery(searchText)
  }

  useEffect(() => {
    categoryStore.loadCategories()
  }, [categoryStore])

  return (
    <>
      <MantineHeader height={60} p="xs">
        <Group sx={{ height: '100%' }}>
          <div className={css.webSiteLogo}></div>
          <SearchInput onChange={(searchText) => handleInputChange(searchText)} />
        </Group>
      </MantineHeader>
    </>
  )
}
