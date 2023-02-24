import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeFavorites, getFavoritesNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'
import EditNoteModal from '../modal/editNoteModal'

const FavoritesPage = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const history = useHistory()
  const {favoritesNoteId} = useParams()
  const dispatch = useDispatch()

  const getById = notesFavorites.find(note => note.id === favoritesNoteId)

  const editNote = (userInput, userInputHeader) => {
    dispatch(changeFavorites({
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
      <div className="note-page__container">
        <i className="note-page__container_arrow" onClick={() => history.push('/favorites/')}/>
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

export default FavoritesPage