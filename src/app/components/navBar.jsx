import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="nav">
      <button className="nav__button">{}</button>
      <h1 className="header-nav">Notepad</h1>
      <ul className="nav__list">
        <li className="nav__list_item">
          <Link className="nav__list_link" to="/signIn">
            Sign in
          </Link>
        </li>
        <li className="nav__list_item item-2">
          <Link className="nav__list_link link-2" to="/signUp">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar