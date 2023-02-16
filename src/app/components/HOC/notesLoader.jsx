import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getDataStatus, loadNotes} from '../../Store/notes'

const NotesLoader = ({children}) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadNotes())
    }
  }, [])

  if (!dataStatus) return 'Loading...'
  return children
}

NotesLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default NotesLoader