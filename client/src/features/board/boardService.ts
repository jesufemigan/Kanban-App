import axios from 'axios'

const API_URL = '/api/boards'

const getAllBoards = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const boardService = {
  getAllBoards
}

export default boardService