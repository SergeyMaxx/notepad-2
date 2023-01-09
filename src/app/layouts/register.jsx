import React from 'react'
import {useHistory} from 'react-router-dom'

const Register = () => {
  const history = useHistory()

  return (
    <div className="login">
      <form onSubmit={e => e.preventDefault()}>
        <h1 className="login__header register__header">Registration</h1>
        <label>
          <input
            type="text"
            placeholder="Name"
            className="login__input"
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Email Address"
            className="login__input email"
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            className="login__input password password-register"
            required
          />
        </label>
        <p className="login__account already">
          Already have account?
        </p>
        <p
          className="login__account signin"
          onClick={() => history.push('/signIn')}
        >
          Sign in
        </p>
        <button className="login__button button-reg" type="submit">
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Register