import React, { useState } from 'react';
import css from './search.module.scss';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import {useStore} from 'app/stores/store';

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

    return (
        <>
            <div className={css.search}>
                <div className={css.field}>
                   <input type="text" placeholder={"Enter name"} onChange={GetSearch}/>
                   <span>SortBy</span>
                   <select id="sort" name="sort">
                    <option value="-1">None</option>
                    <option value="volvo">Ascending</option>
                    <option value="saab">Descending</option>
                    </select>
                    <span>FilterCategory</span>
                    <select id="filter" name="filter">
                    <option value="-1">None</option>
                    </select>
                </div>
                <div className={css.button}>
                    <Button>Search</Button>
                </div>
            </div>
        </>
    )
}