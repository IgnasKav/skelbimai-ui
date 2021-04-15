import React from 'react';
import css from './advertisement-dashboard.module.scss';
import AdvertisementList from './advertisement-list/advertisement-list';
import AdvertisementDetails from './advertisement-deatails/advertisement-details';
import AdvertisementCreateWindow from './advertisement-create/advertisement-create';
import {useStore} from "app/stores/store";
import {observer} from "mobx-react-lite";

export default observer(function AdvertisementDashboard() {
    const {advertisementStore} = useStore();

    const {selectedAdvertisement, editMode} = advertisementStore;

    return (
        <div className={css.dashboard}>
            <div className={css.list}>
                {
                    selectedAdvertisement && editMode ?
                        <AdvertisementCreateWindow/>
                        : <AdvertisementList/>
                }
            </div>
            {
                selectedAdvertisement &&
                    <div className={css.details}>
                        <AdvertisementDetails/>
                    </div>
            }
        </div>
    )
})