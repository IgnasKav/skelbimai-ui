import React, { useState, useEffect } from 'react';
import css from './search.module.scss';
import Button from '@material-ui/core/Button';
import { useStore } from 'app/stores/store';
import LoadingComponent from '../loadingComponent';

export default function Header() {
    const { advertisementStore, categoryStore } = useStore();

    const { categories } = categoryStore;

    const [searchField, setSearch] = useState<string>("");
    const [sortBy, setSort] = useState("");

    const GetSearch = (event: any) => {
        setSearch(event.target.value);
    }
    const Sort = (e: any) => {
        setSort(e.target.value)
    }
    const Find = () => {
        advertisementStore.searching = true;
        advertisementStore.sort(sortBy);
        advertisementStore.search(searchField);
    }
    const FilterByCategory = (event: any) => {
        advertisementStore.loadAdvertisements("", event.target.value)
    }
    if (categoryStore.loading) return (<LoadingComponent inverted={true} content="Kraunama" />)

    return (
        <>
            <div className={css.search}>
                <div className={css.field}>
                    <input type="text" className={css.textField} placeholder={"Enter name"} onChange={GetSearch} />
                    <span style={{ fontSize: "16px" }}>SortByPrice</span>
                    <select className={css.textField} id="sort" name="sort" onChange={Sort}>
                        <option value="-1">None</option>
                        <option value="0">Ascending</option>
                        <option value="1">Descending</option>
                    </select>
                    <span style={{ fontSize: "16px" }}> FilterCategory</span>
                    <select className={css.textField} onChange={FilterByCategory}>
                    <option selected>Select filter</option>
                        {
                            categories.map(category =>
                            (
                                <option value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={css.button}>
                    <Button onClick={() => {
                        Find()
                    }} variant="outlined" color="default">Search</Button>
                </div>
            </div>
        </>
    )
}