import Modal from "../Modal"
import ellipsis from '../../../assets/icon-vertical-ellipsis.svg'
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { openModal } from "../../../features/modal/modalSlice"
import { useEffect, useRef, useState } from 'react'
import { updateSubTask } from "../../../features/board/boardSlice"

const TaskDetails:React.FC<{task:any}> = ({ task }) => {
  const { boardId } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)

  const completedSubTask = task.subtasks.filter((sub:any) => sub.isCompleted).length
  const totalSubTask = task.subtasks.length

  const [dropDown, setDropDown] = useState(false)

  const dispatch = useAppDispatch()

  const currentBoard = boards.find(board => board._id === boardId)

  const handleSubTaskChange = (id:any) => {
    const details = {
      status: task.status,
      taskId: task._id,
      subId: id
    }

    dispatch(updateSubTask(details))
  }

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
          <h2>{task.title}</h2>
          <div className="taskDetails__action--container">
            <img src={ellipsis} alt="" onClick={() => setDropDown(prev => !prev)}/>
            <div className={`taskDetails__action--content ${!dropDown ? `cancel` : ''}`} ref={taskRef}>
              <p onClick={() => dispatch(openModal("EditTask"))}>Edit Task</p>
              <p onClick={() => dispatch(openModal("DeleteTask"))}>Delete Task</p>
            </div>
          </div>
        </div>
        <p className="taskDetails__description">{task.description === "" ? 'No description' : task.description}</p>
        <p className="taskDetails__subtasks">Subtasks ({completedSubTask} of {totalSubTask})</p>
        <div className="allSubtasks">
          {task.subtasks.length  === 0 ? (
            <p>No subtasks</p>
          ) : (
            task.subtasks.map((sub:any) => (
              <div key={sub._id} className="allSubtasks__each">
                <label className="checkbox">
                  {sub.title}
                  <input type="checkbox" checked={sub.isCompleted} onChange={() => handleSubTaskChange(sub._id)}/>
                  <span className="checkmark"></span>
                </label>
              </div>
            ))
          )}
        </div>
        <div className="dropDown">
          <label htmlFor="">Current Status</label>
          <select name="columns" id="" value={task.status}>
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