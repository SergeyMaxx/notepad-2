import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import BasketList from '../components/basketList'
import DeletedNotePage from '../components/pages/deletedNotePage'
import {useSelector} from 'react-redux'
import {getBasketNotes, getFavoritesNotes, getNotes} from '../Store/notes'

const DeletedNotes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const params = useParams()
  const {deletedNoteId} = params

  useEffect(() => {
    localStorage.setItem('notes-react', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('notesBasket-react', JSON.stringify(notesBasket))
  }, [notesBasket])

  useEffect(() => {
    localStorage.setItem('notesFavorites-react', JSON.stringify(notesFavorites))
  }, [notesFavorites])

  return deletedNoteId ? <DeletedNotePage/> : <BasketList/>
}

export default DeletedNotes