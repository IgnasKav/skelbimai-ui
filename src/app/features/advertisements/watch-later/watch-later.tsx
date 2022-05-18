import React from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import agent from 'app/api/agent'
import { useQuery } from 'react-query'
import { observer } from 'mobx-react-lite'
import { useFilters } from '../../../stores/useFilters'

export default observer(function WatchLater() {
  const { searchRequest } = useFilters()

  const { isLoading, error, data, isFetching } = useQuery(
    ['watchLater', searchRequest],
    async () => {
      const result = await agent.Advertisements.list(searchRequest)
      return result
    }
  )

  return <AdvertisementDashboard advertisements={data} />
})
