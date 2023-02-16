import React, {useEffect} from 'react'
import NoteList from '../components/noteList'
import {useDispatch, useSelector} from 'react-redux'
import {getBasketNotes, getError, getFavoritesNotes, getLoading, getNotes, loadNotes} from '../Store/notes'
import {useParams} from 'react-router-dom'
import NotePage from '../components/pages/notePage'
import NotesLoader from '../components/HOC/notesLoader'
// import {getDataStatus} from '../Store/auth'

const Notes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {noteId} = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(getLoading())
  const error = useSelector(getError())

  useEffect(() => {
    if (loading) {
      dispatch(loadNotes())
    }
  }, [notes])

  useEffect(() => {
    if (loading) {
      dispatch(loadNotes())
    }
  }, [notesBasket])

  useEffect(() => {
    if (loading) {
      dispatch(loadNotes())
    }
  }, [notesFavorites])

  if (loading) {
    return <div>Loading...</div>
  }

  // if (error) {
  //   return <div>{error.message}</div>
  // }

  return noteId ? <NotePage/> : <NoteList/>
}

export default Notes