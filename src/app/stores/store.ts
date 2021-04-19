import {createContext, useContext} from "react";
import AdvertisementStore from "./advertisementStore";
import CategoryStore from "./categoryStore";

interface Store {
    advertisementStore: AdvertisementStore,
    categoryStore: CategoryStore
}

export const store: Store = {
    advertisementStore: new AdvertisementStore(),
    categoryStore: new CategoryStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
