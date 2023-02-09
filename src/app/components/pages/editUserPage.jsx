import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getCurrentUserData} from '../../Store/auth'
import {useAuth} from '../../hooks/useAuth'

const EditUserPage = ({active, setActive}) => {
  // const currentUser = useSelector(getCurrentUserData())
  const {currentUser} = useAuth()

  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'user-page user-page-active' : 'user-page'}
        onClick={e => e.stopPropagation()}
      >
        <img
          className="user-page-avatar"
          src={currentUser.image}
          alt={`${currentUser.name}'s avatar`}
        />
        <div className="profile-name">
          {currentUser.name}
        </div>
        <div className="profile-name">
          {currentUser.email}
        </div>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  remove: PropTypes.func,
  confirmationText: PropTypes.string,
  buttonText: PropTypes.string
}

export default EditUserPage