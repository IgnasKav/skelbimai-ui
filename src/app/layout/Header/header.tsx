import React, {useEffect, useState} from 'react';
import css from './header.module.scss';
import {useStore} from "app/stores/store";
import SearchInput from "app/shared/inputs/search-input/search-input";
import {Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {Header as MantineHeader, Group} from "@mantine/core";

export default function Header() {
    const {advertisementStore, categoryStore} = useStore();
    let navigate = useNavigate();

    const handleInputChange = (searchText: string) => {
        advertisementStore.setSearchQuery(searchText);
    }

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    return (
        <>
            <MantineHeader height={60}>
                <Group sx={{ height: '100%' }}>
                    <Button onClick={() => navigate('/advertisementDashboard')}>Skelbimai</Button>
                    <div className={css.spacer}></div>
                    <SearchInput onChange={(searchText) => handleInputChange(searchText)}/>
                    <div className={css.spacer}></div>
                </Group>
            </MantineHeader>
        </>
    )
}
