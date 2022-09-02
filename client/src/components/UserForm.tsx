import Inputs from "./Inputs"
import { GoogleLogin } from 'react-google-login'
import logo from '../assets/logo-mobile.svg'
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent } from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { login, register } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const UserForm:React.FC<{name:string,signUp?:boolean}> = ({name, signUp}) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(prevState => (
      {
      ...prevState,
      [e.target.name]: e.target.value
    }
    ))
  }

  const dispatch = useDispatch<any>()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (signUp) {
      dispatch(register(userData))
    } else {
      dispatch(login(userData))
    }
    navigate('/')
  }

  
  return (
    <div className="userForm">
      <div className="userForm__content">
        <div className="userForm__logo">
          <img src={logo} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>{name}</h1>
          {signUp && <Inputs type="text" name="name" onChange={handleChange}/>}
          <Inputs name="email" type="email" onChange={handleChange}/>
          <Inputs name="password" type="password" onChange={handleChange}/>
          <button type="submit" className="btn secondary-btn">{signUp ? 'Sign Up' : 'Login to your account'}</button>
          {!signUp && (
            <GoogleLogin 
              buttonText="Sign in with your google account"
              clientId=""
              cookiePolicy="single_host_origin"
            />
          )}
          {signUp ? (
            <p><strong><Link to='/login'>Sign In</Link></strong> to your account</p>
          ) : (
            <p>Don't have an account? <strong><Link to='/signup'>Sign Up</Link></strong></p>
          )}
        </form>
      </div>
    </div>
  )
}
export default UserForm