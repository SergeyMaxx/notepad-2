import React from 'react'
import {Link} from 'react-router-dom'
import Settings from './settings'

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav-row">
        <ul className="nav-list">
          <li className="nav-list__item">
            <Link className="nav-list__link" to="/signIn">
              Sign in
            </Link>
          </li>
          <li className="nav-list__item">
            <Link className="nav-list__link" to="/signUp">
              Sign up
            </Link>
          </li>
        </ul>
        <h1 className="nav-header">Notepad</h1>
        <Settings/>
      </div>
    </nav>
  )
}

export default NavBar