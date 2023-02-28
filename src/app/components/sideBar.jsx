import React from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes, getFavoritesNotes, getNotes} from '../Store/notes'
import {useHistory} from 'react-router-dom'
import {getUserId} from '../services/localStorage.service'
import folder from '../../icons/Folder.svg'
import trash from '../../icons/Trash.svg'

const SideBar = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const history = useHistory()

  return (
    <div className="side-bar">
      <div className="side-bar__list">
        <div className="side-bar__list_all" onClick={() => history.push('/notes')}>
          <img src={folder} alt="folder logo"/>
          <p className="side-bar__list_all-text">All notes :</p>
          <p className="side-bar__list_all-num">
            {notes.filter(n => n.userId === getUserId()).length}
          </p>
        </div>
        <div className="side-bar__list_favorites" onClick={() => history.push('/favorites')}>
          <img src={folder} alt="folder logo"/>
          <p className="side-bar__list_favorites-text">Favorites :</p>
          <p className="side-bar__list_favorites-num">
            {notesFavorites.filter(n => n.userId === getUserId()).length}
          </p>
        </div>
        <div className="side-bar__list_trash" onClick={() => history.push('/trash')}>
          <img className="side-bar__list_trash-bin" src={trash} alt="trash logo"/>
          <p className="side-bar__list_trash-text">Trash :</p>
          <p className="side-bar__list_trash-num">
            {notesBasket.filter(n => n.userId === getUserId()).length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SideBar