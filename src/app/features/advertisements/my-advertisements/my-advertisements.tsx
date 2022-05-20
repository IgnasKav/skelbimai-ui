import React, { useEffect } from 'react'
import AdvertisementDashboard from '../advertisement-dashboard'
import { useStore } from '../../../stores/store'
import { useInfiniteQuery } from 'react-query'
import agent from '../../../api/agent'
import { useFilters } from '../../../stores/useFilters'
import { useInView } from 'react-intersection-observer'
import getRandomImage from '../advertisementPictures'

export default function MyAdvertisements() {
  const { userStore } = useStore()
  const { searchRequest } = useFilters()
  const { user } = userStore
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
        userId: user!.id,
        page: pageParam,
      })
      return {
        data: result.map((a) => {
          return { ...a, imageUrl: getRandomImage() }
        }),
        nextPage: pageParam + 1,
      }
    },
    { enabled: !!user, getNextPageParam: (lastPage, pages) => lastPage.nextPage }
  )

  return (
    <>
      <AdvertisementDashboard advertisements={data?.pages.map((p) => p.data).flat()} />
      <div ref={ref}></div>
    </>
  )
}
