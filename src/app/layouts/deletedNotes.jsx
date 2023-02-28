import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TrashList from '../components/trashList'
import DeletedNotePage from '../components/pages/deletedNotePage'
import {useDispatch, useSelector} from 'react-redux'
import {
  getBasketNotes,
  getFavoritesNotes,
  getLoading,
  getNotes,
  loadNotes,
  loadNotesFavorites,
  loadNotesTrash
} from '../Store/notes'
import Loader from '../components/loader'

const DeletedNotes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {deletedNoteId} = useParams()
  const loading = useSelector(getLoading())
  const dispatch = useDispatch()

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

  if (loading) return <Loader/>

  return deletedNoteId ? <DeletedNotePage/> : <TrashList/>
}

export default DeletedNotes