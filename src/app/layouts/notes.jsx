import React, {useEffect} from 'react'
import NoteList from '../components/noteList'
import {useSelector} from 'react-redux'
import {getBasketNotes, getFavoritesNotes, getNotes} from '../Store/notes'
import {useParams} from 'react-router-dom'
import NotePage from '../components/pages/notePage'

const Notes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {noteId} = useParams()

  useEffect(() => {
    localStorage.setItem('notes-react', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('notesBasket-react', JSON.stringify(notesBasket))
  }, [notesBasket])

  useEffect(() => {
    localStorage.setItem('notesFavorites-react', JSON.stringify(notesFavorites))
  }, [notesFavorites])

  return noteId ? <NotePage/> : <NoteList/>
}

export default Notes