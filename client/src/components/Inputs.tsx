import { ChangeEvent, ChangeEventHandler, Key } from 'react';
import deleteButton from '../assets/icon-cross.svg';


interface InputProps {
  type: string
  name: string
  inputArray?: any
  // onChange?: ChangeEventHandler<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>, id?: any) => void
  handleChange?: ChangeEventHandler<HTMLInputElement>
  handleRemove?: any
}

const Inputs:React.FC<InputProps> = ({ type, name, inputArray, onChange, handleRemove }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id?: any) => {
    if (onChange) onChange(e, id)
  } 
  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      {inputArray ? (
        inputArray.map((obj: any, index:any) => (
          <span key={obj.id}>
            <input type={type} name={name} onChange={(e) => handleChange(e, obj.id)}/>
            {inputArray.length > 1 && (
              <img src={deleteButton} alt="" onClick={() => handleRemove(obj.id)}/>
            )}
          </span>
        ))
      ): (
        <input type={type} onChange={(e) => handleChange(e)} name={name}/>
      )}
    </div>
  )
}
export default Inputs