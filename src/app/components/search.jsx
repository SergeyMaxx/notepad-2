import React from 'react'
import PropTypes from 'prop-types'

const Search = ({setSearchText}) => {
  return (
    <div className="note-list__container_search">
      <input
        type="text"
        className="note-list__container_search-input"
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search"
      />
      <i className="note-list__container_search-icon"/>
    </div>
  )
}

Search.propTypes = {
  setSearchText: PropTypes.func
}

export default Search