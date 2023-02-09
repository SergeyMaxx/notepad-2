import httpService from './http.service'
import localStorageService from './localStorage.service'

const noteEndpoint = 'note/'

const noteService = {
  get: async () => {
    const {data} = await httpService.get(noteEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.put(noteEndpoint + payload.id, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(noteEndpoint + localStorageService.getUserId())
    return data
  },
  update: async payload => {
    const {data} = await httpService.patch(
      noteEndpoint + localStorageService.getUserId(), payload
    )
    return data
  }
}

export default noteService