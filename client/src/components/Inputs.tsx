import { ChangeEvent, ChangeEventHandler, Key, useEffect, useState } from 'react';
import deleteButton from '../assets/icon-cross.svg';


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
  validate?: (arg:any) => any
}

const Inputs:React.FC<InputProps> = ({ type, name, value, noName, inputArray, onChange, handleRemove, isEmpty, validate }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id?: any) => {
    if (onChange) onChange(e, id)
  }

  
  
  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      {inputArray ? (
        inputArray.map((obj: any, index:any) => (
          <span key={obj._id}>
            <input type={type} name={name} onChange={(e) => handleChange(e, obj._id)} value={obj.title} />
            {inputArray.length > 1 && (
              <img src={deleteButton} alt="" onClick={() => handleRemove(obj._id)}/>
            )}
          </span>
        ))
      ): (
        <input type={type} onChange={(e) => handleChange(e)} name={name} value={value} disabled={noName}/>
      )}
    </div>
  )
}
export default Inputs