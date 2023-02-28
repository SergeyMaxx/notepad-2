import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Settings from './settings'
import NavProfile from './navProfile'
import {useAuth} from '../hooks/useAuth'
import {openSettings} from '../Store/notes'
import {useDispatch} from 'react-redux'

const NavBar = () => {
  const history = useHistory()
  const {currentUser} = useAuth()
  const dispatch = useDispatch()

  const handelCancel = e => {
    if (e.target.classList.contains('nav') ||
      e.target.classList.contains('nav-row')) {
      dispatch(openSettings({status: false}))
    }
  }

  return (
    <nav className="nav" onClick={handelCancel}>
      <div className="nav-row">
        <ul className="nav-list">
          {currentUser
            ? <NavProfile/>
            : <>
              <li className="nav-list__item" onClick={() => history.push('/signIn')}>
                <Link className="nav-list__link" to="/signIn">
                  Sign in
                </Link>
              </li>
              <li className="nav-list__item" onClick={() => history.push('/signUp')}>
                <Link className="nav-list__link" to="/signUp">
                  Sign up
                </Link>
              </li>
            </>}
        </ul>
        <h1 className="nav-header">Notepad</h1>
        {currentUser && <Settings/>}
      </div>
    </nav>
  )
}

export default NavBar