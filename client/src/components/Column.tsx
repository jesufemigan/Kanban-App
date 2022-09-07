import Task from "./Task"

interface IColumn {
  title: string
  tasks: ITask[]
}

interface ISubtask {
  _id: string
  title: string
  isCompleted: boolean
}

interface ITask {
  _id?: string
  title: string
  description: string[]
  status: string
  subtasks: ISubtask[]
}
const Column: React.FC<IColumn> = ({ title, tasks }) => {
  return (
    <div className="column">
      <span>
        <div className="column__color" style={{ backgroundColor: 'red' }}></div>
        <p className="column__title">{`${title}${`(${tasks.length})`}`}</p>
      </span>
      <div className={`${tasks.length === 0 ? 'empty' : ''} column__tasks`}>
        {tasks.map(task => (
          <Task title={task.title} completedTask={0} allTasks={tasks.length} key={task._id} task={task}/>
        ))}
      </div>

    </div>
  )
}
export default Column