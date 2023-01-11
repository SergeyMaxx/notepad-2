import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ModalConfirmation from '../modal/modalConfirmation'
import {noteReturn} from '../../Store/notes'

const NoteBasket = ({note}) => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  const restoreNote = () => {
    setModalActive(false)
    dispatch(noteReturn({id: note.id}))
  }

  return (
    <>
      <div className="note-list__grid_item">
        <h2 className="note-list__grid_item-header">
          {note.header}
        </h2>
        <div
          className="note-list__grid_item-body"
          onClick={() => history.push(`/basket/${note.id}`)}
        >
          <p className="note-list__grid_item-body-hidden">
            {note.newNote}
          </p>
        </div>
        <span className="note-list__grid_item-date">{note.date}</span>
        <span className="note-list__grid_item-time">{note.time}</span>
        <i className={note.favoritesStatus ? 'favorite-off favorite-on' : 'favorite-off'}
        />
        <i
          className="note-list__grid_item-trash restore_item-trash"
          onClick={() => setModalActive(true)}
        />
      </div>
      <ModalConfirmation
        active={modalActive}
        setActive={setModalActive}
        remove={restoreNote}
        confirmationText="Are you sure you want to restore the note?"
        buttonText="Yes. Restore this note"
      />
    </>
  )
}

export default NoteBasket