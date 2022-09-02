import Modal from "../Modal"
import Inputs from "../../Inputs";


const BoardModal: React.FC<{title: string, buttonName: string}> = ({ title, buttonName }) => {
  return (
    <Modal>
      <h1>{title}</h1>
      <Inputs name="Name" type="text"/>
      <Inputs name="Column" type="text" />
      <button className="btn primary-btn">+ Add New Column</button>
      <button className="btn secondary-btn">{buttonName}</button>
    </Modal>  
  )
}
export default BoardModal