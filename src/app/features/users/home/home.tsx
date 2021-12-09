import React from 'react'
import css from './home.module.scss'
import {history} from 'index';

export default function Home() {
    return (
        <div className={css.homePage}>
            <div>
                <h1>Skelbimų portalas</h1>
                <div className={css.buttonGroup}>
                    <button onClick={() => history.push('/login')}>Prisijungti</button>
                    <button onClick={() => history.push('/register')}>Registruotis</button>
                </div>
            </div>
        </div>
    )
}
