import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import Settings from './settings'
import NavProfile from './navProfile'
import {useSelector} from 'react-redux'
import {getIsLoggedIn} from '../Store/auth'
import {useAuth} from '../hooks/useAuth'

const NavBar = () => {
  const history = useHistory()
  // const isLoggedIn = useSelector(getIsLoggedIn())
  const {currentUser} = useAuth()

  return (
    <nav className="nav">
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