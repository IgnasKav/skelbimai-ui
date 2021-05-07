import {makeAutoObservable, runInAction} from "mobx";
import {Category} from "app/models/Category";
import agent from "app/api/agent";
import {v4 as uuid} from "uuid";

export default class CategoryStore {
    categories: Category[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCategories = async () => {
        this.loading = true;
        try {
            this.categories = await agent.Categories.list();
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    createCategory = async (newCategory: Category) => {
        this.loading = true;
        newCategory.id = uuid();

        try {
            await agent.Categories.create(newCategory);
            runInAction(() => {
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}