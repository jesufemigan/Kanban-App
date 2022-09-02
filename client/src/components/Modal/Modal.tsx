import React from "react"


import deleteButton from '../../assets/icon-cross.svg';

import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";

const Modal:React.FC<{children: React.ReactNode}> = ({children}) => {
  const dispatch = useDispatch()
  const handleCloseModal = () => {
    dispatch(closeModal())
  }
  
  return (
    <div className="modal__overlay" onClick={handleCloseModal}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <img src={deleteButton} alt="" id="closeModal" onClick={handleCloseModal}/>
        {children}
      </div>
    </div>
  )
}
export default Modal