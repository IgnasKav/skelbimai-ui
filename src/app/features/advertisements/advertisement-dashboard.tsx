import React from 'react';
import css from './advertisement-dashboard.module.scss';
import AdvertisementList from './advertisement-list/advertisement-list';
import AdvertisementDetails from './advertisement-deatails/advertisement-details';
import {observer} from "mobx-react-lite";
import {Route} from "react-router-dom";
import {useStore} from "../../stores/store";
import LoadingComponent from "../../layout/loadingComponent";
import Search from "../../layout/Search/search"

export default observer(function AdvertisementDashboard() {

    const {advertisementStore} = useStore();

    if (advertisementStore.loading) return <LoadingComponent inverted={true} content="Kraunami skelbimai"/>

    return (
        <>
            <Search/>
            <div className={css.dashboard}>
                <div className={css.list}>
                    <AdvertisementList/>
                </div>
                <Route path="/details/:advertisementId">
                    <div className={css.details}>
                        <AdvertisementDetails/>
                    </div>
                </Route>
            </div>
        </>
    )
})