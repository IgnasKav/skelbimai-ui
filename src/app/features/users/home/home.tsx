import React from 'react'
import css from './home.module.scss'
import {Button, Paper} from "@material-ui/core";
import {history} from 'index';

export default function Home() {
    return (
        <div className={css.homePage}>
            <Paper>
                <h1>Skelbimų portalas</h1>
                <div className={css.buttonGroup}>
                    <Button variant="contained" onClick={() => history.push('/login')}>Prisijungti</Button>
                    <Button variant="contained" onClick={() => history.push('/register')}>Registruotis</Button>
                </div>
            </Paper>
        </div>
    )
}