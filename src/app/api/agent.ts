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

const ApiUrl = 'http://skelbimai-api.localhost'

axios.defaults.baseURL = `${ApiUrl}/api`

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
    const promise = requests.post<Advertisement[]>('/advertisements/search', searchRequest)

    const advertisements = await promise
    for (let advertisement of advertisements) {
      advertisement.imageUrl = `${ApiUrl}/${advertisement.imageUrl}`
    }

    return promise
  },
  details: (id: string) => requests.get<Advertisement>(`/advertisements/${id}`),
  create: (advertisement: Advertisement) => requests.post('/advertisements', advertisement),
  edit: (advertisement: Advertisement) =>
    requests.put(`/advertisements/${advertisement.id}`, advertisement),
  delete: (id: string) => requests.del(`/advertisements/${id}`),
  watchLaterList: (searchRequest: SearchRequest) =>
    requests.post<any[]>('/advertisements/watchLater', searchRequest),
  toggleWatchLater: (watchLaterReqest: WatchLater) =>
    requests.put(
      `/advertisements/${watchLaterReqest.advertisementId}/watchLater`,
      watchLaterReqest
    ),
  updateImage: (formData: FormData) => requests.post('/advertisements/updateImage', formData),
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
