import React from "react"
import { useAppDispatch } from '../app/hooks';
import {changeTask} from '../features/currentBoardReducer'
import {openModal} from '../features/modal/modalSlice'

interface ITaskProps {
  title: string
  subtasks: any[]
  task: any
}


const Task: React.FC<ITaskProps> = ({ title, subtasks, task }) => {
  const dispatch = useAppDispatch()

  const handleOpenTask = () => {
    dispatch(openModal("TaskDetails"))
    dispatch(changeTask(task))
  }

  const completedSubtask = task.subtasks.filter((sub:any) => sub.isCompleted).length
  const totalSubtask = task.subtasks.length
  return (
    <div className="task" onClick={handleOpenTask}>
      <h3>{title}</h3>
      <p>
        <>
        {completedSubtask} of {totalSubtask} subtasks
        </>
      </p>
    </div>
  )
}
export default Task