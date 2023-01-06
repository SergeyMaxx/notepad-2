import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {favoritesOff, noteDelete, removeFavorites} from '../../Store/notes'
import ModalConfirmation from '../modal/modalConfirmation'

const NoteFavorites = ({note}) => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  const removeNote = () => {
    setModalActive(false)
    dispatch(noteDelete({id: note.id}))
  }

  const toggleFavorites = () => {
    dispatch(favoritesOff({id: note.id}))
    dispatch(removeFavorites({id: note.id}))
  }

  return (
    <div className="note-list__grid_item">
      <h2 className="note-list__grid_item-header">
        {note.header}
      </h2>
      <div
        className="note-list__grid_item-body"
        onClick={() => history.push(`/favorites/${note.id}`)}
      >
        <p className="note-list__grid_item-body-hidden">
          {note.newNote}
        </p>
      </div>
      <span className="note-list__grid_item-date">{note.date}</span>
      <span className="note-list__grid_item-time">{note.time}</span>
      <i className={note.favoritesStatus ? 'favorite-off favorite-on' : 'favorite-off'}
         onClick={toggleFavorites}
      />
      <i className="note-list__grid_item-trash" onClick={() => setModalActive(true)}/>
      <ModalConfirmation
        active={modalActive}
        setActive={setModalActive}
        remove={removeNote}
        confirmationText="Are you sure you want to delete this note?"
        buttonText="Yes. Delete this note"
      />
    </div>
  )
}

export default NoteFavorites