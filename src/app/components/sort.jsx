import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Sort = ({sort}) => {
  const [state, setState] = useState(false)

  const changeSort = () => {
    sort()
    setState(prevState => !prevState)
  }

  return (
    <div className="note-list__sort" onClick={changeSort}>
      <i className={state ? 'note-list__sort_icon icon-up' : 'note-list__sort_icon'}/>
      <span className="note-list__sort_first">
        First new
      </span>
    </div>
  )
}

Sort.propTypes = {
  sort: PropTypes.func.isRequired
}

export default Sort