import { NIL as NIL_UUID } from 'uuid'

export class Category {
  id: string
  name: string
  parentId: string
  Parent?: Category
  children?: Category[]

  constructor() {
    this.id = NIL_UUID
    this.name = ''
    this.parentId = NIL_UUID
  }
}
