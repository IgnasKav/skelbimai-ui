import React from 'react';
import css from './header.module.scss';
import Button from '@material-ui/core/Button';
import {history} from "index";

export default function Header() {
    return (
        <>
            <div className={css.header}>
                <div className={css.title}>Skelbimai</div>
                <div className={css.spacer}></div>
                <Button onClick={() => history.push('/categoriesDashboard')}>Pridėti kategoriją</Button>
                <Button onClick={() => history.push('/createAdvertisement')}>Pridėti skelbimą</Button>
            </div>
        </>
    )
}