import httpService from './http.service'
import localStorageService from './localStorage.service'

const favoriteEndpoint = 'favorite/'

const favoriteService = {
  get: async () => {
    const {data} = await httpService.get(favoriteEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.post(favoriteEndpoint, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(favoriteEndpoint + localStorageService.getUserId())
    return data
  },
  update: async payload => {
    const {data} = await httpService.patch(
      favoriteEndpoint + localStorageService.getUserId(), payload
    )
    return data
  },
  remove: async deleteNote => {
    const {data} = await httpService.delete(favoriteEndpoint + deleteNote)
    return data
  },
}

export default favoriteService