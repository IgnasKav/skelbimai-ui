import React, { useEffect, useState } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import { useStore } from '../../../stores/store'
import { useInfiniteQuery, useQuery } from 'react-query'
import agent from '../../../api/agent'
import { useFilters } from '../../../stores/useFilters'
import { SearchRequest } from 'app/models/SearchRequest'
import { useInView } from 'react-intersection-observer'

export default function MyAdvertisements() {
  const { userStore } = useStore()
  const { searchRequest } = useFilters()
  const [localSearchRequest, setLocalSearchRequest] = useState<SearchRequest>(searchRequest)
  const { user } = userStore
  const { ref, inView } = useInView()

  useEffect(() => {
    if (user) {
      setLocalSearchRequest({ ...searchRequest, userId: user.id })
    }
    if (inView) {
      fetchNextPage()
    }
  }, [userStore, searchRequest, inView, setLocalSearchRequest])

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['myAdvertisements', localSearchRequest],
    async ({ pageParam = 0 }) => {
      localSearchRequest.page = pageParam
      const result = await agent.Advertisements.list(localSearchRequest)
      return { data: result, nextPage: pageParam + 1 }
    },
    { getNextPageParam: (lastPage, pages) => lastPage.nextPage }
  )

  return (
    <>
      <AdvertisementDashboard advertisements={data?.pages.map((p) => p.data).flat()} />
      <div ref={ref}></div>
    </>
  )
}
