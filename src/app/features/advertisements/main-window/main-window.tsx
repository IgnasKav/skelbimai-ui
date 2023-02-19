import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import AdvertisementDashboard from '../advertisement-dashboard';
import { useFilters } from '../../../stores/useFilters';
import agent from '../../../api/agent';

export default function MainWindow() {
    const { searchRequest } = useFilters();
    const { ref, inView } = useInView();

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['mainAdvertisements', searchRequest],
        async ({ pageParam = 0 }) => {
            const result = await agent.Advertisements.list({ ...searchRequest, page: pageParam });
            return {
                data: result,
                nextPage: pageParam + 1,
            };
        },
        { getNextPageParam: (lastPage) => lastPage.nextPage },
    );

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <>
            <AdvertisementDashboard advertisements={data?.pages.map((p) => p.data).flat()} />
            <div ref={ref}></div>
        </>
    );
}
