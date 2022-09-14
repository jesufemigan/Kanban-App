import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { updateSubTask } from "../features/board/boardSlice"

const Subtask:React.FC<{sub:any, setNewTask: React.Dispatch<any>,
 newTask:any, index:number}> = ({ sub, setNewTask, newTask, index }) => {
  const { task } = useAppSelector(state => state.ids)
  const dispatch = useAppDispatch()

  const [completeSubtask, setCompleteSubTask] = useState(sub.isCompleted)
  
  const handleSubTaskChange = (id:any, index:number) => {
    const details = {
      status: task.status,
      taskId: task._id,
      subId: id
    }
    dispatch(updateSubTask(details))

    
    setCompleteSubTask((prev:any) => !prev)
    const subtasks = newTask.subtasks.slice()
    
    subtasks[index] = { ...subtasks[index], isCompleted: !subtasks[index].isCompleted }
    setNewTask((prev:any) => ({
      ...prev,
      subtasks
    }))
  }
  
  return (
    <div key={sub._id} className="allSubtasks__each">
    <label className="checkbox">
      {sub.title}
      <input type="checkbox" checked={completeSubtask} onChange={() => handleSubTaskChange(sub._id, index)}/>
      <span className="checkmark"></span>
    </label>
  </div>
  )
}
export default Subtask