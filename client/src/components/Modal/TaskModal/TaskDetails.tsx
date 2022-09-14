import Modal from "../Modal"
import ellipsis from '../../../assets/icon-vertical-ellipsis.svg'
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { openModal } from "../../../features/modal/modalSlice"
import { useEffect, useRef, useState } from 'react'
import { updateSubTask } from "../../../features/board/boardSlice"
import Subtask from "../../Subtask"
// import { getAllSubtasks } from "../../../features/currentBoardReducer"

const TaskDetails:React.FC = () => {
  
  const { boardId } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)
  const { task } = useAppSelector(state => state.ids)
  
  const [newTask, setNewTask] = useState(task)
  
  const completedSubTask = newTask.subtasks.filter((sub:any) => sub.isCompleted).length 
  const totalSubTask = newTask.subtasks.length

  const [dropDown, setDropDown] = useState(false)
  // const [completeSubTask, setCompleteSubTask] = useState(false)

  const dispatch = useAppDispatch()

  const currentBoard = boards.find(board => board._id === boardId)
  // const allSubtasks = useAppSelector(state => getAllSubtasks(state.ids))
  // const completedSubTask = allSubtasks.filter((sub:any) => sub.isCompleted)

  const taskRef = useRef<any>(null)
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (taskRef.current && !taskRef.current.contains(e.target)) {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [taskRef])

  
  return (
    <Modal>
      <div className="taskDetails">
        <div className="taskDetails__header">
          <h2>{newTask.title}</h2>
          <div className="taskDetails__action--container">
            <img src={ellipsis} alt="" onClick={() => setDropDown(prev => !prev)}/>
            <div className={`taskDetails__action--content ${!dropDown ? `cancel` : ''}`} ref={taskRef}>
              <p onClick={() => dispatch(openModal("EditTask"))}>Edit Task</p>
              <p onClick={() => dispatch(openModal("DeleteTask"))}>Delete Task</p>
            </div>
          </div>
        </div>
        <p className="taskDetails__description">{newTask.description === "" ? 'No description' : task.description}</p>
        <p className="taskDetails__subtasks">Subtasks ({completedSubTask} of {totalSubTask})</p>
        <div className="allSubtasks">
          {newTask.subtasks.length  === 0 ? (
            <p>No subtasks</p>
          ) : (
            newTask.subtasks.map((sub:any, index:number) => (
             <Subtask sub={sub} key={sub._id} setNewTask={setNewTask} newTask={newTask} index={index}/>
            ))
          )}
        </div>
        <div className="dropDown">
          <label htmlFor="">Current Status</label>
          <select name="columns" id="" value={task.status} disabled>
            {currentBoard?.columns.map(column => (
              <option value={column.title} key={column._id}>{column.title}</option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  )
}
export default TaskDetails