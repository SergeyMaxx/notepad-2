import httpService from './http.service'
import localStorageService from './localStorage.service'

const trashEndpoint = 'trash/'

const trashService = {
  get: async () => {
    const {data} = await httpService.get(trashEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.post(trashEndpoint, payload)
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
  remove: async deleteNote => {
    const {data} = await httpService.delete(trashEndpoint + deleteNote)
    return data
  },
}

export default trashService