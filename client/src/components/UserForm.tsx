import Inputs from "./Inputs"
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import logo from '../assets/logo-mobile.svg'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useEffect } from "react"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { googleLogin, login, register, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { setProgress } from "../features/progressBarReducer"


const UserForm:React.FC<{name:string,signUp?:boolean}> = ({name, signUp}) => {
  const { user, isLoading, message, isError } = useAppSelector(state => state.auth)
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

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.name) {
      navigate('/')
    }

    if (isLoading) {
      dispatch(setProgress())
    }

    if (isError) {
      toast.error(message)
    }
    dispatch(reset())
  }, [user, navigate, dispatch, isLoading, isError, message])

  const clientId = "939999495285-dm64unilovi7uq8ti4pf9p1i1hgd8jqe.apps.googleusercontent.com"

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId })
    })
  },[])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (signUp) {
      dispatch(register(userData))
    } else {
      dispatch(login(userData))
    }
  }

  const googleSuccess = async (res:any) => {
    const user = {
      name: res.profileObj.givenName,
      email: res.profileObj.email,
      token: res.tokenId
    }
    localStorage.setItem('user', JSON.stringify(user))

    dispatch(googleLogin(user))
    dispatch(setProgress())
  }

  const googleFailure = (error:any) => {
    console.log(error)
    console.log('google sign in was unsuccessful')
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
              clientId={clientId}
              cookiePolicy="single_host_origin"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
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