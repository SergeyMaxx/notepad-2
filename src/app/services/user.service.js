import httpService from './http.service'
import {getUserId} from './localStorage.service'

const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const {data} = await httpService.get(userEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.put(userEndpoint + payload.id, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(userEndpoint + getUserId())
    return data
  },
  updateName: async name => {
    const {data} = await httpService.patch(userEndpoint + getUserId(), {name})
    return data
  },
  updateAvatar: async image => {
    const {data} = await httpService.patch(userEndpoint + getUserId(), {image})
    return data
  }
}

export default userService