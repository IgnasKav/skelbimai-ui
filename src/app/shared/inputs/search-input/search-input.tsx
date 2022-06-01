import css from './search-input.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@mantine/core'
import { Search } from 'tabler-icons-react'

interface Props {
  onChange: (event: any) => void
}

export default function SearchInput({ onChange }: Props) {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isFocused, setFocus] = useState<boolean>(false)

  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        onChange(inputElement?.current?.value)
      }
    }
    inputElement?.current?.addEventListener('keydown', handleKeyDownEvent)

    return () => inputElement?.current?.removeEventListener('keydown', handleKeyDownEvent)
  }, [])

  return (
    <div className={[css.inputFieldContainer].join(' ')}>
      <Input icon={<Search />} ref={inputElement} placeholder="Enter search text" size="md" />
    </div>
  )
}
