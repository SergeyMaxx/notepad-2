import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getFavoritesNotes} from '../Store/notes'
import _ from 'lodash'
import AddNote from './addNote'
import Sort from './sort'
import Search from './search'
import NoteFavorites from './notes/noteFavorites'

const FavoritesList = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})

  const favoritesSearch = notesFavorites.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(favoritesSearch, [sortBy.iter], [sortBy.order])

  const handleSort = item => {
    if (sortBy.iter === item) {
      setSortBy(prevState => ({
        ...prevState,
        order: prevState.order === 'asc' ? 'desc' : 'asc'
      }))
    } else {
      setSortBy(prevState => ({
        ...prevState,
        order: prevState.order === 'desc' ? 'asc' : 'desc'
      }))
    }
  }

  return (
    <div className="note-list">
      <Sort sort={handleSort} styleFavorite='note-list__sort_favorite'/>
      <Search setSearchText={setSearchText}/>
      <div className="note-list__grid">
        {sortedNotes.map(note => <NoteFavorites key={note.id} note={note}/>)}
      </div>
    </div>
  )
}

export default FavoritesList