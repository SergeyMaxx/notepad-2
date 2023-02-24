import httpService from './http.service'
import localStorageService from './localStorage.service'

const trashEndpoint = 'trash/'

const trashService = {
  get: async () => {
    const {data} = await httpService.get(trashEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.put(trashEndpoint + payload.id, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(trashEndpoint + localStorageService.getUserId())
    return data
  },
  update: async payload => {
    const {data} = await httpService.patch(
      trashEndpoint + localStorageService.getUserId(), payload
    )
    return data
  },
  remove: async noteId => {
    const {data} = await httpService.delete(trashEndpoint + noteId)
    return data
  },
  removeAll: async () => {
    const {data} = await httpService.delete(trashEndpoint)
    return data
  }
}

export default trashService