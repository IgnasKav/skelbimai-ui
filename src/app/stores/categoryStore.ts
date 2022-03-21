import {makeAutoObservable, runInAction} from "mobx";
import {Category} from "app/models/Category";
import agent from "app/api/agent";
import {v4 as uuid} from "uuid";

export default class CategoryStore {
    categories: Category[] = [];
    categoriesFlat: Category[] =[];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadCategories = async () => {
        this.loading = true;
        try {
            this.categories = await agent.Categories.list();
            this.flattenCategories(this.categories, this.categoriesFlat);
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

    flattenCategories = (categories: Category[], res: Category[]): any => {
         categories.forEach(category => {
            if(category.children) {
                this.flattenCategories(category.children, res);
            }

            res.push(category)
        });
    }
}