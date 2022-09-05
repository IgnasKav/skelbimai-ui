import React from 'react'
import './app/layout/styles.css'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
import { StoreContext, store } from './app/stores/store'
import { BrowserRouter } from 'react-router-dom'
import { FilterProvider } from './app/stores/useFilters'
import ReactDOM from 'react-dom'
import { AuthProvider } from './app/stores/useAuth'

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <AuthProvider>
      <FilterProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FilterProvider>
    </AuthProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
)

reportWebVitals()
