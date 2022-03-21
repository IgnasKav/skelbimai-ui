import {v4 as uuid} from "uuid";

export class Category {
    id: string;
    name: string;
    parentId: string;
    children?: Category[];

    constructor() {
        this.id = '';
        this.name = '';
        this.parentId = '00000000-0000-0000-0000-000000000000';
    }
}