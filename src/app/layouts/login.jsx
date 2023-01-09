import React from 'react'
import {useHistory} from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  return (
    <div className="login">
      <form onSubmit={e => e.preventDefault()}>
        <h1 className="login__header">Login</h1>
        <label>
          <input
            type="text"
            placeholder="Email Address"
            className="login__input"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            className="login__input password"
          />
        </label>
        <p className="login__account">
          Don't have account?
        </p>
        <p
          className="login__account signup"
          onClick={() => history.push('/signUp')}
        >
          Sign up
        </p>
        <button className="login__button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login