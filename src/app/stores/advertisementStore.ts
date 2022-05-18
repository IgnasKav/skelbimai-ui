import {makeAutoObservable, runInAction} from "mobx";
import {Advertisement} from "app/models/Advertisement";
import agent from "app/api/agent";
import {v4 as uuid} from "uuid";
import {CategoryFilter, SearchRequest} from "../models/SearchRequest";

export default class AdvertisementStore {
    advertisements: Advertisement[] = [];
    loading = false;
    loadingDetails = false;
    openedAdvertisement: Advertisement | undefined = undefined;

    searchRequest: SearchRequest ={
        from: 0,
        size: 50,
        query: '',
        categoryFilters: [],
        userId: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setIsDetailsOpen = (openedAdvertisement: Advertisement | undefined) => {
        this.openedAdvertisement = openedAdvertisement;
    }

    setSearchQuery = (searchText: string) => {
        this.searchRequest.query = searchText;
        this.loadAdvertisements();
    }

    setCategoryFilters = (categoryFilters: CategoryFilter[]) => {
        this.searchRequest.categoryFilters = categoryFilters;
        this.loadAdvertisements();
    }

    setUserIdFilter = (userId: string) => {
        this.searchRequest.userId = userId;
        this.loadAdvertisements();
    }

    loadAdvertisements = async () => {
        this.loading = true;
        try {
            this.advertisements = await agent.Advertisements.list(this.searchRequest);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadAdvertisement = async (id: string) => {
        this.loadingDetails = true;
        try {
            const advertisement = await agent.Advertisements.details(id);
            return runInAction(() => {
                this.loadingDetails = false;
                return advertisement;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingDetails = false;
            })
        }
    }

    updateAdvertisement = async (updatedAdvertisement: Advertisement) => {
        this.loading = true;

        try {
            await agent.Advertisements.edit(updatedAdvertisement);
            runInAction(() => {
                this.advertisements = [...this.advertisements.filter(advertisement => advertisement.id !== updatedAdvertisement.id), updatedAdvertisement];
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createAdvertisement = async (newAdvertisement: Advertisement) => {
        this.loading = true;
        newAdvertisement.id = uuid();

        try {
            await agent.Advertisements.create(newAdvertisement);
            runInAction(() => {
                this.advertisements.push(newAdvertisement);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteAdvertisement = async (id: string) => {
        this.loading = true;

        try {
            await agent.Advertisements.delete(id);
            runInAction(() => {
                this.advertisements = [...this.advertisements.filter(advertisement => advertisement.id !== id)];
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}
