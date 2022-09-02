import { ChangeEvent, ChangeEventHandler, Key } from 'react';
import deleteButton from '../assets/icon-cross.svg';


interface InputProps {
  type: string
  name: string
  inputArray?: any
  // onChange?: ChangeEventHandler<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleChange?: ChangeEventHandler<HTMLInputElement>
}

const Inputs:React.FC<InputProps> = ({ type, name, inputArray, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e)
  }
  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      {inputArray ? (
        inputArray.map((obj: string | number | readonly string[] | undefined, index: Key | null | undefined) => (
          <span>
            <input type={type} key={index} name={name}/>
            {inputArray.length > 1 && (
              <img src={deleteButton} alt="" />
            )}
          </span>
        ))
      ) : (
        <input type={type} onChange={(e) => handleChange(e)} name={name}/>
      )}
    </div>
  )
}
export default Inputs