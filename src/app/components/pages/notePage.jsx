import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {change, changeFavorites, getFavoritesNotes, getNotes} from '../../Store/notes'
import {useParams} from 'react-router-dom'
import NotePageField from '../form/notePageField'

const NotePage = () => {
  const notes = useSelector(getNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const [modalActive, setModalActive] = useState(false)
  const {noteId} = useParams()
  const dispatch = useDispatch()

  let note = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(note))
  }, [notes])

  notes.length
    ? note = notes.find(note => note.id === noteId)
    : note = JSON.parse(localStorage.getItem('current-notes'))

  const editNote = (userInput, userInputHeader) => {
    if (notesFavorites.includes(note)) {
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
    <NotePageField
      note={note}
      path="/notes"
      modalActive={modalActive}
      setModalActive={setModalActive}
      changeNote={editNote}
      isNotTrashPage={true}
    />
  )
}

export default NotePage