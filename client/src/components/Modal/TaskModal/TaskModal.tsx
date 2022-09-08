import Modal from "../Modal"
import Inputs from "../../Inputs";

import { useState, useRef } from 'react'
import { nanoid } from "@reduxjs/toolkit";

import { addNewTask, editTask } from "../../../features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeModal } from "../../../features/modal/modalSlice";

const TaskModal:React.FC<{title:string, buttonName: string, edit?: boolean}> = ({ title, buttonName, edit }) => {
  const { boardId, task } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)
  const [taskName, setTaskName] = useState(edit ? task.title : '')
  const [description, setDescription] = useState(edit ? task.description : '')
  const [subTasks, setSubTasks] = useState(edit ? task.subtasks : [{
    _id: nanoid(),
    title: ''
  }])
  const statusRef = useRef<HTMLSelectElement>(null)

  const currentBoard = boards.find(board => board._id === boardId)
  
  const handleNameChange = (e:any) => {
    setTaskName(e.target.value)
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }
  const handleRemove = (id: any) => {
    setSubTasks((prev:any) => prev.filter((prev:any) => prev._id !== id))
  }
  const handleOnChange = (e:any, id:any) => {
    
    const newName = e.target.value
    setSubTasks((prev:any) => prev.map((p:any) => {
      if (p._id === id) {
        return {
          ...p,
          title: newName
        }
      }
      return p
    }))
    
  }
  
  const dispatch = useAppDispatch()

  const getSubtasks = subTasks.map((a:any) => {
    return {title: a.title}
  })

  const handleCreateNewTask = () => {
    const taskDetails = {
      title: taskName,
      description,
      subtasks: getSubtasks,
      status: edit ? task.status : statusRef.current !== null && statusRef.current.value,
      task_id: edit && task._id
    }

    if (edit) {
      dispatch(editTask(taskDetails))
    } else {

      dispatch(addNewTask(taskDetails))
    }
    dispatch(closeModal())
  }
  return (
    <Modal>
      <h1>{title}</h1>
      <Inputs name="Title" type="text" onChange={handleNameChange} value={taskName}/>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={handleDescriptionChange} value={description}/>
      </div>
      <Inputs name="Subtasks" type="text" inputArray={subTasks} handleRemove={handleRemove} onChange={handleOnChange}/>

      <button className="btn primary-btn" onClick={() => setSubTasks((prev:any) => [...prev, {_id: nanoid(), title: ''}])}>+ Add New Subtask</button>

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