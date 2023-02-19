import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/layout/styles.css';
import { BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { FilterProvider } from './app/stores/useFilters';
import { AuthProvider } from './app/stores/useAuth';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <StoreContext.Provider value={store}>
        <AuthProvider>
            <FilterProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FilterProvider>
        </AuthProvider>
    </StoreContext.Provider>,
);

reportWebVitals();
