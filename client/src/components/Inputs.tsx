import { ChangeEvent, ChangeEventHandler, Key, useEffect, useState } from 'react';
import deleteButton from '../assets/icon-cross.svg';

import { useForm } from 'react-hook-form'


interface InputProps {
  type: string
  name: string
  inputArray?: any
  value?: string
  noName?: boolean
  // onChange?: ChangeEventHandler<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>, id?: any) => void
  handleChange?: ChangeEventHandler<HTMLInputElement>
  handleRemove?: any
  isEmpty?: string
  register?: any
  
}

const Inputs:React.FC<InputProps> = ({ type, name, value, noName, inputArray, onChange, handleRemove, isEmpty, register }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id?: any) => {
    if (onChange) onChange(e, id)
  }

  // const isDuplicatedName = 

  // const { register, formState: { errors } } = useForm();
  
  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      {inputArray ? (
        inputArray.map((obj: any, index:any) => (
          <span key={obj._id}>
            <input type={type} name={name} onChange={(e) => handleChange(e, obj._id)} value={obj.title} className={isEmpty === 'yes' ? 'isEmpty' : ''}/>
            {inputArray.length > 1 && (
              <img src={deleteButton} alt="" onClick={() => handleRemove(obj._id)}/>
            )}
          </span>
        ))
      ): (
        <input type={type} onChange={(e) => handleChange(e)} name={name} value={value} disabled={noName} className={isEmpty === 'yes' ? 'isEmpty' : ''} />
      )}
    </div>
  )
}
export default Inputs