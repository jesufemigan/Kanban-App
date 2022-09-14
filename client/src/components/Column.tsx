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
  description: string
  status: string
  subtasks: ISubtask[]
}
const Column: React.FC<IColumn> = ({ title, tasks }) => {
  const color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  return (
    <div className="column">
      <span>
        <div className="column__color" style={{ backgroundColor: color }}></div>
        <p className="column__title">{`${title}${`(${tasks.length})`}`}</p>
      </span>
      <div className={`${tasks.length === 0 ? 'empty' : ''} column__tasks`}>
        {tasks.map(task => (
          <Task title={task.title} key={task._id} task={task} subtasks={task.subtasks}/>
        ))}
      </div>

    </div>
  )
}
export default Column