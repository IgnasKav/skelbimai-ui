import { User, UserFormValues } from 'app/models/user';
import axios, {AxiosResponse} from 'axios';
import { request } from 'node:http';
import {Advertisement, AdvertisementEntity} from "../models/Advertisement";
import {Category} from "../models/Category";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Advertisements = {
    list: () => requests.get<Advertisement[]>('/advertisements'),
    listC: (id: string) => requests.get<Advertisement[]>(`/advertisements/list/${id}`),
    details: (id: string) => requests.get<Advertisement>(`/advertisements/${id}`),
    create: (advertisement: AdvertisementEntity) => requests.post('/advertisements', advertisement),
    edit: (advertisement: AdvertisementEntity) => requests.put(`/advertisements/${advertisement.id}`, advertisement),
    delete: (id: string) => requests.del(`/advertisements/${id}`)
}

const Categories = {
    list: () => requests.get<Category[]>('/categories'),
    create: (category: Category) => requests.post('/categories', category),
    edit: (category: Category) => requests.put(`/categories/${category.id}`, category)
}
const Account ={
    current: () => requests.get<User>('/user'),
    login:(user: UserFormValues) => requests.post<User>('/user/login',user),
    register: (user: UserFormValues) => requests.post<User>('/user/register',user)
}
const agent = {
    Advertisements: Advertisements,
    Categories: Categories,
    Account
}


export default agent;