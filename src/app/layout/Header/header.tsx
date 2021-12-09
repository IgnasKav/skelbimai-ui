import React, {useEffect} from 'react';
import css from './header.module.scss';
import {history} from "index";
import {useStore} from "app/stores/store";
import SearchInput from "app/shared/inputs/search-input/search-input";

export default function Header() {
    const {userStore, advertisementStore, categoryStore} = useStore();

    const handleInputChange = (searchText: string) => {
        advertisementStore.loadAdvertisements(searchText);
    }

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    return (
        <>
            <div className={css.header}>
                <button onClick={() => history.push('/advertisementDashboard')}>Skelbimai</button>
                <div className={css.spacer}></div>
                <SearchInput onChange={handleInputChange}/>
                <div className={css.spacer}></div>
                <button onClick={() => history.push('/categoriesDashboard')}>Pridėti kategoriją</button>
                <button onClick={() => history.push('/createAdvertisement')}>Pridėti skelbimą</button>
                <button onClick={() => userStore.logout()}>Atsijungti</button>
            </div>
        </>
    )
}
