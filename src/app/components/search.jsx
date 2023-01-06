import React from 'react'
import PropTypes from 'prop-types'

const Search = ({setSearchText}) => {
  return (
    <div className="note-list__search">
      <i className="note-list__search_icon"/>
      <input
        type="text"
        className="note-list__search_input"
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search..."
      />
    </div>
  )
}

Search.propTypes = {
  setSearchText: PropTypes.func
}

export default Search