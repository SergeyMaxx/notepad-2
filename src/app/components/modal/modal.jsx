import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {createNote} from '../../Store/notes'

const Modal = ({active, setActive}) => {
  const [userInput, setUserInput] = useState('')
  const [userInputHeader, setUserInputHeader] = useState('')
  const dispatch = useDispatch()

  const characterLimit = 800
  const headerCharacterLimit = 60

  const addNote = (userInput, userInputHeader) => {
    if (userInput || userInputHeader) {
      dispatch(createNote({
        id: Math.random().toString(36).slice(2),
        header: userInputHeader,
        newNote: userInput,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        favoritesStatus: false
      }))
    }
  }

  const handleChange = ({target}) => {
    if (characterLimit - target.value.length >= 0) {
      setUserInput(target.value)
    }
  }
  const handleChangeHeader = ({target}) => {
    if (headerCharacterLimit - target.value.length >= 0) {
      setUserInputHeader(target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    addNote(userInput, userInputHeader)
    setUserInput('')
    setUserInputHeader('')
  }

  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'content content-active' : 'content'}
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <input
            value={userInputHeader}
            onChange={handleChangeHeader}
            placeholder="Enter header..."
            className="content-header"
          />
          <small className="remaining-header">
            {headerCharacterLimit - userInputHeader.length} Remaining
          </small>
          <textarea
            value={userInput}
            onChange={handleChange}
            placeholder="Enter new note..."
            className="content-body"
          />
          <small className="remaining-body">
            {characterLimit - userInput.length} Remaining
          </small>
          <button
            className="modal-button"
            onClick={() => setActive(false)}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}

export default Modal