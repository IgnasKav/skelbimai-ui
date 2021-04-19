import React, {useEffect} from 'react';
import './styles.css';
import AdvertisementDashboard from 'app/features/advertisements/advertisement-dashboard';
import Header from './Header/header';
import LoadingComponent from "./loadingComponent";
import {observer} from "mobx-react-lite";
import {useStore} from 'app/stores/store';

function App() {
    const {advertisementStore, categoryStore} = useStore();

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    if (advertisementStore.loading) return <LoadingComponent content={'Loading app'}/>

    return (
        <>
            <Header/>
            <AdvertisementDashboard/>
        </>
    );
}

export default observer(App);
