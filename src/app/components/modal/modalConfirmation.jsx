import React from 'react'
import PropTypes from 'prop-types'

const ModalConfirmation = ({active, setActive, remove, confirmationText, buttonText}) => {
  return (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal-confirmation modal-confirmation-active' : 'modal-confirmation'}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-confirmation__question">
          {confirmationText}
        </div>
        <button className="modal-confirmation__delete" onClick={remove}>
          {buttonText}
        </button>
        <button className="modal-confirmation__cancel" onClick={() => setActive(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

ModalConfirmation.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  remove: PropTypes.func,
  confirmationText: PropTypes.string,
  buttonText: PropTypes.string
}

export default ModalConfirmation