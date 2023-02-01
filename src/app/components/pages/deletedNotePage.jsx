import React from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'

const DeletedNotePage = () => {
  const notesBasket = useSelector(getBasketNotes())
  const history = useHistory()
  const {deletedNoteId} = useParams()
  const getById = notesBasket.find(note => note.id === deletedNoteId)

  return (
    <div className="note-page">
      <h2 className="note-page__header">
        {getById.header}
      </h2>
      <p className="note-page__body">
        {getById.newNote}
      </p>
      <div className="note-page__container">
        <i className="note-page__container_arrow" onClick={() => history.push('/basket')}/>
      </div>
    </div>
  )
}

export default DeletedNotePage