import Modal from "./Modal"

const ModalDelete:React.FC<{task?: boolean, title:string}> = ({ task, title }) => {
  const modalName = task ? 'task' : 'board'
  return (
    <Modal>
      <div className="deleteModal">
        <h3>Delete this {modalName}?</h3>
        <p>Are you sure you want to delete the '{title}' {modalName}? This action will remove all columns and tasks and cannot be reversed </p>

        <div>
          <button className="btn danger-btn">Delete</button>
          <button className="btn primary-btn">Cancel</button>
        </div>

      </div>
    </Modal>
  )
}
export default ModalDelete