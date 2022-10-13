import React, { createContext, useContext, useState } from 'react'
import { User, UserFormValues } from '../models/user'
import agent from '../api/agent'
import { store } from './store'

interface AuthState {
  user: User | null
  login: (creds: UserFormValues) => Promise<void>
  register: (creds: UserFormValues) => Promise<void>
  logout: () => void
  getUser: () => Promise<void>
}

const initialAuthState: AuthState = {
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  getUser: async () => {},
}

const AuthContext = createContext<AuthState>(initialAuthState)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds)
      store.commonStore.setToken(user.token)
      setUser(user)
    } catch (error) {
      throw error
    }
  }

  const register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds)
      store.commonStore.setToken(user.token)
      setUser(user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    store.commonStore.setToken(null)
    window.localStorage.removeItem('jwt')
    setUser(null)
  }

  const getUser = async () => {
    try {
      const user = await agent.Account.current()
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    getUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext<AuthState>(AuthContext)
