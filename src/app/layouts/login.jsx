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
      <form onSubmit={handleSubmit}>
        <h1 className="login__header">Login</h1>
        <label>
          <input
            name="email"
            type="text"
            value={data.email}
            required
            onChange={handleChange}
            placeholder="Email Address"
            className="login__input"
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