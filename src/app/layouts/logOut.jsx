import React, {useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'
import Loader from '../components/loader'

const LogOut = () => {
  const {logOut} = useAuth()

  useEffect(() => {
    logOut()
  }, [])

  return <Loader/>
}

export default LogOut