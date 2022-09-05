import axios from 'axios';

const API_URL = 'http://localhost:5000/api/boards/task/'

const addNewTask = async (token:string, boardId:string, taskDetails:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL+boardId, taskDetails, config)

  return response.data
}

const taskService = {
  addNewTask
}

export default taskService