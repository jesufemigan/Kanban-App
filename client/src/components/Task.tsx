import React from "react"
import { useAppDispatch } from '../app/hooks';
import {changeTask} from '../features/currentBoardReducer'
import {openModal} from '../features/modal/modalSlice'

interface ITaskProps {
  title: string
  completedTask: Number
  allTasks: Number
  task: any
}


const Task: React.FC<ITaskProps> = ({ title, completedTask, allTasks, task }) => {
  const dispatch = useAppDispatch()

  const handleOpenTask = () => {
    dispatch(openModal("TaskDetails"))
    dispatch(changeTask(task))
  }
  return (
    <div className="task" onClick={handleOpenTask}>
      <h3>{title}</h3>
      <p>
        <>
        {completedTask} of {allTasks} subtasks
        </>
      </p>
    </div>
  )
}
export default Task