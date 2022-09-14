import axios from 'axios'

const API_URL = '/api/boards/'

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

const editBoard = async (token:string,boardId:string, updatedBoardDetails:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.patch(API_URL+boardId, updatedBoardDetails, config)
  return response.data
}

const deleteBoard = async (token:string, boardId:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response  = await axios.delete(API_URL+boardId, config)

  return response.data
}

const boardService = {
  getAllBoards,
  createNewBoard,
  editBoard,
  deleteBoard
}

export default boardService