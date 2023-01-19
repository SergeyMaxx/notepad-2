import React from 'react'
import {Link} from 'react-router-dom'
import Settings from './settings'

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav__list">
        <Link className="nav__list_item" aria-current="page" to="/signIn">
          Sign in
        </Link>
        <Link className="nav__list_item" to="/signUp">
          Sign up
        </Link>
      </div>
      <h1 className="nav-header">Notepad</h1>
      <Settings/>
    </nav>
  )
}

export default NavBar