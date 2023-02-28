import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

const Login = () => {
  const [enterError, setEnterError] = useState(null)
  const [errors, setErrors] = useState(false)
  const history = useHistory()
  const {logIn} = useAuth()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = ({target}) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
    setEnterError(null)
    setErrors(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await logIn(data)
      history.push('/notes')

    } catch (error) {
      setEnterError(error.message)
      setErrors(true)
    }
  }

  return (
    <div className="login">
      <i className="login__back-arrow" onClick={() => history.push('/')}/>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form__header">Login</h1>
          {enterError && <p className="errors errors-login">{enterError}</p>}
            <input
              name="email"
              type="email"
              value={data.email}
              required
              onChange={handleChange}
              placeholder="Email Address"
              className="login-form__input"
            />
            <input
              name="password"
              type="password"
              value={data.password}
              required
              onChange={handleChange}
              placeholder="Password"
              className="login-form__input password"
            />
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
          <button
            className={enterError ? 'login-form__button-disabled' : 'login-form__button'}
            type="submit"
            disabled={errors}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login