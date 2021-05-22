import React, { useState } from 'react';
import css from './search.module.scss';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import {useStore} from 'app/stores/store';
import categoryStore from "../../stores/categoryStore";

export default function Header() {
    const {advertisementStore} = useStore();

    const [searchField, setSearch] = useState<string>();

    const GetSearch = (event: any) => {
        setSearch(event.target.value);
    }
    const Find = () =>{
        advertisementStore.searching = true;
        advertisementStore.loadAdvertisements(searchField)
    }
    const [filterField, setFilter] = useState<string>();

    const GetFilter = (event: any) => {
        if(event.target.value === "None")
            setFilter("");
        setFilter(event.target.value)
    }
    const FilterByCategory = () => {
        advertisementStore.searching = true;
        advertisementStore.loadAdvertisements(filterField)
    }

    return (
        <>
            <div className={css.search}>
                <div className={css.field}>
                    <input type="text" className={css.textField} placeholder={"Enter name"} onChange={GetSearch}/>
                    <span style={{fontSize: "16px"}}>SortBy</span>
                    <select className={css.textField} id="sort" name="sort">
                    <option value="-1">None</option>
                    <option value="volvo">Ascending</option>
                    <option value="saab">Descending</option>
                    </select>
                    <span style={{fontSize: "16px"}} onChange={() =>GetFilter }> FilterCategory</span>
                    <select className={css.textField} id="filter" name="filter">
                    <option value="-1">None</option>
                    </select>
                </div>
                <div className={css.button}>
                    <Button onClick={() => {Find()}} variant="outlined" color="default" >Search</Button>
                </div>
            </div>
        </>
    )
}