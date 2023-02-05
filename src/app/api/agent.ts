import { User, UserFormValues } from 'app/models/user'
import axios, { AxiosResponse } from 'axios'
import { Advertisement, AdvertisementBackgroundJob } from 'app/models/Advertisement'
import { Category } from 'app/models/Category'
import { store } from 'app/stores/store'
import { SearchRequest } from '../models/SearchRequest'
import { WatchLater } from '../models/WatchLater'

// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }

const ApiUrl = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = `${ApiUrl}`

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token
  if (token && config?.headers) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

axios.interceptors.response.use(async (response) => {
  try {
    //await sleep(1000);
    return response
  } catch (error) {
    return await Promise.reject(error)
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Advertisements = {
  list: async (searchRequest: SearchRequest) => {
    const promise = await requests.post<Advertisement[]>('/advertisements/search', searchRequest)
    return mapAdvertisements(promise);
  },
  details: async (id: string) => {
    const promise = await requests.get<Advertisement>(`/advertisements/${id}`);
    return mapAdvertisement(promise)
  },
  create: (advertisement: Advertisement) => requests.post('/advertisements', advertisement),
  edit: (advertisement: Advertisement) =>
    requests.put(`/advertisements/${advertisement.id}`, advertisement),
  delete: (id: string) => requests.del(`/advertisements/${id}`),
  watchLaterList: async (searchRequest: SearchRequest) => {
    const promise = await requests.post<Advertisement[]>('/advertisements/watchLater', searchRequest);
    return mapAdvertisements(promise);
  },
  toggleWatchLater: (watchLaterReqest: WatchLater) =>
    requests.put(
      `/advertisements/${watchLaterReqest.advertisementId}/watchLater`,
      watchLaterReqest
    ),
  updateImage: (formData: FormData) => requests.post('/advertisements/updateImage', formData),
}

const mapAdvertisement = (advertisement: Advertisement): Advertisement => {
  advertisement.imageUrl = `${ApiUrl}${advertisement.imageUrl}`;
  return advertisement; 
}

const mapAdvertisements = (advertisements: Advertisement[]): Advertisement[] => {
  for (let advertisement of advertisements) {
    advertisement.imageUrl = `${ApiUrl}${advertisement.imageUrl}`
  }

  return advertisements; 
}

const Categories = {
  list: () => requests.get<Category[]>('/categories'),
  create: (category: Category) => requests.post('/categories', category),
  edit: (category: Category) => requests.put(`/categories/${category.id}`, category),
}

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const BackgroundJobs = {
  job: (job: AdvertisementBackgroundJob) => requests.post('/backgroundjobs', { operation: job }),
}

const agent = {
  Advertisements: Advertisements,
  Categories: Categories,
  Account: Account,
  BackgroundJobs: BackgroundJobs,
}

export default agent
