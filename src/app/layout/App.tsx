import React, {useEffect} from 'react';
import './styles.css';
import './treestyles.scss';
import AdvertisementDashboard from 'app/features/advertisements/advertisement-dashboard';
import Header from './Header/header';
import {observer} from "mobx-react-lite";
import {useStore} from 'app/stores/store';
import {Navigate, Route, Routes} from 'react-router-dom';
import CategoriesDashboard from "app/features/categories/categories-dashboard";
import AdvertisementEditPage from "app/features/advertisements/advertisement-create/advertisement-edit";
import LoginForm from 'app/features/users/login-form';
import RegisterForm from 'app/features/users/register/register-form';
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
            <Routes>
                <Route path='/categoriesDashboard' element={<CategoriesDashboard/>}/>
                <Route path="/createAdvertisement" element={<AdvertisementEditPage/>}/>
                <Route path="/edit/:advertisementId" element={<AdvertisementEditPage/>}/>
                <Route path='/advertisementDashboard/*' element={<RequireAuth>
                    <AdvertisementDashboard/>
                </RequireAuth>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/register' element={<RegisterForm/>}/>
            </Routes>
        </>
    );
}

function RequireAuth({children}: {children: JSX.Element}) {
    const {userStore} = useStore();

    if(!userStore.isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return children;
}

export default observer(App);
