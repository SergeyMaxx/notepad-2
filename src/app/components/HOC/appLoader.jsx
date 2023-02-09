import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getUsersLoadingStatus} from '../../Store/auth'

const AppLoader = ({children}) => {
  const usersStatusLoading = useSelector(getUsersLoadingStatus())

  if (usersStatusLoading) return 'Loading...'
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader