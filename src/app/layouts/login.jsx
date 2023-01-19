import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = ({target}) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <div className="login">
      <i className="login__back-arrow" onClick={() => history.push('/')}/>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form__header">Login</h1>
          <label>
            <input
              name="email"
              type="text"
              value={data.email}
              required
              onChange={handleChange}
              placeholder="Email Address"
              className="login-form__input"
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              value={data.password}
              required
              onChange={handleChange}
              placeholder="Password"
              className="login-form__input password"
            />
          </label>
          <div className="login-form__block">
            <p className="login-form__block_account">
              Don't have account?
            </p>
            <p
              className="login-form__block_account signup"
              onClick={() => history.push('/signUp')}
            >
              Sign up
            </p>
          </div>
          <button className="login-form__button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login