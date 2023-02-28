import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {favoritesOff, noteDelete, removeFavorites} from '../../Store/notes'
import trash from '../../../icons/Trash.svg'
import NoteField from '../form/noteField'

const NoteFavorites = ({note}) => {
  const [modalActive, setModalActive] = useState(false)
  const [addToFavorites, setAddToFavorites] = useState(true)
  const dispatch = useDispatch()

  const removeNote = () => {
    setModalActive(false)
    dispatch(noteDelete(note))
    dispatch((removeFavorites(note.id)))
  }

  const toggleFavorites = () => {
    dispatch(favoritesOff({note, status: addToFavorites}))
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
    <NoteField
      note={note}
      path={`/favorites/${note.id}`}
      handleFavorites={toggleFavorites}
      setModalActive={setModalActive}
      modalActive={modalActive}
      trashIcon={trash}
      deleteNote={removeNote}
      question='Are you sure you want to delete this note?'
      textBtn='Yes. Delete this note'
    />
  )
}

export default NoteFavorites