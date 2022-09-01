import React from "react"

const Modal:React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="modal__overlay">
      {children}
    </div>
  )
}
export default Modal