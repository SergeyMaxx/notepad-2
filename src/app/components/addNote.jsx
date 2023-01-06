import React, {useState} from 'react'
import Modal from './modal/modal'

const AddNote = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <>
      <div className="note-list__add-note" onClick={() => setModalActive(true)}>
        <i className="note-list__add-note_plus"/>
        <span className="note-list__add-note_new">New</span>
      </div>
      <Modal active={modalActive} setActive={setModalActive}/>
    </>
  )
}

export default AddNote