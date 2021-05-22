import React, { useState, useEffect } from 'react';
import css from './search.module.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { useStore } from 'app/stores/store';
import LoadingComponent from '../loadingComponent';
import { Category } from 'app/models/Category';

export default function Header() {
    const { advertisementStore, categoryStore } = useStore();

    const { categories } = categoryStore;

    const [searchField, setSearch] = useState<string>("");
    const [sortBy, setSort] = useState("");
    const [selectedFilter, setFilter] = useState<string>("");
    const history = useHistory();

    const GetSearch = (event: any) => {
        setSearch(event.target.value);

        console.log(event.target.value);
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
        setFilter(event.target.value);
        advertisementStore.loadAdvertisements("", event.target.value)
    }
    if (categoryStore.loading) return (<LoadingComponent inverted={true} content="Kraunama" />)

    return (
        <>
            <div className={css.search}>
                <div className={css.field}>
                    <input type="text" className={css.textField} placeholder={"Enter name"} onChange={GetSearch} />
                    <span style={{ fontSize: "16px" }}>SortBy</span>
                    <select className={css.textField} id="sort" name="sort" onChange={Sort}>
                        <option value="-1">None</option>
                        <option value="0">Ascending</option>
                        <option value="1">Descending</option>
                    </select>
                    <span style={{ fontSize: "16px" }}> FilterCategory</span>
                    <select className={css.textField} value="6B2F31E7-82E7-4AF4-8F48-AB4EC4EB8D83" onChange={FilterByCategory}>
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