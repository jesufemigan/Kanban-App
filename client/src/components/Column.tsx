import Task from "./Task"

interface IColumn {
  title: string
  tasks: string[]
}
const Column: React.FC<IColumn> = ({ title, tasks }) => {
  return (
    <div className="column">
      <span>
        <div className="column__color" style={{ backgroundColor: 'red' }}></div>
        <p className="column__title">{`${title}${`(${tasks.length})`}`}</p>
      </span>
      <div className={`${tasks.length === 0 ? 'empty' : ''} column__tasks`}>
        <Task title="Hello World" completedTask={0} allTasks={4}/>
        
      </div>

    </div>
  )
}
export default Column