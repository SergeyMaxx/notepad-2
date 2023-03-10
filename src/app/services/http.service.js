import axios from 'axios'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import {httpAuth} from '../hooks/useAuth'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(async config => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      const expiresDate = localStorageService.getTokenExpiresDate()
      const refreshToken = localStorageService.getRefreshToken()

      if (refreshToken && expiresDate < Date.now()) {
        const {data} = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }

      const accessToken = localStorageService.getAccessToken()

      if (accessToken) {
        config.params = {...config.params, auth: accessToken}
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function transformData(data) {
  if (data && !data.id) {
    return Object.keys(data).map(key => ({...data[key]}))
  } else if (data.id) {
    return data
  } else {
    return []
  }
}

http.interceptors.response.use(res => {
    if (configFile.isFireBase) {
      res.data = {content: transformData(res.data)}
    }
    // res.data = {content: res.data}
    return res
  },
  function (error) {
    const expectedErrors = error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default httpService