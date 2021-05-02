import React from 'react';
import {useStore} from "app/stores/store";

export default function CategoriesDashboard() {
    const {categoryStore} = useStore();
    const {categories} = categoryStore;

    return(
        <>
            kategoriju kurimas
        </>
    )
}