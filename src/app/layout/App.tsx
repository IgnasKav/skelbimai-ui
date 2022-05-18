import React, { useEffect } from 'react'
import './styles.css'
import './treestyles.scss'
import Header from './Header/header'
import { observer } from 'mobx-react-lite'
import { useStore } from 'app/stores/store'
import { Navigate, Route, Routes } from 'react-router-dom'
import CategoriesDashboard from 'app/features/categories/categories-dashboard'
import AdvertisementEditPage from 'app/features/advertisements/advertisement-create/advertisement-edit'
import LoginForm from 'app/features/users/login-form'
import RegisterForm from 'app/features/users/register/register-form'
import LoadingComponent from './loadingComponent'
import { AppShell } from '@mantine/core'
import { NavBar } from './NavBar/nav-bar'
import MyAdvertisements from '../features/advertisements/my-advertisements/my-advertisements'
import { MainWindow } from '../features/advertisements/main-window/main-window'
import WatchLater from '../features/advertisements/watch-later/watch-later'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FilterProvider } from '../stores/useFilters'

const queryClient = new QueryClient()

function App() {
  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app" />

  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <AppShell
          header={userStore.isLoggedIn ? <Header /> : undefined}
          navbar={userStore.isLoggedIn ? <NavBar /> : undefined}
          fixed
        >
          <Routes>
            <Route
              path="/"
              element={
                userStore.isLoggedIn ? (
                  <Navigate to="/advertisementDashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/categoriesDashboard"
              element={
                <RequireAuth>
                  <CategoriesDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/createAdvertisement"
              element={
                <RequireAuth>
                  <AdvertisementEditPage />
                </RequireAuth>
              }
            />
            <Route
              path="/edit/:advertisementId"
              element={
                <RequireAuth>
                  <AdvertisementEditPage />
                </RequireAuth>
              }
            />
            <Route
              path="/myAdvertisements/*"
              element={
                <RequireAuth>
                  <MyAdvertisements />
                </RequireAuth>
              }
            />
            <Route
              path="/advertisementDashboard/*"
              element={
                <RequireAuth>
                  <MainWindow />
                </RequireAuth>
              }
            />
            <Route
              path="/watchLater"
              element={
                <RequireAuth>
                  <WatchLater />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </AppShell>
      </FilterProvider>
    </QueryClientProvider>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { userStore } = useStore()

  if (!userStore.isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return children
}

export default observer(App)
