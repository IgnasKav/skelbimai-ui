import React, { useEffect } from 'react'
import './styles.css'
import './treestyles.scss'
import { Header } from './Header/header'
import { observer } from 'mobx-react-lite'
import { useStore } from 'app/stores/store'
import { Navigate, Route, Routes } from 'react-router-dom'
import CategoriesDashboard from 'app/features/categories/categories-dashboard'
import AdvertisementEditPage from 'app/features/advertisements/advertisement-create/advertisement-edit'
import LoginForm from 'app/features/auth/login-form'
import RegisterForm from 'app/features/auth/register/register-form'
import LoadingComponent from './loadingComponent'
import { AppShell } from '@mantine/core'
import { NavBar } from './NavBar/nav-bar'
import MyAdvertisements from '../features/advertisements/my-advertisements/my-advertisements'
import { MainWindow } from '../features/advertisements/main-window/main-window'
import WatchLater from '../features/advertisements/watch-later/watch-later'
import { QueryClient, QueryClientProvider } from 'react-query'
import UnprovedAdvertisements from '../features/advertisements/unaproved-advertisements/unaproved-advertisements'
import Settings from 'app/features/settings/settings'
import { useAuth } from '../stores/useAuth'
import BackgroundJobs from '../features/background-jobs/background-jobs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { commonStore } = useStore()
  const auth = useAuth()

  useEffect(() => {
    if (commonStore.token) {
      auth.getUser().finally(() => {
        commonStore.setAppLoaded()
      })
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore.token])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app" />

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        header={auth.user ? <Header /> : undefined}
        navbar={auth.user ? <NavBar /> : undefined}
        fixed
      >
        <Routes>
          <Route
            path="/"
            element={
              auth.user ? <Navigate to="/advertisementDashboard" /> : <Navigate to="/login" />
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
            path="/unapproved/*"
            element={
              <RequireAuth>
                <UnprovedAdvertisements />
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
            path="/watchLater/*"
            element={
              <RequireAuth>
                <WatchLater />
              </RequireAuth>
            }
          />
          <Route
            path="/backgroundJobs/*"
            element={
              <RequireAuth>
                <BackgroundJobs />
              </RequireAuth>
            }
          />
          <Route
            path="/settings/*"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </AppShell>
    </QueryClientProvider>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()

  if (!auth.user) {
    auth.logout()
    return <Navigate to={'/login'} />
  }
  return children
}

export default observer(App)
