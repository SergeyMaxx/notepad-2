import React, {useState} from 'react'
import Search from './search'
import AddNote from './addNote'
import Sort from './sort'
import Note from './notes/note'
import _ from 'lodash'
import {useSelector} from 'react-redux'
import {getNotes} from '../Store/notes'
import SideBar from './sideBar'

const NoteList = () => {
  const notes = useSelector(getNotes())
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState({iter: 'date', order: 'asc'})
  const notesSearch = notes.filter(note => note.header.toLowerCase().includes(searchText))
  const sortedNotes = _.orderBy(notesSearch, [sortBy.iter], [sortBy.order])

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
      <SideBar/>
      <div className="note-list__wrapper">
        <div className="note-list__container">
          <AddNote/>
          <Sort sort={handleSort}/>
          <Search setSearchText={setSearchText}/>
        </div>
        <div className="note-list__grid">
          {sortedNotes.map(note => <Note key={note.id} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default NoteList