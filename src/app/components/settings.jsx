import React, {useState} from 'react'
import sun from '../../icons/sun.svg'
import moon from '../../icons/moon.svg'

const Settings = () => {
  const [state, setState] = useState(false)
  const [settings, setSettings] = useState(false)

  const darkModeToggler = () => {
    const nav = document.querySelector('.nav')
    const sideBar = document.querySelector('.side-bar')

    setState(prevState => !prevState)
    nav.classList.toggle('nav-dark')
    sideBar.classList.toggle('side-bar-dark')
    const isDark = document.body.classList.toggle('dark')
    isDark ? localStorage.setItem('darkMode', 'dark') : localStorage.setItem('darkMode', 'light')
  }

  // useEffect(() => {
  //   if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
  //     document.body.classList.add('dark')
  //   }
  // }, [])

  return (
    <>
      <button className="nav-settings" onClick={() => setSettings(p => !p)}/>
      <div className={'nav-settings-body' + (settings ? ' op' : '')}>
        <p className="nav-settings-body__item">Settings</p>
        <p className="nav-settings-body__item">Log out</p>
        <span className="nav-settings-body__item" onClick={darkModeToggler}>
          Dark mode
        </span>
        <button
          className={'dark-mode-btn' + (state ? ' dark-mode-btn__active' : '')}
          onClick={darkModeToggler}
        >
          <img src={sun} alt="sun" className="dark-mode-btn__sun"/>
          <img src={moon} alt="moon" className="dark-mode-btn__moon"/>
        </button>
      </div>
    </>
  )
}

export default Settings