import React from 'react'
import { LoadingOverlay } from '@mantine/core'

interface Props {
  inverted?: boolean
  content?: string
}

export default function LoadingComponent({ inverted = true, content = 'Loading...' }: Props) {
  return <LoadingOverlay visible={true} />
}
