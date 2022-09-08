import Modal from "./Modal"
import { deleteBoard, deleteTask } from "../../features/board/boardSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeModal } from "../../features/modal/modalSlice"

const ModalDelete:React.FC<{isTask?: boolean, title:string}> = ({ isTask, title }) => {
  const modalName = isTask ? 'task' : 'board'
  const dispatch = useAppDispatch()
  const { task } = useAppSelector(state => state.ids)
  const { status, _id } = task
  const details = {
    task_id: _id,
    status
  }
  console.log(details)
  return (
    <Modal>
      <div className="deleteModal">
        <h3>Delete this {modalName}?</h3>
        <p>Are you sure you want to delete the '{title}' {modalName}? This action will remove all columns and tasks and cannot be reversed </p>

        <div>
          <button className="btn danger-btn" onClick={() => {
            if (isTask) {
              dispatch(deleteTask(details))
            }
            else {
              dispatch(deleteBoard())
            }
            dispatch(closeModal())
          }}>Delete</button>
          <button className="btn primary-btn" onClick={() => dispatch(closeModal())}>Cancel</button>
        </div>

      </div>
    </Modal>
  )
}
export default ModalDelete