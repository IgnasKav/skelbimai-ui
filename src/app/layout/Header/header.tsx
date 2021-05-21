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
<<<<<<< Updated upstream
                <div className={css.addButton}>
                    <Button onClick={() => switchCreateAdvertisementState()}>Pridėti skelbimą</Button>
                </div>
=======
                <Button onClick={() => history.push('/dashboard')}>Panele</Button>
                <Button onClick={() => history.push('/categoriesDashboard')}>Pridėti kategoriją</Button>
                <Button onClick={() => history.push('/createAdvertisement')}>Pridėti skelbimą</Button>
>>>>>>> Stashed changes
            </div>
        </>
    )
}