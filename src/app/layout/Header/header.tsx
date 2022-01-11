import React, {useEffect} from 'react';
import css from './header.module.scss';
import {useStore} from "app/stores/store";
import SearchInput from "app/shared/inputs/search-input/search-input";
import {Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const {userStore, advertisementStore, categoryStore} = useStore();
    let navigate = useNavigate();

    const handleInputChange = (searchText: string) => {
        advertisementStore.loadAdvertisements(searchText);
    }

    const logout = async () => {
        userStore.logout();
        navigate('/');
    }

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    return (
        <>
            <div className={css.header}>
                <Button onClick={() => navigate('/advertisementDashboard')}>Skelbimai</Button>
                <div className={css.spacer}></div>
                <SearchInput onChange={handleInputChange}/>
                <div className={css.spacer}></div>
                <Button onClick={() => navigate('/categoriesDashboard')}>Pridėti kategoriją</Button>
                <Button onClick={() => navigate('/createAdvertisement')}>Pridėti skelbimą</Button>
                <Button onClick={() => logout()}>Atsijungti</Button>
            </div>
        </>
    )
}
