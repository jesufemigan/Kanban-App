import Modal from "../Modal"
import Inputs from "../../Inputs";

const TaskModal:React.FC<{title:string, buttonName: string}> = ({ title, buttonName }) => {
  return (
    <Modal>
      <h1>{title}</h1>
      <Inputs name="Title" type="text"/>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>
      <Inputs name="Subtasks" type="text"/>

      <button className="btn primary-btn">+ Add New Subtask</button>

      <div className="select">
        <label htmlFor="Status">Status</label>
        <select name="Status" id="Status">
          <option value="">One</option>
          <option value="">Two</option>
        </select>
      </div>

      <button className="btn secondary-btn">{buttonName}</button>
    </Modal>
  )
}
export default TaskModal