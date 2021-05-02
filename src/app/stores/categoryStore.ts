import {makeAutoObservable} from "mobx";
import {Category} from "app/models/Category";
import agent from "app/api/agent";

export default class CategoryStore {
    categories: Category[] = [];
    selectedCategory: Category|undefined = undefined;
    loading = false;
    editMode = false;

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

    selectCategory = (id: string) => {
        if(this.selectedCategory && this.selectedCategory.id === id) {
            this.selectedCategory = undefined;
        } else {
            this.selectedCategory = this.categories.find(c => c.id === id);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}