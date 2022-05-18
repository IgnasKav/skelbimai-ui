import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {StoreContext, store} from "./app/stores/store";
import {BrowserRouter} from "react-router-dom";

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer!);

root.render(
    <StoreContext.Provider value={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StoreContext.Provider>
);

reportWebVitals();
