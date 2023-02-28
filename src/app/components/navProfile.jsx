import React from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

const NavProfile = () => {
  const {currentUser} = useAuth()
  const history = useHistory()

  const handleClick = () => history.push('/notes')

  return (
    <>
      <div className="nav-profile-name" onClick={handleClick}>
        {currentUser.name}
      </div>
      <img
        onClick={handleClick}
        className="nav-profile-avatar"
        src={currentUser.image}
        alt={`${currentUser.name}'s avatar`}
      />
    </>
  )
}

export default NavProfile