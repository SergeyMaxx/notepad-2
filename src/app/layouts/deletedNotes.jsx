import React from 'react'
import {useParams} from 'react-router-dom'
import DeletedNotePage from '../components/pages/deletedNotePage'
import NoteLayoutsField from '../components/form/noteLayoutsField'
import TrashList from '../components/lists/trashList'

const DeletedNotes = () => {
  const {deletedNoteId} = useParams()

  return (
    <NoteLayoutsField
      id={deletedNoteId}
      page={<DeletedNotePage/>}
      list={<TrashList/>}
    />
  )
}

export default DeletedNotes