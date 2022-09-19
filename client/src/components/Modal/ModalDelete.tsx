import Modal from "./Modal"
import { deleteBoard, deleteTask } from "../../features/board/boardSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeModal } from "../../features/modal/modalSlice"

const ModalDelete:React.FC<{isTask?: boolean}> = ({ isTask }) => {
  const modalName = isTask ? 'task' : 'board'
  const dispatch = useAppDispatch()
  const { task, boardId } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)
  const { status, _id } = task
  const details = {
    task_id: _id,
    status
  }

  const currentBoard = boards.find(board => board._id === boardId)
  return (
    <Modal>
      <div className="deleteModal">
        <h3>Delete this {modalName}?</h3>
        <p>Are you sure you want to delete the '{isTask ? task?.title : currentBoard?.title}'? This action will remove all columns and tasks and cannot be reversed </p>

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