import {createContext, useContext} from "react";
import AdvertisementStore from "./advertisementStore";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    advertisementStore: AdvertisementStore,
    categoryStore: CategoryStore,
    userStore: UserStore,
    commonStore : CommonStore;
}

export const store: Store = {
    advertisementStore: new AdvertisementStore(),
    categoryStore: new CategoryStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore()

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
