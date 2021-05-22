import React from 'react';
import css from './header.module.scss';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";

export default function Header() {
    let history = useHistory();

    return (
        <>
            <div className={css.header}>
                <div className={css.title}>Skelbimai</div>
                <div className={css.spacer}></div>
                <Button onClick={() => history.push('/')}>Skelbimai</Button>
                <Button onClick={() => history.push('/dashboard')}>Panele</Button>
                <Button onClick={() => history.push('/categoriesDashboard')}>Pridėti kategoriją</Button>
                <Button onClick={() => history.push('/createAdvertisement')}>Pridėti skelbimą</Button>
            </div>
        </>
    )
}