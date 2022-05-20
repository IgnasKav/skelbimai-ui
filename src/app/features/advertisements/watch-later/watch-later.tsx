import React, { useEffect } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import agent from 'app/api/agent'
import { useInfiniteQuery, useQuery } from 'react-query'
import { observer } from 'mobx-react-lite'
import { useFilters } from '../../../stores/useFilters'
import { useInView } from 'react-intersection-observer'
import getRandomImage from '../advertisementPictures'

export default observer(function WatchLater() {
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
        data: result.map((a) => {
          return { ...a, imageUrl: getRandomImage() }
        }),
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
})
