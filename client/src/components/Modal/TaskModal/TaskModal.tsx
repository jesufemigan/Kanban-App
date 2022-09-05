import Modal from "../Modal"
import Inputs from "../../Inputs";

import { useState, useRef } from 'react'
import { nanoid } from "@reduxjs/toolkit";

import { addNewTask } from "../../../features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const TaskModal:React.FC<{title:string, buttonName: string}> = ({ title, buttonName }) => {
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [subTasks, setSubTasks] = useState([{
    id: nanoid(),
    title: ''
  }])
  const statusRef = useRef<HTMLSelectElement>(null)
  const { boards } = useAppSelector(state => state.board)
  const { id } = useAppSelector(state => state.currentBoardId)

  const currentBoard = boards.find(board => board._id === id)
  
  const handleNameChange = (e:any) => {
    setTaskName(e.target.value)
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }
  const handleRemove = (id: any) => {
    setSubTasks(prev => prev.filter(prev => prev.id !== id))
  }
  const handleOnChange = (e:any, id:any) => {
    
    const newName = e.target.value
    setSubTasks(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: newName
        }
      }
      return p
    }))
    
  }
  
  const dispatch = useAppDispatch()

  const getSubtasks = subTasks.map(a => {
    return {title: a.title}
  })

  const handleCreateNewTask = () => {
    const taskDetails = {
      title: taskName,
      description,
      subtasks: getSubtasks,
      status: statusRef.current !== null && statusRef.current.value
    }

    dispatch(addNewTask(taskDetails))
    // console.log(getSubtasks)
    
  }
  return (
    <Modal>
      <h1>{title}</h1>
      <Inputs name="Title" type="text" onChange={handleNameChange}/>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={handleDescriptionChange}/>
      </div>
      <Inputs name="Subtasks" type="text" inputArray={subTasks} handleRemove={handleRemove} onChange={handleOnChange}/>

      <button className="btn primary-btn" onClick={() => setSubTasks(prev => [...prev, {id: nanoid(), title: ''}])}>+ Add New Subtask</button>

      <div className="select">
        <label htmlFor="Status">Status</label>
        <select name="Status" id="Status" ref={statusRef}>
          {currentBoard?.columns.map(column => (
            <option value={column.title} key={column._id}>{column.title}</option>
          ))}
        </select>
      </div>

      <button className="btn secondary-btn" onClick={handleCreateNewTask}>{buttonName}</button>
    </Modal>
  )
}
export default TaskModal