import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ModalConfirmation from '../modal/modalConfirmation'
import {noteReturn} from '../../Store/notes'

const NoteTrash = ({note}) => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const dispatch = useDispatch()

  const restoreNote = () => {
    setModalActive(false)
    dispatch(noteReturn(note))
  }

  return (
    <>
      <div className="note-list__grid_item">
        <h2 className="note-list__grid_item-header">
          {note.header}
        </h2>
        <div
          className="note-list__grid_item-body"
          onClick={() => history.push(`/trash/${note.id}`)}
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
          <i className={note.favoritesStatus ? 'favorite-off favorite-on' : 'favorite-off'}
          />
          <i
            className="note-list__grid_item-trash restore_item-trash"
            onClick={() => setModalActive(true)}
          />
        </div>
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

export default NoteTrash