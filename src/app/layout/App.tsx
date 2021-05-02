import React, {useEffect} from 'react';
import './styles.css';
import AdvertisementDashboard from 'app/features/advertisements/advertisement-dashboard';
import Header from './Header/header';
import {observer} from "mobx-react-lite";
import {useStore} from 'app/stores/store';
import {Route, Switch} from 'react-router-dom';
import CategoriesDashboard from "app/features/categories/categories-dashboard";
import AdvertisementEditPage from "app/features/advertisements/advertisement-create/advertisement-edit";

function App() {
    const {advertisementStore, categoryStore} = useStore();

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    return (
        <>
            <Header/>
            <Switch>
                <Route path='/categoriesDashboard' component={CategoriesDashboard}/>
                <Route path="/createAdvertisement" component={AdvertisementEditPage}/>
                <Route path="/edit/:advertisementId" component={AdvertisementEditPage}/>
                <Route path='/' component={AdvertisementDashboard}/>
            </Switch>
        </>
    );
}

export default observer(App);
