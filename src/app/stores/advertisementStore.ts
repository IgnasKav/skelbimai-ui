import {makeAutoObservable, runInAction} from "mobx";
import {Advertisement} from "app/models/Advertisement";
import agent from "app/api/agent";
import {v4 as uuid} from "uuid";

export default class AdvertisementStore {
    advertisements: Advertisement[] = [];
    selectedAdvertisement: Advertisement | undefined = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadAdvertisements = async () => {
        this.setLoading(true);
        try {
            this.advertisements = await agent.Advertisements.list();
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setSelectedAdvertisement = (advertisement: Advertisement) => {
        this.selectedAdvertisement = advertisement;
    }

    selectAdvertisement = (id: string | undefined) => {
        this.selectedAdvertisement = id === 'new' ? {id: 'new'} as Advertisement : this.advertisements.find(x => x.id === id);
    }

    deselectAdvertisement = () => {
        this.selectedAdvertisement = undefined;
    }

    openEditOrCreateForm = (id?: string) => {
        id ? this.selectAdvertisement(id) : this.selectAdvertisement('new');
        this.editMode = true;
    }

    closeEditOrCreateForm = () => {
        this.deselectAdvertisement();
        this.editMode = false;
    }

    updateAdvertisement = async (updatedAdvertisement: Advertisement) => {
        this.loading = true;

        try {
            await agent.Advertisements.edit(updatedAdvertisement);
            runInAction(() => {
                this.advertisements = [...this.advertisements.filter(advertisement => advertisement.id !== updatedAdvertisement.id), updatedAdvertisement];
                this.editMode = false;
                this.selectAdvertisement(updatedAdvertisement.id)
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.editMode = false;
                this.deselectAdvertisement();
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
                this.editMode = false;
                this.selectAdvertisement(newAdvertisement.id)
                this.loading = false;
            });
        }
        catch (error){
            console.log(error);
            runInAction(() => {
                this.editMode = false;
                this.deselectAdvertisement();
                this.loading = false;
            });
        }
    }

    deleteAdvertisement = async (id: string) => {
        this.loading = true;

        try {
            await agent.Advertisements.delete(id);
            this.advertisements = [...this.advertisements.filter(advertisement => advertisement.id !== id)];
            this.deselectAdvertisement();
            this.loading = false;
        }
        catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
}