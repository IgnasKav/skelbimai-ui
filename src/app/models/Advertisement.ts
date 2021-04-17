import {Category} from "./Category";

export interface Advertisement {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: Category;
    state: string;
    city: string;
    views: number;
    price: number;
}