import React, { useEffect } from 'react';
import agent from 'app/api/agent';
import { useInfiniteQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import { useInView } from 'react-intersection-observer';
import { useFilters } from '../../../stores/useFilters';
import AdvertisementDashboard from '../advertisement-dashboard';

export default observer(() => {
    const { searchRequest } = useFilters();

    const { ref, inView } = useInView();

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['watchLater', searchRequest],
        async ({ pageParam = 0 }) => {
            const result = await agent.Advertisements.watchLaterList({
                ...searchRequest,
                page: pageParam,
            });
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
});
