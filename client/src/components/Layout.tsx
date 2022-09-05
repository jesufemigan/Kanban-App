import SideBar from "./SideBar"

import desktopLogoLight from '../assets/logo-light.svg'
import desktopLogoDark from '../assets/logo-dark.svg';
import mobileLogo from '../assets/logo-mobile.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg';
import iconAdd from '../assets/icon-add-task-mobile.svg';
import Column from "./Column";

import { useDispatch } from 'react-redux'
import { openModal } from "../features/modal/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../app/hooks";

const Layout = () => {
  const tasks: string[] = []
  const dispatch = useDispatch()

  const [isFocused, setIsFocused] = useState(false)
  const boardActionRef = useRef<any>(null)

  const { boards } = useAppSelector(state => state.board)
  const { id } = useAppSelector(state => state.currentBoardId)

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (boardActionRef.current && !boardActionRef.current.contains(e.target)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [boardActionRef])

  const showDropDown = () => {
    setIsFocused(prev => !prev)
  }

  const currentBoard = boards.find(board => board._id === id)
  return (
    <>
      <header>
        <div className="logo">
          <img src={mobileLogo} alt="" id="mobileLogo"/>
          <img src={desktopLogoLight} alt="" id="desktopLogo"/>
        </div>
        <div className="boardTitle">
          <h1>Platform Launch</h1>
        </div>
        <div className="actionHeader">
          <button onClick={() => dispatch(openModal("AddTask"))}>
            <span>
              <img src={iconAddTask} alt="" />
              <p id="addNew">Add new task</p>
            </span>
          </button>
          <div className="boardActions" >
            <img src={verticalEllipsis} alt="" onClick={() => showDropDown()}/>
            <div className={`boardActions__child ${isFocused ? 'show': ''}`} ref={boardActionRef}>
              <p 
              onClick={() => {
                dispatch(openModal("EditBoard"))
                setIsFocused(false)
                }}>Edit Board</p>
              <p>Delete Board</p>
            </div>
          </div>
        </div>
      </header>
      <main className="overflow">
        <div className="sideBarPos">
          <SideBar />
        </div>
        <div className="column__container">
          {currentBoard?.columns.map(column => (
            <Column title={column.title} tasks={column.tasks}/>
          ))}
          <div className="column__new">
            <span>
              <img src={iconAdd} alt="" />
              <h1>New Column</h1>
            </span>
          </div>
        </div>
      </main>
    </>
  )
}
export default Layout