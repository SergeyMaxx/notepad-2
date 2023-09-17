import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
import EmailField from '../components/form/emailField'
import PasswordField from '../components/form/passwordField'
import {useSelector} from 'react-redux'
import {getDarkMode} from '../Store/notes'
import arrow from '../../assets/Back-arrow.svg'
import whiteArrow from '../../assets/white-arrow.svg'

const Login = () => {
  const [enterError, setEnterError] = useState(null)
  const [errors, setErrors] = useState(false)
  const darkMode = useSelector(getDarkMode())
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
      <img
        className="login__back-arrow"
        src={darkMode === 'dark' ? whiteArrow : arrow}
        onClick={() => history.push('/')}
        alt="arrow"
      />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form__header">Login</h1>
          {enterError && <p className="errors errors-login">{enterError}</p>}
          <EmailField data={data} handleChange={handleChange}/>
          <PasswordField data={data} handleChange={handleChange}/>
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