import React from 'react'
import {useParams} from 'react-router-dom'
import FavoritesPage from '../components/pages/favoritesPage'
import NoteLayoutsField from '../components/form/noteLayoutsField'
import FavoritesList from '../components/lists/favoritesList'

const FavoritesNotes = () => {
  const {favoritesNoteId} = useParams()

  return (
    <NoteLayoutsField
      id={favoritesNoteId}
      page={<FavoritesPage/>}
      list={<FavoritesList/>}
    />
  )
}

export default FavoritesNotes