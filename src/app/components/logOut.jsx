import React, {useState} from 'react'
import ModalConfirmation from './modal/modalConfirmation'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

const LogOut = ({addClass, children}) => {
  const [modalLogout, setModalLogout] = useState(false)
  const history = useHistory()

  return (
    <>
      <div className={addClass} onClick={() => setModalLogout(true)}>
        {children}
        Log out
      </div>
      <ModalConfirmation
        active={modalLogout}
        setActive={setModalLogout}
        remove={() => history.push('/logout')}
        confirmationText="Do you really want out?"
        buttonText="Yes. I want to go out"
      />
    </>
  )
}

LogOut.propTypes = {
  addClass: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default LogOut