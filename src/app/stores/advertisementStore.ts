import { makeAutoObservable, runInAction } from 'mobx'
import { Advertisement } from 'app/models/Advertisement'
import agent from 'app/api/agent'
import { v4 as uuid } from 'uuid'
import { SearchRequest } from '../models/SearchRequest'

export default class AdvertisementStore {
  advertisements: Advertisement[] = []
  loading = false
  loadingDetails = false
  openedAdvertisement: Advertisement | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  setIsDetailsOpen = (openedAdvertisement: Advertisement | undefined) => {
    this.openedAdvertisement = openedAdvertisement
  }

  loadAdvertisement = async (id: string) => {
    this.loadingDetails = true
    try {
      const advertisement = await agent.Advertisements.details(id)
      return runInAction(() => {
        this.loadingDetails = false
        return advertisement
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loadingDetails = false
      })
    }
  }

  updateAdvertisement = async (updatedAdvertisement: Advertisement, image?: File) => {
    this.loading = true

    try {
      let formData = new FormData()
      if (image) {
        formData.append('advertisementId', updatedAdvertisement.id)
        formData.append('image', new Blob([image]), image.name)
        await agent.Advertisements.updateImage(formData)
      }

      await agent.Advertisements.edit(updatedAdvertisement)
      runInAction(() => {
        this.advertisements = [
          ...this.advertisements.filter(
            (advertisement) => advertisement.id !== updatedAdvertisement.id
          ),
          updatedAdvertisement,
        ]
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }

  createAdvertisement = async (newAdvertisement: Advertisement, image?: File) => {
    this.loading = true
    newAdvertisement.id = uuid()

    try {
      let formData = new FormData()
      if (image) {
        formData.append('advertisementId', newAdvertisement.id)
        formData.append('image', new Blob([image]), image.name)
        await agent.Advertisements.updateImage(formData)
      }

      await agent.Advertisements.create(newAdvertisement)
      runInAction(() => {
        this.advertisements.push(newAdvertisement)
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
