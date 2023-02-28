import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ModalConfirmation from '../modal/modalConfirmation'
import {addFavorites, noteDelete, removeFavorites} from '../../Store/notes'
import off from '../../../icons/Star.svg'
import on from '../../../icons/Gold star.svg'
import trash from '../../../icons/Trash.svg'

const Note = ({note}) => {
  const [modalActive, setModalActive] = useState(false)
  const [addToFavorites, setAddToFavorites] = useState(true)
  const history = useHistory()
  const dispatch = useDispatch()

  const removeNote = () => {
    setModalActive(false)
    dispatch(noteDelete(note))
    dispatch((removeFavorites(note.id)))
  }

  const favoritesToggle = () => {
    dispatch(addFavorites({note, status: addToFavorites}))
    setAddToFavorites(!addToFavorites)
    localStorage.setItem(`${note.id}_favoritesStatus`, `${!addToFavorites}`)
  }

  useEffect(() => {
    const storedValue = localStorage.getItem(`${note.id}_favoritesStatus`)

    if (storedValue !== null) {
      setAddToFavorites(JSON.parse(storedValue))
    }
  }, [note.id, note.favoritesStatus])

  return (
    <>
      <div className="note-list__grid_item">
        <h2 className="note-list__grid_item-header">
          {note.header}
        </h2>
        <div
          className="note-list__grid_item-body"
          onClick={() => history.push(`/notes/${note.id}`)}
        >
          <p className="note-list__grid_item-body-hidden">
            {note.newNote}
          </p>
          <div className="data-block">
            <span className="note-list__grid_item-date">{note.date}</span>
            <span className="note-list__grid_item-time">{note.time}</span>
          </div>
        </div>
        <div className="box">
          {note.favoritesStatus
            ? <img className="favorite-off" src={on} alt="off logo" onClick={favoritesToggle}/>
            : <img className="favorite-off" src={off} alt="on logo" onClick={favoritesToggle}/>
          }
          <img
            className="note-list__grid_item-trash"
            onClick={() => setModalActive(true)}
            src={trash}
            alt="trash logo"
          />
        </div>
      </div>
      <ModalConfirmation
        active={modalActive}
        setActive={setModalActive}
        remove={removeNote}
        confirmationText="Are you sure you want to delete this note?"
        buttonText="Yes. Delete this note"
      />
    </>
  )
}

export default Note