import SideBar from "./SideBar"

import desktopLogoLight from '../assets/logo-light.svg'
import desktopLogoDark from '../assets/logo-dark.svg';
import mobileLogo from '../assets/logo-mobile.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg';
import iconAdd from '../assets/icon-add-task-mobile.svg';
import showSideBar from '../assets/icon-show-sidebar.svg';
import Column from "./Column";

import { openModal } from "../features/modal/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { changeBoardId } from "../features/currentBoardReducer";

const Layout = () => {
  const dispatch = useAppDispatch()

  const [isFocused, setIsFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const boardActionRef = useRef<any>(null)

  const { boards } = useAppSelector(state => state.board)
  const { boardId } = useAppSelector(state => state.ids)
  const { theme } = useAppSelector(state => state.theme)


  const [hide, setHide] = useState(false)
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

  const currentBoard = boards.find(board => board._id === boardId)
  return (
    <>
      <header>
        <div className="logo">
          <img src={mobileLogo} alt="" id="mobileLogo"/>
          <img src={theme === 'light' ? desktopLogoLight : desktopLogoDark} alt="" id="desktopLogo"/>
        </div>
        <div className="boardTitle">
          <h1>{currentBoard?.title || 'No Board Found'}</h1>
          <span onClick={() => setIsMobile(prev => !prev)} style={{ transform: isMobile ? 'rotate(180deg)': ''}}>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"></path></svg>
          </span>
          <div className={`mobileSideBar ${isMobile && 'show'}`}>
            <SideBar />
          </div>
        </div>
        {boards.length > 0 && <div className="actionHeader">
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
              <p
                onClick={() => {
                  dispatch(openModal("DeleteBoard"))
                  setIsFocused(false)
                }}
              >Delete Board</p>
            </div>
          </div>
        </div>}
      </header>
      <main className={`overflow scroll`}>
        <div className="sideBarPos">
          <SideBar hide={hide} setHide={setHide}/>
        </div>
        {boards.length > 0 ? (<div className={`column__container ${hide ? 'mainHide' : ''}`}>
          {currentBoard?.columns.map(column => (
            <Column title={column.title} tasks={column!.tasks} key={column._id}/>
          ))}
          <div className="column__new"  onClick={() => dispatch(openModal("NewColumn"))}>
            <span>
              <h1>+ New Column</h1>
            </span>
          </div>
        </div>) : (
          <div className="noBoard">
            <div className="noBoard__container">
              <p>You have no board yet. Create a new board to get started</p>
              <button onClick={() => dispatch(openModal("NewBoard"))}>+ Add New Board</button>
            </div>
          </div>
        )}
        {hide && <div className="showSideBar" onClick={() => setHide(prev => !prev)}><img src={showSideBar} alt="" /></div>}
      </main>
    </>
  )
}
export default Layout