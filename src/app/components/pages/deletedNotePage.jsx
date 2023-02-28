import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getBasketNotes} from '../../Store/notes'
import {useHistory, useParams} from 'react-router-dom'
import back from '../../../icons/Back arrow.svg'

const DeletedNotePage = () => {
  const notesBasket = useSelector(getBasketNotes())
  const history = useHistory()
  const {deletedNoteId} = useParams()

  let getById = null

  useEffect(() => {
    localStorage.setItem('current-notes', JSON.stringify(getById))
  }, [notesBasket])

  notesBasket.length
    ? getById = notesBasket.find(note => note.id === deletedNoteId)
    : getById = JSON.parse(localStorage.getItem('current-notes'))

  const handleBack = () => {
    localStorage.removeItem('current-notes')
    history.push('/trash')
  }

  return (
    <div className="note-page">
      <h2 className="note-page__header">
        {getById.header}
      </h2>
      <p className="note-page__body">
        {getById.newNote}
      </p>
      <div className="note-page__container">
        <img
          className="note-page__container_arrow"
          onClick={handleBack}
          src={back}
          alt="back arrow logo"
        />
      </div>
    </div>
  )
}

export default DeletedNotePage