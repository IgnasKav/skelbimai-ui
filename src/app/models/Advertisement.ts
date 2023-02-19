import { NIL as NIL_UUID } from 'uuid';
import { Category } from './Category';

export class Advertisement {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: Category;
    ownerId: string;
    state: AdvertisementState;
    city: string;
    views: number;
    price: number;
    permissions: string[];
    imageUrl: string;
    watchLater: boolean;

    constructor() {
        this.id = NIL_UUID;
        this.title = '';
        this.date = new Date();
        this.description = '';
        this.category = new Category();
        this.ownerId = NIL_UUID;
        this.state = AdvertisementState.New;
        this.city = '';
        this.views = 0;
        this.price = 0;
        this.permissions = [];
        this.imageUrl = '';
        this.watchLater = false;
    }
}

export enum AdvertisementState {
    New = 'New',
    Approved = 'Approved',
    Rejected = 'Rejected',
}

export enum AdvertisementPermissions {
    Read = 'Read',
    Update = 'Update',
    Delete = 'Delete',
    ChangeStatus = 'ChangeStatus',
}

export enum AdvertisementBackgroundJob {
    Delete,
    Create,
    Reindex,
}
