import React from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
import {useSelector} from 'react-redux'
import {getDarkMode} from '../Store/notes'


const NavProfile = () => {
  const {currentUser} = useAuth()
  const history = useHistory()
  const darkMode = useSelector(getDarkMode())

  const handleClick = () => history.push('/notes')

  return (
    <>
      <div
        className={'nav-profile-name' + (darkMode === 'dark' ? ' nav-profile-name-dark' : '')}
        onClick={handleClick}>
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