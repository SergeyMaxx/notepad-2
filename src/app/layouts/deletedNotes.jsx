import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TrashList from '../components/trashList'
import DeletedNotePage from '../components/pages/deletedNotePage'
import {useSelector} from 'react-redux'
import {getBasketNotes, getFavoritesNotes, getNotes} from '../Store/notes'

const DeletedNotes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {deletedNoteId} = useParams()

  useEffect(() => {
    localStorage.setItem('notes-react', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('notesTrash-react', JSON.stringify(notesBasket))
  }, [notesBasket])

  useEffect(() => {
    localStorage.setItem('notesFavorites-react', JSON.stringify(notesFavorites))
  }, [notesFavorites])

  return deletedNoteId ? <DeletedNotePage/> : <TrashList/>
}

export default DeletedNotes