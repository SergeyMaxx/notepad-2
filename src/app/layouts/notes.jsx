import React, {useEffect} from 'react'
import NoteList from '../components/noteList'
import {useDispatch, useSelector} from 'react-redux'
import {getBasketNotes, getFavoritesNotes, getNotes, loadNotes} from '../Store/notes'
import {useParams} from 'react-router-dom'
import NotePage from '../components/pages/notePage'
// import {getDataStatus} from '../Store/auth'

const Notes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {noteId} = useParams()
  // const dispatch = useDispatch()
  // const dataStatus = useSelector(getDataStatus())

  useEffect(() => {
    // if (!dataStatus) {
    //   dispatch(loadNotes(notes))
    // }
    localStorage.setItem('notes-react', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    // if (!dataStatus) {
    //   dispatch(loadNotes(notesBasket))
    // }
    localStorage.setItem('notesBasket-react', JSON.stringify(notesBasket))
  }, [notesBasket])

  useEffect(() => {
    // if (!dataStatus) {
    //   dispatch(loadNotes(notesFavorites))
    // }
    localStorage.setItem('notesFavorites-react', JSON.stringify(notesFavorites))
  }, [notesFavorites])

  return noteId ? <NotePage/> : <NoteList/>
}

export default Notes