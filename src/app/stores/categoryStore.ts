import {makeAutoObservable} from "mobx";
import {Category} from "app/models/Category";
import agent from "app/api/agent";

export default class CategoryStore {
    categories: Category[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCategories = async () => {
        this.setLoading(true);
        try {
            this.categories = await agent.Categories.list();
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}