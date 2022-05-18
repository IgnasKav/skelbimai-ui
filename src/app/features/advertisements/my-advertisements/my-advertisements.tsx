import React, { useEffect, useState } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import { useStore } from '../../../stores/store'
import { useQuery } from 'react-query'
import agent from '../../../api/agent'
import { useFilters } from '../../../stores/useFilters'
import { SearchRequest } from 'app/models/SearchRequest'

export default function MyAdvertisements() {
  const { userStore } = useStore()
  const { searchRequest } = useFilters()
  const [localSearchRequest, setLocalSearchRequest] = useState<SearchRequest>(searchRequest)
  const { user } = userStore

  useEffect(() => {
    if (user) {
      setLocalSearchRequest({ ...searchRequest, userId: user.id })
    }
  }, [userStore, searchRequest])

  const { isLoading, error, data, isFetching } = useQuery(
    ['myAdvertisements', localSearchRequest],
    async () => {
      const result = await agent.Advertisements.list(localSearchRequest)
      return result
    }
  )

  return <AdvertisementDashboard advertisements={data} />
}
