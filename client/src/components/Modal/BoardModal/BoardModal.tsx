import Modal from "../Modal"
import Inputs from "../../Inputs";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createNewBoard, editBoard } from "../../../features/board/boardSlice";


const BoardModal: React.FC<{title: string, buttonName: string, edit?: boolean}> = ({ title, buttonName, edit }) => {
  const { boardId } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)
  const currentBoard = boards.find(board => board._id === boardId)
  
  const [columns, setColumns] = useState([{
    _id: nanoid(),
    title: ''
  }])

  const [editColumns, setEditColumns] = useState<any>(currentBoard!.columns)
  const [boardName, setBoardName] = useState(edit ? currentBoard?.title : '')

  const handleRemove = (id: any) => {
    if (edit) {
      setEditColumns((prev:any[]) => prev.filter(prev => prev._id !== id))
    }
    setColumns(prev => prev.filter(prev => prev._id !== id))
  }

  const dispatch = useAppDispatch()

  const getColumns = edit ? editColumns.map((a:any) => {
    return {title: a.title}
  }) : columns.map(a => {
    return {title: a.title}
  })

  const showAllColumns = () => {
    const boardDetails = {
      title: boardName,
      columns: getColumns
    }
    if (edit) {
      dispatch(editBoard(boardDetails))
    } else {
      dispatch(createNewBoard(boardDetails))
    }
  }

  const handleNameChange = (e:any) => {
    setBoardName(e.target.value)
  }

  const handleOnChange = (e:any, id:any) => {
    
    const newName = e.target.value
    if (edit) {
      // eslint-disable-next-line array-callback-return
      setEditColumns((prev:any[]) => prev.map((p:any) => {
        if (p._id === id) {
          return {
            ...p,
            title: newName
          }
        }
        return p
      }))
    }
    setColumns(prev => prev.map(p => {
      if (p._id === id) {
        return {
          ...p,
          title: newName
        }
      }
      return p
    }))
    
  }

  const handleNewColumns = () => {
    if (edit) {
      setEditColumns((prev:any[]) => [...prev, {_id: nanoid(), title: ''}])
    }
    setColumns(prev => [...prev, {_id: nanoid(), title: ''}])
  }

  
  return (
    <Modal>
      <h1>{title}</h1>
      <Inputs name="Name" type="text" onChange={handleNameChange} value={boardName}/>
      <Inputs name="Column" type="text" inputArray={edit ? editColumns : columns} handleRemove={handleRemove} onChange={handleOnChange}/>
      <button className="btn primary-btn" onClick={handleNewColumns}>+ Add New Column</button>
      <button className="btn secondary-btn" onClick={showAllColumns}>{buttonName}</button>
    </Modal>  
  )
}
export default BoardModal