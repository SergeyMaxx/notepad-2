import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes} from '../../Store/notes'
import {useParams} from 'react-router-dom'
import NotePageField from '../form/notePageField'

const DeletedNotePage = () => {
  const notesBasket = useSelector(getBasketNotes())
  const {deletedNoteId} = useParams()

  let note = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(note))
  }, [notesBasket])

  notesBasket.length
    ? note = notesBasket.find(note => note.id === deletedNoteId)
    : note = JSON.parse(localStorage.getItem('current-notes'))

  return (
    <NotePageField
      note={note}
      path="/trash"
      isNotTrashPage={false}
    />
  )
}

export default DeletedNotePage