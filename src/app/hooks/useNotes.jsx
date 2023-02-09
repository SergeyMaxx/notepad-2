import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import noteService from '../services/note.service'
import {toast} from 'react-toastify'
import {useAuth} from './useAuth'

const NotesContext = React.createContext()

export const useNotes = () => useContext(NotesContext)

const NotesProvider = ({children}) => {
  const [notes, setNotes] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {currentUser} = useAuth()

  useEffect(() => {
    getNotes()
  }, [currentUser.id])

  async function createNotes(data) {
    try {
      const {content} = await noteService.createNote(data)
      console.log(content)

    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getNotes() {
    try {
      const {content} = await noteService.getNotes(currentUser.id)
      setNotes(content)

    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
    }
  }

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <NotesContext.Provider value={{notes, createNotes, isLoading}}>
      {children}
    </NotesContext.Provider>
  )
}

NotesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default NotesProvider