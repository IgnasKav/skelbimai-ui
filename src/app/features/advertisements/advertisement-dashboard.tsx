import React from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { Advertisement } from 'app/models/Advertisement';
import css from './advertisement-dashboard.module.scss';
import AdvertisementList from './advertisement-list/advertisement-list';
import AdvertisementDetails from './advertisement-deatails/advertisement-details';
import { useStore } from '../../stores/store';
import LoadingComponent from '../../layout/loadingComponent';

interface Props {
    advertisements?: Advertisement[]
}

export default observer(({ advertisements }: Props) => {
    const { advertisementStore } = useStore();
    const { openedAdvertisement } = advertisementStore;

    if (advertisementStore.loading) return <LoadingComponent inverted={true} content="Kraunami skelbimai" />;

    return (
        <div className={openedAdvertisement ? [css.dashboard, css.open].join(' ') : css.dashboard}>
            <div className={css.list}>
                <AdvertisementList advertisements={advertisements} />
            </div>
            <Routes>
                <Route
                    path="details/:advertisementId"
                    element={
                        <div className={css.details}>
                            <AdvertisementDetails />
                        </div>
                    }
                />
            </Routes>
        </div>
    );
});
