import axios from 'axios'

const API_URL = 'http://localhost:5000/api/boards/'

const getAllBoards = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const createNewBoard = async (token:string, boardDetails:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.post(API_URL, boardDetails, config)

  return response.data
}

const boardService = {
  getAllBoards,
  createNewBoard
}

export default boardService