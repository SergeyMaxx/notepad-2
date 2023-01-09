import React from 'react'
import {Link} from 'react-router-dom'
import Settings from './settings'

const NavBar = () => {
  return (
    <nav className="nav">
      <Settings/>
      <h1 className="header-nav">Notepad</h1>
      <div className="nav__list">
        <Link className="nav__list_item" aria-current="page" to="/signIn">
          Sign in
        </Link>
        <Link className="nav__list_item item-2" to="/signUp">
          Sign up
        </Link>
      </div>
    </nav>
  )
}

export default NavBar