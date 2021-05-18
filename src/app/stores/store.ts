import {createContext, useContext} from "react";
import AdvertisementStore from "./advertisementStore";
import CategoryStore from "./categoryStore";
import UserStore from "./userStore";

interface Store {
    advertisementStore: AdvertisementStore,
    categoryStore: CategoryStore,
    userStore: UserStore;
}

export const store: Store = {
    advertisementStore: new AdvertisementStore(),
    categoryStore: new CategoryStore(),
    userStore: new UserStore()

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
