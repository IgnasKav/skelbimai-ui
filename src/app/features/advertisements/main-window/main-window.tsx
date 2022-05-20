import React, { useEffect } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import { useFilters } from '../../../stores/useFilters'
import { useQuery } from 'react-query'
import agent from '../../../api/agent'
import getRandomImage from '../advertisementPictures'

export function MainWindow() {
  const { searchRequest } = useFilters()

  const { isLoading, error, data, isFetching } = useQuery(
    ['mainWindow', searchRequest],
    async () => {
      const result = await agent.Advertisements.list(searchRequest)
      return result
    }
  )

  return (
    <AdvertisementDashboard
      advertisements={data?.map((a) => {
        console.log(getRandomImage())
        return { ...a, imageUrl: getRandomImage() }
      })}
    />
  )
}
