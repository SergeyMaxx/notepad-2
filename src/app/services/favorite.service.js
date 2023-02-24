import httpService from './http.service'
import localStorageService from './localStorage.service'

const favoriteEndpoint = 'favorite/'

const favoriteService = {
  get: async () => {
    const {data} = await httpService.get(favoriteEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.put(favoriteEndpoint + payload.id, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(favoriteEndpoint + localStorageService.getUserId())
    return data
  },
  update: async ({id, newNote, header}) => {
    await httpService.patch(favoriteEndpoint + id, {newNote, header})
    return {id, newNote, header}
  },
  updateStatus: async payload => {
    const {data} = await httpService.patch(
      favoriteEndpoint + payload.note.id,
      {'favoritesStatus': payload.status}
    )
    return data
  },
  remove: async noteId => {
    const {data} = await httpService.delete(favoriteEndpoint + noteId)
    return data
  },
  toggle: async payload => {
    let data
    payload.status
      ? {data} = await httpService.put(favoriteEndpoint + payload.note.id, payload.note)
      : {data} = await httpService.delete(favoriteEndpoint + payload.note.id)
    return data
  }
}

export default favoriteService