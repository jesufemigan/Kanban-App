import Modal from "../Modal"
import Inputs from "../../Inputs";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../../app/hooks";
import { createNewBoard } from "../../../features/board/boardSlice";


const BoardModal: React.FC<{title: string, buttonName: string}> = ({ title, buttonName }) => {
  const [columns, setColumns] = useState([{
    id: nanoid(),
    name: ''
  }])
  const [boardName, setBoardName] = useState('')

  const handleRemove = (id: any) => {
    setColumns(prev => prev.filter(prev => prev.id !== id))
  }

  const dispatch = useAppDispatch()

  const getColumns = columns.map(a => {
    return {title: a.name}
  })

  const showAllColumns = () => {
    const boardDetails = {
      title: boardName,
      columns: getColumns
    }
    
    dispatch(createNewBoard(boardDetails))
  }

  const handleNameChange = (e:any) => {
    setBoardName(e.target.value)
  }

  const handleOnChange = (e:any, id:any) => {
    
    const newName = e.target.value
    setColumns(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          name: newName
        }
      }
      return p
    }))
    
  }

  
  return (
    <Modal>
      <h1>{title}</h1>
      <Inputs name="Name" type="text" onChange={handleNameChange}/>
      <Inputs name="Column" type="text" inputArray={columns} handleRemove={handleRemove} onChange={handleOnChange}/>
      <button className="btn primary-btn" onClick={() => setColumns(prev => [...prev, {id: nanoid(), name: ''}])}>+ Add New Column</button>
      <button className="btn secondary-btn" onClick={showAllColumns}>{buttonName}</button>
    </Modal>  
  )
}
export default BoardModal