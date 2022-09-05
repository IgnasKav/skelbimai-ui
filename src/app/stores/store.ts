import { createContext, useContext } from 'react'
import AdvertisementStore from './advertisementStore'
import CategoryStore from './categoryStore'
import CommonStore from './commonStore'

interface Store {
  advertisementStore: AdvertisementStore
  categoryStore: CategoryStore
  commonStore: CommonStore
}

export const store: Store = {
  advertisementStore: new AdvertisementStore(),
  categoryStore: new CategoryStore(),
  commonStore: new CommonStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
