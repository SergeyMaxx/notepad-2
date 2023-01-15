import React from 'react'

const Settings = () => {
  return (
    <div>
      <button className="nav__settings"/>
      <div className="nav__settings-body">
        <p className="nav__settings-body_item">Settings</p>
        <p className="nav__settings-body_item log">Log out</p>
        <p className="nav__settings-body_item help">Help</p>
      </div>
    </div>
  )
}

export default Settings