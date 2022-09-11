import Modal from "../Modal"
import deleteButton from '../../../assets/icon-cross.svg';
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createNewBoard, editBoard } from "../../../features/board/boardSlice";
import { closeModal } from "../../../features/modal/modalSlice";


const BoardModal: React.FC<{title: string, buttonName: string, edit?: boolean, noName?:boolean}> = ({ title, buttonName, edit, noName }) => {
  const { boardId } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)
  const currentBoard = boards.find(board => board._id === boardId)
  
  const [columns, setColumns] = useState([{
    _id: nanoid(),
    title: ''
  }])

  const [editColumns, setEditColumns] = useState<any>(currentBoard?.columns)
  const [boardName, setBoardName] = useState(edit ? currentBoard?.title : '')

  const handleRemove = (id: any) => {
    if (edit) {
      setEditColumns((prev:any[]) => prev.filter(prev => prev._id !== id))
    }
    setColumns(prev => prev.filter(prev => prev._id !== id))
  }

  const dispatch = useAppDispatch()

  const getColumns = edit ? editColumns.map((a:any) => {
    return {
      title: a.title,
      tasks: a.tasks
    }
  }) : columns.map(a => {
    return {title: a.title}
  })

  const handleBoard = (data: any) => {
    const { title, columns } = data
    const boardDetails = {
      title,
      columns
    }
    if (edit) {
      dispatch(editBoard(boardDetails))
    } else {
      dispatch(createNewBoard(boardDetails))
    }
    dispatch(closeModal())
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

  const { register, watch, control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      title: edit ? currentBoard?.title : '',
      columns: edit ? currentBoard?.columns : [{ title: '' }],
      _id: edit ? currentBoard?._id : nanoid()
    } 
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'columns' })

  const watchFieldArray = watch('columns')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index]
    }
  })

  const isDuplicateTitle = (value: string | undefined) => !boards.find(board => board.title.toLowerCase() === value?.toLowerCase())

  const hasDuplicate = (value:string, index:number, array:any) => {
    if (!array) return
    const arr = array.map((i:any) => i.title)
    if (arr.indexOf(value) !== index) {
      return false
    }
    return true
  }
  
  return (
    <Modal>
      <h1>{title}</h1>
      <div className="input">
        <label htmlFor="">Name</label>
        <span className={errors.title && 'isEmpty'}>
          <input type="text" 
            {...register('title', {
              required: true,
              validate: (value) => {if (!edit) return isDuplicateTitle(value)}
            })}
            disabled={noName}
            className={noName ? 'disable' : ''}
            />
            {errors.title?.type === 'required' && <p className="input__error">Required</p>}
            {errors.columns?.type === 'validate' && <p className="input__error">Used</p>}
        </span>
      </div>
      {/* <Inputs name="Column" type="text" inputArray={edit ? editColumns : columns} handleRemove={handleRemove} onChange={handleOnChange}/> */}
      <div className="input">
          <label htmlFor="">Columns</label>
          {controlledFields.map((obj: any, index:any) => (
            <span key={obj._id} className={errors.columns?.[index]?.title && 'isEmpty'}>
            <input
              defaultValue={obj.title} 
              {...register(`columns.${index}.title`, {
                validate: (value) => {if (!edit) return hasDuplicate(value, index, watchFieldArray)},
                required: true
              })}
            />
              {errors.columns?.[index]?.title?.type === 'validate' && <p className="input__error">Used</p>}
              {errors.columns?.[index]?.title?.type === 'required' && <p className="input__error">Required</p>}
            {controlledFields.length > 1 && (
              <img src={deleteButton} alt="" onClick={() => remove(index)}/>
              )}
          </span>
        ))}
        </div>



      <button className="btn primary-btn" onClick={() => append({ title: '' })}>+ Add New Column</button>
      <button className="btn secondary-btn" onClick={handleSubmit(handleBoard)}>{buttonName}</button>
    </Modal>  
  )
}
export default BoardModal