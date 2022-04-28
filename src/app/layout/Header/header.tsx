import React, {useEffect, useState} from 'react';
import css from './header.module.scss';
import {useStore} from "app/stores/store";
import SearchInput from "app/shared/inputs/search-input/search-input";
import {Header as MantineHeader, Group} from "@mantine/core";

export default function Header() {
    const {advertisementStore, categoryStore} = useStore();

    const handleInputChange = (searchText: string) => {
        advertisementStore.setSearchQuery(searchText);
    }

    useEffect(() => {
        advertisementStore.loadAdvertisements();
        categoryStore.loadCategories();
    }, [advertisementStore, categoryStore])

    return (
        <>
            <MantineHeader height={60} p="xs">
                <Group sx={{ height: '100%' }}>
                    <div className={css.webSiteLogo}></div>
                    <SearchInput onChange={(searchText) => handleInputChange(searchText)}/>
                </Group>
            </MantineHeader>
        </>
    )
}
