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
import LoginForm from 'app/features/users/login-form';
import RegisterForm from 'app/features/users/register/register-form';
import Home from "app/features/users/home/home";
import LoadingComponent from "./loadingComponent";

function App() {
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if(commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    if(!commonStore.appLoaded) return <LoadingComponent content='Loading app'/>

    return (
        <>
            {userStore.isLoggedIn && <Header/>}
            <Switch>
                <Route path='/dashboard' component={DashBoard}/>
                <Route path='/categoriesDashboard' component={CategoriesDashboard}/>
                <Route path="/createAdvertisement" component={AdvertisementEditPage}/>
                <Route path="/edit/:advertisementId" component={AdvertisementEditPage}/>
                <Route path='/advertisementDashboard' component={AdvertisementDashboard}/>
                <Route path='/login' component={LoginForm}/>
                <Route path='/register' component={RegisterForm}/>
                <Route path='/' component={Home}/>
            </Switch>
        </>
    );
}

export default observer(App);
