import React, {useEffect} from 'react';
import './styles.css';
import AdvertisementDashboard from 'app/features/advertisements/advertisement-dashboard';
import DashBoard from 'app/features/dashboard/dashboard';
import Header from './Header/header';
import {observer} from "mobx-react-lite";
import {useStore} from 'app/stores/store';
import {Route, Switch} from 'react-router-dom';
import CategoriesDashboard from "app/features/categories/categories-dashboard";
import AdvertisementEditPage from "app/features/advertisements/advertisement-create/advertisement-edit";
import LoginForm from 'app/features/users/LoginForm';
import LoadingComponent from './loadingComponent';

function App() {
    const {advertisementStore, categoryStore} = useStore();

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    if (categoryStore.loading) return (<LoadingComponent inverted={true} content="Kraunama" />)

    return (
        <>
            <Header/>
            <Switch>
                <Route path='/dashboard' component={DashBoard}/>
                <Route path='/categoriesDashboard' component={CategoriesDashboard}/>
                <Route path="/createAdvertisement" component={AdvertisementEditPage}/>
                <Route path="/edit/:advertisementId" component={AdvertisementEditPage}/>
                <Route path='/login' component={LoginForm}/>
                <Route path='/' component={AdvertisementDashboard}/>
            </Switch>
        </>
    );
}

export default observer(App);
