import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {logOut} from '../Store/auth'
import {useAuth} from '../hooks/useAuth'

const LogOut = () => {
  // const dispatch = useDispatch()
  const { logOut } = useAuth()

  useEffect(() => {
    // dispatch(logOut())
    logOut()
  }, [])

  return <h1>Loading...</h1>
}

export default LogOut