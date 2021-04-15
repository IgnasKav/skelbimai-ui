import axios, {AxiosResponse} from 'axios';
import {Advertisement} from "../models/Advertisement";

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
    details: (id: string) => requests.get<Advertisement>(`/advertisements/${id}`),
    create: (advertisement: Advertisement) => requests.post('/advertisements', advertisement),
    edit: (advertisement: Advertisement) => requests.put(`/advertisements/${advertisement.id}`, advertisement),
    delete: (id: string) => requests.del(`/advertisements/${id}`)
}

const agent = {
    Advertisements: Advertisements
}

export default agent;