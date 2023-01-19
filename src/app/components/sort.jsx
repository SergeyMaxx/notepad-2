import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Sort = ({sort, styleFavorite}) => {
  const [state, setState] = useState(false)

  const changeSort = () => {
    sort()
    setState(prevState => !prevState)
  }

  return (
    <div className={`note-list__container_sort ${styleFavorite}`} onClick={changeSort}>
      <span className="note-list__container_sort-first">First new</span>
      <i className={
        state
          ? 'note-list__container_sort-icon note-list__container_sort-icon-up'
          : 'note-list__container_sort-icon'
      }/>
    </div>
  )
}

Sort.propTypes = {
  sort: PropTypes.func.isRequired,
  styleFavorite: PropTypes.string
}

export default Sort