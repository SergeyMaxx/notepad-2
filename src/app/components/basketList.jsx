import React, {useState} from 'react'
import {getBasketNotes, noteDeleteAll} from '../Store/notes'
import {useDispatch, useSelector} from 'react-redux'
import ModalConfirmation from './modal/modalConfirmation'
import Search from './search'
import NoteBasket from './notes/noteBasket'

const BasketList = () => {
  const [searchText, setSearchText] = useState('')
  const [modalActive, setModalActive] = useState(false)
  const notesBasket = useSelector(getBasketNotes())
  const dispatch = useDispatch()

  const basketSearch = notesBasket.filter(note => note.header.toLowerCase().includes(searchText))

  const removeAll = () => {
    setModalActive(false)
    dispatch(noteDeleteAll())
  }

  return (
    <div className="note-list basket-list">
      <button className="note-list__add-note delete-all" onClick={() => setModalActive(true)}>
        Remove All
      </button>
      <ModalConfirmation
        active={modalActive}
        setActive={setModalActive}
        remove={removeAll}
        confirmationText="Are you sure you want to empty the trash?"
        buttonText="Yes. Clear"
      />
      <Search setSearchText={setSearchText}/>
      <div className="note-list__grid basket-list__grid">
        {basketSearch.map(note => <NoteBasket key={note.id} note={note}/>)}
      </div>
    </div>
  )
}

export default BasketList