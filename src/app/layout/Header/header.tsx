import React from 'react';
import css from './header.module.scss';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <>
            <div className={css.header}>
                <div className={css.title}>Skelbimai</div>
                <div className={css.spacer}></div>
                <div className={css.addButton}>
                    <Link to='/createAdvertisement'>
                        <Button>Pridėti skelbimą</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}