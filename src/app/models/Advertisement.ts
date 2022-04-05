import {Category} from "./Category";
import {NIL as NIL_UUID} from "uuid";

export class Advertisement {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: Category;
    ownerId: string;
    state: string;
    city: string;
    views: number;
    price: number;
    permissions: string[];

    constructor() {
        this.id = NIL_UUID;
        this.title = '';
        this.date = new Date();
        this.description = '';
        this.category = new Category();
        this.ownerId = NIL_UUID;
        this.state = '';
        this.city = '';
        this.views = 0;
        this.price = 0;
        this.permissions = [];
    }
}

export enum AdvertisementPermissions {
    Read= "Read",
    Update= "Update",
    Delete= "Delete",
    ChangeStatus = "ChangeStatus"
}

export class AdvertisementEntity {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    categoryId: string = '';
    ownerId: string = '';
    city: string = '';
    price: number = 0;
    views: number = 0;

    constructor(advertisement?: Advertisement) {
        if(advertisement) {
            this.id = advertisement.id;
            this.title = advertisement.title;
            this.description = advertisement.description;
            this.categoryId = advertisement.category.id;
            this.ownerId = advertisement.ownerId;
            this.city = advertisement.city;
            this.price = advertisement.price;
            this.views = advertisement.views;
        }
    }
}