import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeFavorites, getFavoritesNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'
import EditNoteModal from '../modal/editNoteModal'
import back from '../../../icons/Back arrow.svg'
import edit from '../../../icons/Edit.svg'

const FavoritesPage = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const history = useHistory()
  const {favoritesNoteId} = useParams()
  const dispatch = useDispatch()

  let getById = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(getById))
  }, [notesFavorites])

  notesFavorites.length
    ? getById = notesFavorites.find(note => note.id === favoritesNoteId)
    : getById = JSON.parse(localStorage.getItem('current-notes'))

  const editNote = (userInput, userInputHeader) => {
    dispatch(changeFavorites({
      id: favoritesNoteId,
      newNote: userInput,
      header: userInputHeader
    }))
  }

  const handleBack = () => {
    localStorage.removeItem('current-notes')
    history.push('/favorites')
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

export default FavoritesPage