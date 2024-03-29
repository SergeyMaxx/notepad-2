import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {validator} from '../utils/validator'
import {useAuth} from '../hooks/useAuth'
import EmailField from '../components/form/emailField'
import PasswordField from '../components/form/passwordField'
import {useSelector} from 'react-redux'
import {getDarkMode} from '../Store/notes'
import arrow from '../../assets/Back-arrow.svg'
import whiteArrow from '../../assets/white-arrow.svg'

const Register = () => {
  const darkMode = useSelector(getDarkMode())
  const history = useHistory()
  const {signUp} = useAuth()
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = ({target}) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
    setErrors({})
  }

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

  // useEffect(() => {
  //   validate()
  // }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length !== 0
  }

  const isValid = Object.keys(errors).length !== 0

  const handleSubmit = async e => {
    e.preventDefault()
    if (validate()) return
    try {
      await signUp(data)
      history.push('/notes')

    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <div className="login">
      <img
        className="login__back-arrow"
        src={darkMode === 'dark' ? whiteArrow : arrow}
        onClick={() => history.push('/')}
        alt="arrow"
      />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form__header register__header">Registration</h1>
          <input
            name="name"
            type="text"
            value={data.name}
            required
            onChange={handleChange}
            placeholder="Name"
            className="login-form__input name-register"
          />
          <p className="errors errors-email">{errors.email}</p>
          <EmailField data={data} handleChange={handleChange} _class="email"/>
          <p className="errors errors-password">{errors.password}</p>
          <PasswordField
            data={data}
            handleChange={handleChange}
            _class="password-register"
          />
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
          <button
            className={isValid ? 'login-form__button-disabled button-reg' : 'login-form__button button-reg'}
            type="submit"
            disabled={isValid}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register