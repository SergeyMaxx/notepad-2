import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeFavoritesNote, getNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'
import EditNoteModal from '../modal/editNoteModal'

const FavoritesPage = () => {
  const notes = useSelector(getNotes())
  const [modalActive, setModalActive] = useState(false)
  const history = useHistory()
  const params = useParams()
  const {favoritesNoteId} = params
  const dispatch = useDispatch()

  const getById = notes.find(note => note.id === favoritesNoteId)

  const editNote = (userInput, userInputHeader) => {
    dispatch(changeFavoritesNote({
      id: favoritesNoteId,
      newNote: userInput,
      header: userInputHeader
    }))
  }

  return (
    <div className="note-page">
      <h2 className="note-page__header">
        {getById.header}
      </h2>
      <p className="note-page__body">
        {getById.newNote}
      </p>
      <i className="note-page__arrow" onClick={() => history.push('/favorites/')}/>
      <i className="note-page__edit" onClick={() => setModalActive(true)}/>
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

export default FavoritesPage