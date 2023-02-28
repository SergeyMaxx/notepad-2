import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {addFavorites, noteDelete, removeFavorites} from '../../Store/notes'
import trash from '../../../icons/Trash.svg'
import NoteField from '../form/noteField'

const Note = ({note}) => {
  const [modalActive, setModalActive] = useState(false)
  const [addToFavorites, setAddToFavorites] = useState(true)
  const dispatch = useDispatch()

  const removeNote = () => {
    setModalActive(false)
    dispatch(noteDelete(note))
    dispatch((removeFavorites(note.id)))
  }

  const favoritesToggle = () => {
    dispatch(addFavorites({note, status: addToFavorites}))
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
      path={`/notes/${note.id}`}
      handleFavorites={favoritesToggle}
      setModalActive={setModalActive}
      modalActive={modalActive}
      trashIcon={trash}
      deleteNote={removeNote}
      question='Are you sure you want to delete this note?'
      textBtn='Yes. Delete this note'
    />
  )
}

export default Note