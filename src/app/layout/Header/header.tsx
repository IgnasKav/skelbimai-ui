import React from 'react';
import css from './header.module.scss';
import Button from '@material-ui/core/Button';

interface Props {
    switchCreateAdvertisementState: () => void;
}

export default function Header({switchCreateAdvertisementState}: Props) {
    return (
        <>
            <div className={css.header}>
                <div className={css.title}>Skelbimai</div>
                <div className={css.spacer}></div>
                <div className={css.addButton}>
                    <Button onClick={() => switchCreateAdvertisementState()}>Pridėti skelbimą</Button>
                </div>
            </div>
        </>
    )
}