import React from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes, getFavoritesNotes, getNotes} from '../Store/notes'
import {useHistory} from 'react-router-dom'

const SideBar = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const history = useHistory()

  return (
    <div className="side-bar">
      <div className="side-bar__list">
        <div className="side-bar__list_all" onClick={() => history.push('/notes')}>
          <i className="side-bar__list_all-folder"/>
          <p className="side-bar__list_all-text">All notes :</p>
          <p className="side-bar__list_all-num">{notes.length}</p>
        </div>
        <div className="side-bar__list_favorites" onClick={() => history.push('/favorites')}>
          <i className="side-bar__list_favorites-folder"/>
          <p className="side-bar__list_favorites-text">Favorites :</p>
          <p className="side-bar__list_favorites-num">{notesFavorites.length}</p>
        </div>
        <div className="side-bar__list_trash" onClick={() => history.push('/trash')}>
          <i className="side-bar__list_trash-bin"/>
          <p className="side-bar__list_trash-text">Trash :</p>
          <p className="side-bar__list_trash-num">{notesBasket.length}</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar