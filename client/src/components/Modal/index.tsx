import AddTask from "./TaskModal/AddTask"
import EditTask from "./TaskModal/EditTask"
import NewBoard from "./BoardModal/NewBoard"
import EditBoard from "./BoardModal/EditBoard"
import NewColumn from "./BoardModal/NewColumn"
import DeleteBoard from "./BoardModal/DeleteBoard"
import DeleteTask from "./TaskModal/DeleteTask"
import TaskDetails from "./TaskModal/TaskDetails"

import { useAppSelector } from "../../app/hooks"

const Index = () => {
  const { modalType } = useAppSelector(state => state.modal)
  const { task } = useAppSelector(state => state.ids)
  
  return (
    <>
      {modalType === 'AddTask' && <AddTask />}
      {modalType === 'EditTask' && <EditTask />}
      {modalType === 'NewBoard' && <NewBoard />}
      {modalType === 'EditBoard' && <EditBoard />}
      {modalType === 'NewColumn' && <NewColumn />}
      {modalType === 'DeleteBoard' && <DeleteBoard />}
      {modalType === 'DeleteTask' && <DeleteTask />}
      {modalType === 'TaskDetails' && <TaskDetails task={task}/>}
      
    </>
  )
}
export default Index