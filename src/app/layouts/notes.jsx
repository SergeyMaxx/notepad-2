import React, {useEffect} from 'react'
import NoteList from '../components/noteList'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import NotePage from '../components/pages/notePage'
import {
  getBasketNotes,
  getFavoritesNotes,
  getLoading,
  getNotes,
  loadNotes,
  loadNotesFavorites,
  loadNotesTrash
} from '../Store/notes'

const Notes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {noteId} = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(getLoading())

  useEffect(() => {
    if (loading) {
      dispatch(loadNotes())
    }
  }, [notes])

  useEffect(() => {
    if (loading) {
      dispatch(loadNotesTrash())
    }
  }, [notesBasket])

  useEffect(() => {
    if (loading) {
      dispatch(loadNotesFavorites())
    }
  }, [notesFavorites])

  if (loading) {
    return <div>Loading...</div>
  }

  return noteId ? <NotePage/> : <NoteList/>
}

export default Notes