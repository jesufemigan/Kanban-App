import Modal from "../Modal"
import Inputs from "../../Inputs";

import deleteButton from '../../../assets/icon-cross.svg';

import { useState, useRef } from 'react'
import { nanoid } from "@reduxjs/toolkit";

import { addNewTask, editTask } from "../../../features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeModal } from "../../../features/modal/modalSlice";

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { Value } from "sass";

const TaskModal:React.FC<{title:string, buttonName: string, edit?: boolean}> = ({ title, buttonName, edit }) => {
  const { boardId, task } = useAppSelector(state => state.ids)
  const { boards } = useAppSelector(state => state.board)
  const [taskName, setTaskName] = useState(edit ? task.title : '')
  const [description, setDescription] = useState(edit ? task.description : '')
  const [subTasks, setSubTasks] = useState(edit ? task.subtasks : [{
    _id: nanoid(),
    title: ''
  }])
  const statusRef = useRef<HTMLSelectElement>(null)

  const currentBoard = boards.find(board => board._id === boardId)
  
  const handleNameChange = (e:any) => {
    setTaskName(e.target.value)
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }
  const handleRemove = (id: any) => {
    setSubTasks((prev:any) => prev.filter((prev:any) => prev._id !== id))
  }
  const handleOnChange = (e:any, id:any) => {
    
    const newName = e.target.value
    setSubTasks((prev:any) => prev.map((p:any) => {
      if (p._id === id) {
        return {
          ...p,
          title: newName
        }
      }
      return p
    }))
    
  }

  
  const dispatch = useAppDispatch()

  const getSubtasks = subTasks.map((a:any) => {
    return {title: a.title}
  })

  const [isNameEmpty, setIsNameEmpty] = useState('')
  const [isSubtaskEmpty, setIssubtaskEmpty] = useState('')



  
  const handleCreateNewTask = (data:any) => {
    const { title, subtasks, description } = data
    const taskDetails = {
      title,
      description,
      subtasks,
      status: edit ? task.status : statusRef.current !== null && statusRef.current.value,
      task_id: edit && task._id
    }

    if (edit) {
      dispatch(editTask(taskDetails))
    } else {
      dispatch(addNewTask(taskDetails))
    }
    dispatch(closeModal())
  }

  const { register, watch, control, formState: { errors }, handleSubmit } = useForm<{title:string, description: string, subtasks: {title:string}[], _id: string}>({
    defaultValues: {
      title: edit ? task.title : '',
      description: edit ? task.description : '',
      subtasks: edit ? task.subtasks : [],
      _id: edit ? task._id : nanoid() 
    }})

  const { fields, append, remove } = useFieldArray({ control, name: 'subtasks' })

  const watchFieldArray = watch('subtasks')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index]
    }
  })
  const isDuplicatedName = (name = '') => {
    if (!currentBoard!.columns) return;
    return !currentBoard!.columns.find((column:any) => column.tasks.find((task:any) => task.title?.toLowerCase() === name.toLowerCase()))
  }

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
        {/* <Inputs name="Title" type="text" onChange={handleNameChange} value={taskName} isEmpty={isNameEmpty} key={isNameEmpty}/> */}
        {/* <Inputs name="Title" type="text" onChange={handleNameChange} value={taskName} isEmpty={isNameEmpty} key={isNameEmpty} register={register}/> */}
        <div className="input">
          <label htmlFor="">Title</label>
          <span className={errors.title && 'isEmpty'}>
            <input type="text" 
              {...register('title', {
                required: true,
                validate: (value) => {if (!edit) return isDuplicatedName(value)}
              })}
            />
            {errors.title?.type === 'validate' && <p className="input__error">Used</p>}
            {errors.title?.type === 'required' && <p className="input__error">Required</p>}
          </span>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea 
            {...register('description')}
          />
        </div>
        {/* <Inputs name="Subtasks" type="text" inputArray={subTasks} handleRemove={handleRemove} onChange={handleOnChange} isEmpty={isSubtaskEmpty} key={isSubtaskEmpty}/> */}
        <div className="input">
          <label htmlFor="">Subtasks</label>
          {controlledFields.map((obj: any, index:any) => (
            <span key={obj._id} className={errors.subtasks?.[index]?.title && 'isEmpty'}>
            <input
              defaultValue={obj.title} 
              {...register(`subtasks.${index}.title`, {
                validate: (value) => {if (!edit) return hasDuplicate(value, index, watchFieldArray)},
                required: true
              })}
            />
            {controlledFields.length > 0 && (
              <img src={deleteButton} alt="" onClick={() => remove(index)}/>
              )}
            {errors.subtasks?.[index]?.title?.type === 'validate' && <p className="input__error">Used</p>}
            {errors.subtasks?.[index]?.title?.type === 'required' && <p className="input__error">Required</p>}
          </span>
        ))}
        </div>

        <button className="btn primary-btn" onClick={() => append({ title: '' })}>+ Add New Subtask</button>

        <div className="select">
          <label htmlFor="Status">Status</label>
          <select name="Status" id="Status" ref={statusRef}>
            {currentBoard?.columns.map(column => (
              <option value={column.title} key={column._id}>{column.title}</option>
            ))}
          </select>
        </div>

        <button className="btn secondary-btn" onClick={handleSubmit(handleCreateNewTask)}>{buttonName}</button>
    </Modal>
  )
}
export default TaskModal