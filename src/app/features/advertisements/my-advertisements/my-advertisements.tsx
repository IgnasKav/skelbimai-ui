import React, { useEffect } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import { useInfiniteQuery } from 'react-query'
import agent from '../../../api/agent'
import { useFilters } from '../../../stores/useFilters'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '../../../stores/useAuth'

export default function MyAdvertisements() {
  const auth = useAuth()
  const { searchRequest } = useFilters()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

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
    ['myAdvertisements', searchRequest],
    async ({ pageParam = 0 }) => {
      const result = await agent.Advertisements.list({
        ...searchRequest,
        userId: auth.user!.id,
        page: pageParam,
      })
      return {
        data: result,
        nextPage: pageParam + 1,
      }
    },
    { enabled: !!auth.user, getNextPageParam: (lastPage, pages) => lastPage.nextPage }
  )

  return (
    <>
      <AdvertisementDashboard advertisements={data?.pages.map((p) => p.data).flat()} />
      <div ref={ref}></div>
    </>
  )
}
