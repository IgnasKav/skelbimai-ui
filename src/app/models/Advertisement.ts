import { Category } from './Category'
import { NIL as NIL_UUID } from 'uuid'

export class Advertisement {
  id: string
  title: string
  date: Date
  description: string
  category: Category
  ownerId: string
  state: AdvertisementState
  city: string
  views: number
  price: number
  permissions: string[]
  imageUrl?: string

  constructor() {
    this.id = NIL_UUID
    this.title = ''
    this.date = new Date()
    this.description = ''
    this.category = new Category()
    this.ownerId = NIL_UUID
    this.state = AdvertisementState.New
    this.city = ''
    this.views = 0
    this.price = 0
    this.permissions = []
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
