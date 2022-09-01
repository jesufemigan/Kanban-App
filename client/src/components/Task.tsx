import React from "react"

interface ITaskProps {
  title: string
  completedTask: Number
  allTasks: Number
}


const Task: React.FC<ITaskProps> = ({ title, completedTask, allTasks }) => {
  return (
    <div className="task">
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