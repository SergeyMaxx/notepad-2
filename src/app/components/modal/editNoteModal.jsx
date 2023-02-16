import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'

const EditNoteModal = ({active, setActive, editNote, valueHeader, valueNote}) => {
  const [userInput, setUserInput] = useState(valueNote)
  const [userInputHeader, setUserInputHeader] = useState(valueHeader)
  const dispatch = useDispatch()

  const characterLimit = 800
  const headerCharacterLimit = 60

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
    dispatch(editNote(userInput, userInputHeader))
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
            value={userInputHeader.toString()}
            onChange={handleChangeHeader}
            placeholder="Title editing..."
            className="content-header"
          />
          <small className="remaining-header">
            {headerCharacterLimit - userInputHeader.length} Remaining
          </small>
          <textarea
            value={userInput.toString()}
            onChange={handleChange}
            placeholder="Editing a note..."
            className="content-body"
          />
          <small className="remaining-body">
            {characterLimit - userInput.length} Remaining
          </small>
          <button
            className="modal-button"
            onClick={() => setActive(false)}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

EditNoteModal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  editNote: PropTypes.func,
  valueHeader: PropTypes.string,
  valueNote: PropTypes.string,
}

export default EditNoteModal