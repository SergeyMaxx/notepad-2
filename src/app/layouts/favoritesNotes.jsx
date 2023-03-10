import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import FavoritesList from '../components/favoritesList'
import FavoritesPage from '../components/pages/favoritesPage'
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

const FavoritesNotes = () => {
  const notes = useSelector(getNotes())
  const notesBasket = useSelector(getBasketNotes())
  const notesFavorites = useSelector(getFavoritesNotes())
  const {favoritesNoteId} = useParams()
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

  return favoritesNoteId ? <FavoritesPage/> : <FavoritesList/>
}

export default FavoritesNotes