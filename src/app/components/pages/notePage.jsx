import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {change, changeFavorites, getFavoritesNotes, getNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'
import EditNoteModal from '../modal/editNoteModal'
import back from '../../../icons/Back arrow.svg'
import edit from '../../../icons/Edit.svg'

const NotePage = () => {
  const notes = useSelector(getNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const history = useHistory()
  const {noteId} = useParams()
  const dispatch = useDispatch()

  let getById = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(getById))
  }, [notes])

  notes.length
    ? getById = notes.find(note => note.id === noteId)
    : getById = JSON.parse(localStorage.getItem('current-notes'))

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

  const handleBack = () => {
    localStorage.removeItem('current-notes')
    history.push('/notes')
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
        <img
          className="note-page__container_arrow"
          onClick={handleBack}
          src={back}
          alt="back arrow logo"
        />
        <img
          className="note-page__container_edit"
          onClick={() => setModalActive(true)}
          src={edit}
          alt="edit logo"
        />
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