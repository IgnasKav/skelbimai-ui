import React from 'react';
import css from './header.module.scss';
import Button from '@material-ui/core/Button';
import {useStore} from "app/stores/store";

export default function Header() {
    const {advertisementStore} = useStore();

    return (
        <>
            <div className={css.header}>
                <div className={css.title}>Skelbimai</div>
                <div className={css.spacer}></div>
                <div className={css.addButton}>
                    <Button onClick={() => advertisementStore.openEditOrCreateForm()}>Pridėti skelbimą</Button>
                </div>
            </div>
        </>
    )
}