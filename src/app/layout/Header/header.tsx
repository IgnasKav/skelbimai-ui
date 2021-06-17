import React from 'react';
import css from './header.module.scss';
import Button from '@material-ui/core/Button';
import {history} from "index";
import {useStore} from "../../stores/store";

export default function Header() {
    const {userStore} = useStore();

    return (
        <>
            <div className={css.header}>
                <Button onClick={() => history.push('/advertisementDashboard')}>Skelbimai</Button>
                <div className={css.spacer}></div>
                <Button onClick={() => history.push('/')}>Skelbimai</Button>
                <Button onClick={() => history.push('/dashboard')}>Panele</Button>
                <Button onClick={() => history.push('/categoriesDashboard')}>Pridėti kategoriją</Button>
                <Button onClick={() => history.push('/createAdvertisement')}>Pridėti skelbimą</Button>
                <Button onClick={() => userStore.logout()}>Atsijungti</Button>
            </div>
        </>
    )
}