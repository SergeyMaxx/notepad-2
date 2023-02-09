import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getIsLoggedIn} from '../Store/auth'
import {useAuth} from '../hooks/useAuth'

const ProtectedRoute = ({component: Component, children, ...rest}) => {
  // const isLoggedIn = useSelector(getIsLoggedIn())
  const {currentUser} = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser) {
          return <Redirect to="/"/>
        }
        return Component ? <Component {...props}/> : children
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProtectedRoute