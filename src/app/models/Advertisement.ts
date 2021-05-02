import {Category} from "./Category";

export class Advertisement {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: Category;
    state: string;
    city: string;
    views: number;
    price: number;

    constructor() {
        this.id = '';
        this.title = '';
        this.date = new Date();
        this.description = '';
        this.category = new Category();
        this.state = '';
        this.city = '';
        this.views = 0;
        this.price = 0;
    }
}

export class AdvertisementEntity {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    categoryId: string = '';
    city: string = '';
    price: number = 0;

    constructor(advertisement?: Advertisement) {
        if(advertisement) {
            this.id = advertisement.id;
            this.title = advertisement.title;
            this.description = advertisement.description;
            this.categoryId = advertisement.category.id;
            this.city = advertisement.city;
            this.price = advertisement.price;
        }
    }
}