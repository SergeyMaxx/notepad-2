import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getDataStatus, loadUsersList} from '../../Store/auth'

const UsersLoader = ({children}) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])
  if (!dataStatus) return 'Loading'
  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader
