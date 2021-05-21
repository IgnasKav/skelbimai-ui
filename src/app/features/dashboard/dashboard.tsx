import React, {Component, useState} from 'react';
import css from './dashboard.module.scss';
import {observer} from "mobx-react-lite";
import { createMuiTheme, Menu, MenuItem, MenuList } from '@material-ui/core';
import Show_Advertisement from './dashboard_ads';
import { ThemeProvider } from 'styled-components';

export default observer(function DashBoard() {
    const [showCategory, setInfoC] = useState(false);
    const [showAd, setInfoA] = useState(false);
    const ShowInfoC= () => {
        setInfoC(true);
        setInfoA(false);
    }
    const ShowInfoA = () => {
        setInfoA(true);
        setInfoC(false);
    }
      
    return(
        
        <body className={css.body}>
                <p className={css.title}>Admin panele</p>
        <div className={css.dashboard}>
            <MenuList className={css.list}>
            <MenuItem className={css.item} selected={showCategory} onClick={ShowInfoC}>Kategorijos</MenuItem>
            <MenuItem className={css.item} selected={showAd} onClick={ShowInfoA}>Skelbimai</MenuItem>
            </MenuList>
            {showAd && (
                <Show_Advertisement/>
            )
            }
        </div>
        </body>
    )
});