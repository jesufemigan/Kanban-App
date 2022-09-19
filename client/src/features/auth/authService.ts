import axios from 'axios'

const API_URL = '/api/user/'

export interface IUserData {
  name?: string
  email: string
  password: string
}

const registerUser = async (userData: IUserData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const loginUser = async (userData: IUserData) => {
  const response = await axios.post(API_URL + '/signin', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  registerUser,
  loginUser,
  logout
}

export default authService