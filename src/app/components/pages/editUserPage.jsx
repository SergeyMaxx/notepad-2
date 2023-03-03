import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useAuth} from '../../hooks/useAuth'
import pen from '../../../icons/pen.svg'

const EditUserPage = ({active, setActive}) => {
  const [editName, setEditName] = useState(false)
  const [editAvatar, setEdiAvatar] = useState(false)
  const {currentUser} = useAuth()
  const [edit, setEdit] = useState(currentUser.name)
  const {editUser} = useAuth()
  const {changeAvatar} = useAuth()

  const handleSaveName = async e => {
    e.preventDefault()
    try {
      await editUser({name: edit})
      setEditName(!editName)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveAvatar = async () => {
    const image = `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36).substring(7)}.svg`
    try {
      await changeAvatar({image})
      setEdiAvatar(!editAvatar)

    } catch (error) {
      console.log(error)
    }
  }

  const handelCancel = e => {
    e.stopPropagation()
    e.target.classList.contains('user-page') && setEditName(false)
    e.target.classList.contains('user-page') && setEdiAvatar(false)
  }

  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'user-page user-page-active' : 'user-page'}
        onClick={handelCancel}
      >
        <img
          className={'avatar-edit' + (editAvatar ? ' hide' : '')}
          onClick={() => setEdiAvatar(!editAvatar)}
          src={pen}
          alt="pen logo"
        />
        {editAvatar &&
          <button className="profile-save avatar-save" onClick={handleSaveAvatar}>
            change
          </button>
        }
        <img
          className="user-page-avatar"
          src={currentUser.image}
          alt={`${currentUser.name}'s avatar`}
        />
        <div className="profile-name">
          {editName
            ? (<form className="profile-container" onSubmit={handleSaveName}>
              <input
                className="profile-input"
                name="name"
                type="text"
                value={edit.toString()}
                onChange={e => setEdit(e.target.value)}
              />
              <button className="profile-save" type="submit">
                save
              </button>
            </form>)
            : currentUser.name
          }
          <img
            className={'name-edit' + (editName ? ' hide' : '')}
            onClick={() => setEditName(true)}
            src={pen}
            alt="pen logo"
          />
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