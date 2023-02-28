import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeFavorites, getFavoritesNotes} from '../../Store/notes'
import {useParams} from 'react-router-dom'
import NotePageField from '../form/notePageField'

const FavoritesPage = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const {favoritesNoteId} = useParams()
  const dispatch = useDispatch()

  let note = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(note))
  }, [notesFavorites])

  notesFavorites.length
    ? note = notesFavorites.find(note => note.id === favoritesNoteId)
    : note = JSON.parse(localStorage.getItem('current-notes'))

  const editNote = (userInput, userInputHeader) => {
    dispatch(changeFavorites({
      id: favoritesNoteId,
      newNote: userInput,
      header: userInputHeader
    }))
  }

  return (
    <NotePageField
      note={note}
      path="/favorites"
      modalActive={modalActive}
      setModalActive={setModalActive}
      changeNote={editNote}
      isNotTrashPage={true}
    />
  )
}

export default FavoritesPage