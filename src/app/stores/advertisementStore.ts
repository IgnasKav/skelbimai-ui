import {makeAutoObservable, runInAction} from "mobx";
import {Advertisement, AdvertisementEntity} from "app/models/Advertisement";
import agent from "app/api/agent";
import {v4 as uuid} from "uuid";

export default class AdvertisementStore {
    advertisements: Advertisement[] = [];
    loading = false;
    loadingDetails = false;
    searching = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadAdvertisements = async (name: string = "") => {
        this.loading = true;
        try {
            if(name.length == 0)
            {
                this.searching = false;
            }
            if(this.searching)
            {
                this.advertisements = await agent.Advertisements.list();
            }
            else
            {
                this.advertisements = await agent.Advertisements.list();
            }
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
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loadingDetails = false;
            })
        }
    }

    updateAdvertisement = async (updatedAdvertisement: Advertisement) => {
        this.loading = true;

        try {
            const advertisementEntity = new AdvertisementEntity(updatedAdvertisement);
            console.log(advertisementEntity);
            await agent.Advertisements.edit(advertisementEntity);
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
            const advertisementEntity = new AdvertisementEntity(newAdvertisement);
            await agent.Advertisements.create(advertisementEntity);
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