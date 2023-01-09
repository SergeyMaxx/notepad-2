import React from 'react'
import NavBar from './components/navBar'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './layouts/login'
import Register from './layouts/register'
import Notes from './layouts/notes'
import SideBar from './components/sideBar'
import DeletedNotes from './layouts/deletedNotes'
import './CSS/note.css'
import './CSS/delete.css'
import './CSS/favorites.css'
import './CSS/login.css'
import './CSS/register.css'
import './CSS/settings.css'
import FavoritesNotes from './layouts/favoritesNotes'

function App() {
  return (
    <>
      <NavBar/>
      <SideBar/>
      <Switch>
        <Route path="/signIn" component={Login}/>
        <Route path="/signUp" component={Register}/>
        <Route path="/basket/:deletedNoteId?" component={DeletedNotes}/>
        <Route path="/favorites/:favoritesNoteId?" component={FavoritesNotes}/>
        <Route path="/:noteId?" component={Notes}/>
        <Redirect to="/"/>
      </Switch>
    </>
  )
}

export default App