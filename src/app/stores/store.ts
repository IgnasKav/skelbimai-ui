import {createContext, useContext} from "react";
import AdvertisementStore from "./advertisementStore";

interface Store {
    advertisementStore: AdvertisementStore
}

export const store: Store = {
    advertisementStore: new AdvertisementStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
