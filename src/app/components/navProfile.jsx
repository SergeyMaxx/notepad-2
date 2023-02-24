import React from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

const NavProfile = () => {
  const {currentUser} = useAuth()
  const history = useHistory()

  return (
    <>
      <div className="nav-profile-name" onClick={() => history.push('/notes')}>
        {currentUser.name}
      </div>
      <img
        onClick={() => history.push('/notes')}
        className="nav-profile-avatar"
        src={currentUser.image}
        alt={`${currentUser.name}'s avatar`}
      />
    </>
  )
}

export default NavProfile