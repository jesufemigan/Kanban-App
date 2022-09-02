import AddTask from "./TaskModal/AddTask"
import EditTask from "./TaskModal/EditTask"
import NewBoard from "./BoardModal/NewBoard"
import EditBoard from "./BoardModal/EditBoard"
import DeleteBoard from "./BoardModal/DeleteBoard"
import DeleteTask from "./TaskModal/DeleteTask"
import TaskDetails from "./TaskModal/TaskDetails"

import { useSelector } from 'react-redux'

const Index = () => {
  const { modalType } = useSelector((state:any) => state.modal)
  
  return (
    <>
      {modalType === 'AddTask' && <AddTask />}
      {modalType === 'EditTask' && <EditTask />}
      {modalType === 'NewBoard' && <NewBoard />}
      {modalType === 'EditBoard' && <EditBoard />}
      {modalType === 'DeleteBoard' && <DeleteBoard />}
      {modalType === 'DeleteTask' && <DeleteTask />}
      {/* {modalType === 'TaskDetails' && <TaskDetails />} */}
      
    </>
  )
}
export default Index