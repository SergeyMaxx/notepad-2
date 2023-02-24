import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {change, changeFavorites, getFavoritesNotes, getNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'
import EditNoteModal from '../modal/editNoteModal'

const NotePage = () => {
  const notes = useSelector(getNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const history = useHistory()
  const {noteId} = useParams()
  const dispatch = useDispatch()

  const getById = notes.find(note => note.id === noteId)

  const editNote = (userInput, userInputHeader) => {
    if (notesFavorites.includes(getById)) {
      dispatch(changeFavorites({
        id: noteId,
        newNote: userInput,
        header: userInputHeader
      }))
    } else {
      dispatch(change({
        id: noteId,
        newNote: userInput,
        header: userInputHeader
      }))
    }
  }

  return (
    <div className="note-page">
      <h2 className="note-page__header">
        {getById.header}
      </h2>
      <p className="note-page__body">
        {getById.newNote}
      </p>
      <div className="note-page__container">
        <i className="note-page__container_arrow" onClick={() => history.push('/notes')}/>
        <i className="note-page__container_edit" onClick={() => setModalActive(true)}/>
      </div>
      <EditNoteModal
        active={modalActive}
        setActive={setModalActive}
        valueHeader={getById.header}
        valueNote={getById.newNote}
        editNote={editNote}
      />
    </div>
  )
}

export default NotePage