import Modal from "../Modal"

const TaskDetails:React.FC<{taskTitle:string, taskDescription: string}> = ({ taskTitle, taskDescription }) => {
  return (
    <Modal>
      <div>
        <div>
          <h2>{taskTitle}</h2>
          <img src="" alt="" />
        </div>
        <p>{taskDescription}</p>
        <p>Subtasks ({1} of {3})</p>
        <div className="allSubtasks">
          <div>
            <input type="checkbox" />
            <span>
              <p>Sign up Page</p>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default TaskDetails