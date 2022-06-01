import React from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
import { StoreContext, store } from './app/stores/store'
import { BrowserRouter } from 'react-router-dom'
import { FilterProvider } from './app/stores/useFilters'

const rootContainer = document.getElementById('root')
const root = createRoot(rootContainer!)

root.render(
  <StoreContext.Provider value={store}>
    <FilterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FilterProvider>
  </StoreContext.Provider>
)

reportWebVitals()
