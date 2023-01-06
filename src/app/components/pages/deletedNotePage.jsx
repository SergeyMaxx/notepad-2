import React from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'

const DeletedNotePage = () => {
  const notesBasket = useSelector(getBasketNotes())
  const history = useHistory()
  const params = useParams()
  const {deletedNoteId} = params
  const getById = notesBasket.find(note => note.id === deletedNoteId)

  return (
    <div className="note-page">
      <h2 className="note-page__header">
        {getById.header}
      </h2>
      <p className="note-page__body">
        {getById.newNote}
      </p>
      <i className="note-page__arrow" onClick={() => history.push('/basket')}/>
    </div>
  )
}

export default DeletedNotePage