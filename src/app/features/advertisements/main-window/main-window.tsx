import React, { useEffect } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import { useFilters } from '../../../stores/useFilters'
import { useInfiniteQuery } from 'react-query'
import agent from '../../../api/agent'
import { useInView } from 'react-intersection-observer'

export function MainWindow() {
  const { searchRequest } = useFilters()
  const { ref, inView } = useInView()

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
    ['mainAdvertisements', searchRequest],
    async ({ pageParam = 0 }) => {
      const result = await agent.Advertisements.list({ ...searchRequest, page: pageParam })
      return {
        data: result,
        nextPage: pageParam + 1,
      }
    },
    { getNextPageParam: (lastPage, pages) => lastPage.nextPage }
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      <AdvertisementDashboard advertisements={data?.pages.map((p) => p.data).flat()} />
      <div ref={ref}></div>
    </>
  )
}
