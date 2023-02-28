import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFavoritesNotes, openSettings} from '../Store/notes'
import _ from 'lodash'
import Sort from './sort'
import Search from './search'
import NoteFavorites from './notes/noteFavorites'
import SideBar from './sideBar'
import {getUserId} from '../services/localStorage.service'

const FavoritesList = () => {
  const notesFavorites = useSelector(getFavoritesNotes())
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})
  const dispatch = useDispatch()

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

  const handelCancel = e => {
    if (e.target.classList.contains('note-list__wrapper') ||
      e.target.classList.contains('note-list__grid')) {
      dispatch(openSettings({status: false}))
    }
  }

  return (
    <div className="note-list" onClick={handelCancel}>
      <SideBar/>
      <div className="note-list__wrapper">
        <div className="note-list__container">
          <Sort sort={handleSort}/>
          <Search setSearchText={setSearchText}/>
        </div>
        <div className="note-list__grid">
          {sortedNotes.filter(none => none.userId === getUserId()).map(note => (
            <NoteFavorites key={note.id} note={note}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FavoritesList