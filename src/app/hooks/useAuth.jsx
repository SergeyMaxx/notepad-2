import React, {useContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, {setTokens} from '../services/localStorage.service'
import {useHistory} from 'react-router-dom'
import Loader from '../components/loader'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()


  async function logIn({email, password}) {
    try {
      const {data} = await httpAuth.post(`accounts:signInWithPassword`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      setTokens(data)
      await getUserData()

    } catch (error) {
      errorCatcher(error)
      const {code, message} = error.response.data.error
      console.log(code, message)

      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email or password entered incorrectly')
          case 'EMAIL_NOT_FOUND':
            throw new Error('Email or password entered incorrectly')
          default:
            throw new Error('Too many login attempts try again later')
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/')
  }

  async function signUp({email, password, ...rest}) {
    try {
      const {data} = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      })

      setTokens(data)
      await createUser({
        id: data.localId,
        email,
        ...rest,
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36).substring(7)}.svg`
      })

    } catch (error) {
      errorCatcher(error)
      const {code, message} = error.response.data.error

      if (code === 400 && message === 'EMAIL_EXISTS') {
        const errorObject = {email: 'User with this Email already exists'}
        throw errorObject
      }
    }
  }

  async function createUser(data) {
    try {
      const {content} = await userService.create(data)
      setCurrentUser(content)

    } catch (error) {
      errorCatcher(error)
    }
  }

  const editUser = async ({name}) => {
    try {
      setCurrentUser({...currentUser, name})
      await userService.updateName(name)

    } catch (error) {
      errorCatcher(error)
    }
  }

  const changeAvatar = async ({image}) => {
    try {
      setCurrentUser({...currentUser, image})
      await userService.updateAvatar(image)

    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
  }

  async function getUserData() {
    try {
      const {content} = await userService.getCurrentUser()
      setCurrentUser(content)

    } catch (error) {
      errorCatcher(error)

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (error !== null) {
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{
      signUp,
      logIn,
      currentUser,
      logOut,
      editUser,
      changeAvatar
    }}>
      {isLoading ? <Loader/> : children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider