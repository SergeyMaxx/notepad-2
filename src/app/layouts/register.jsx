import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {validator} from '../utils/validator'

const Register = () => {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const validatorConfig = {
    email: {
      isEmail: {message: 'Email entered incorrectly'}
    },
    name: {
      min: {
        message: 'Name must contain at least 2 characters',
        value: 2
      }
    },
    password: {
      isCapitalSymbol: {message: 'Password must contain a capital letter'},
      isContainDigit: {message: 'Password must contain a number'},
      min: {
        message: 'Password must contain at least 8 characters',
        value: 8
      }
    }
  }

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const onChange = ({target}) => {
    handleChange({name: target.name, value: target.value})
  }

  // useEffect(() => {
  //   validate()
  // }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length !== 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) return
    console.log(data)
  }

  return (
    <div className="login">
      <i className="login__back-arrow" onClick={() => history.push('/')}/>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form__header register__header">Registration</h1>
          <p className='errors errors-name'>{errors.name}</p>
          <label>
            <input
              name="name"
              id="name"
              type="text"
              value={data.name}
              required
              onChange={onChange}
              placeholder="Name"
              className="login-form__input name-register"
            />
          </label>
          <p className='errors errors-email'>{errors.email}</p>
          <label>
            <input
              name="email"
              id="email"
              type="text"
              value={data.email}
              required="required"
              onChange={onChange}
              placeholder="Email Address"
              className="login-form__input email"
            />
          </label>
          <p className='errors errors-password'>{errors.password}</p>
          <label>
            <input
              name="password"
              id="password"
              type="password"
              value={data.password}
              required="required"
              onChange={onChange}
              placeholder="Password"
              className="login-form__input password password-register"
            />
          </label>
          <div className="login-form__block">
            <p className="login-form__block_account already">
              Already have account?
            </p>
            <p
              className="login-form__block_account signup"
              onClick={() => history.push('/signIn')}
            >
              Sign in
            </p>
          </div>
          <button className="login-form__button button-reg" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register