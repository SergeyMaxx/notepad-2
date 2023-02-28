import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import EditUserPage from './pages/editUserPage'
import ModalConfirmation from './modal/modalConfirmation'
import {useDispatch, useSelector} from 'react-redux'
import {getSettingsOpen, openSettings} from '../Store/notes'
import settingsIcon from '../../icons/Settings.svg'
import sun from '../../icons/sun.svg'
import moon from '../../icons/moon.svg'

const Settings = () => {
  const [modalActive, setModalActive] = useState(false)
  const [modalLogout, setModalLogout] = useState(false)
  const [state, setState] = useState(false)
  const settingsStatus = useSelector(getSettingsOpen())
  const history = useHistory()
  const dispatch = useDispatch()

  const darkModeToggler = () => {
    const nav = document.querySelector('.nav')
    const navProfile = document.querySelector('.nav-profile-name')
    const sideBar = document.querySelector('.side-bar')

    setState(prevState => !prevState)
    nav.classList.toggle('nav-dark')
    navProfile.classList.toggle('nav-profile-name-dark')
    sideBar.classList.toggle('side-bar-dark')
    const isDark = document.body.classList.toggle('dark')
    isDark ? localStorage.setItem('darkMode', 'dark') : localStorage.setItem('darkMode', 'light')
  }

  // useEffect(() => {
  //   if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
  //     document.body.classList.add('dark')
  //   }
  // }, [])

  useEffect(() => {
    if (!modalActive) {
      dispatch(openSettings({status: false}))
    }
  }, [modalActive])

  return (
    <>
      <button
        className="nav-settings"
        onClick={() => dispatch(openSettings({status: !settingsStatus}))}>
        <img className="nav-settings-logo" src={settingsIcon} alt="settings logo"/>
      </button>
      <div className={'nav-settings-body' + (settingsStatus ? ' op' : '')}>
        <div className="nav-settings-body__item" onClick={() => setModalActive(true)}>
          Settings
        </div>
        <EditUserPage active={modalActive} setActive={setModalActive}/>
        <div className="nav-settings-body__item" onClick={() => setModalLogout(true)}>
          Log out
        </div>
        <span className="nav-settings-body__item" onClick={darkModeToggler}>
          Dark mode
        </span>
        <button
          className={'dark-mode-btn' + (state ? ' dark-mode-btn__active' : '')}
          onClick={darkModeToggler}
        >
          <img className="dark-mode-btn__sun" src={sun} alt="sun"/>
          <img className="dark-mode-btn__moon" src={moon} alt="moon"/>
        </button>
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

export default Settings