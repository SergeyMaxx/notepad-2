import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ModalConfirmation from '../modal/modalConfirmation'
import {noteReturn} from '../../Store/notes'
import on from '../../../icons/Gold star.svg'
import off from '../../../icons/Star.svg'
import restore from '../../../icons/Restore.svg'
import trash from '../../../icons/Trash.svg'

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
          {note.favoritesStatus
            ? <img className="favorite-off" src={on} alt="off logo"/>
            : <img className="favorite-off" src={off} alt="on logo"/>
          }
          <img
            className="note-list__grid_item-trash "
            onClick={() => setModalActive(true)}
            src={restore}
            alt="trash logo"
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