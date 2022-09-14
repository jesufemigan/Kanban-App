import axios from 'axios';

const API_URL = '/api/boards/task/'

const addNewTask = async (token:string, boardId:string, taskDetails:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL+boardId, taskDetails, config)

  return response.data
}

const editTask = async (token:string, boardId:string, updatedTaskDetails:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.patch(API_URL+boardId, updatedTaskDetails, config)

  return response.data
}

const updateSubTask = async (token:string, boardId:string, details:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.patch(API_URL+boardId+'/subtask', details, config)

  return response.data
}

const deleteTask = async (token:string, boardId:string, details:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.patch(API_URL+boardId+'/deleteTask',details, config)

  return response.data
}

const taskService = {
  addNewTask,
  editTask,
  updateSubTask,
  deleteTask
}

export default taskService