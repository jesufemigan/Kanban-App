import Modal from "./Modal"

const NewBoardModal = () => {
  return (
    <Modal>
      <div>
        <h1>Add New Board</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <input type="text" />
        </div>
        <button className="primary-btn">+ Add New Button</button>
        <button className="secondary-btn">Create New Board</button>
      </div>
    </Modal>  
  )
}
export default NewBoardModal