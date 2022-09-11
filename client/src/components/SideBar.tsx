
import iconBoard from '../assets/icon-board.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import iconDarkTheme from '../assets/icon-dark-theme.svg'
import iconLightTheme from '../assets/icon-light-theme.svg';
import iconHide from '../assets/icon-hide-sidebar.svg';
import boardService from '../features/board/boardService';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import { useEffect, useState } from 'react'
import { changeBoardId } from '../features/currentBoardReducer';
import { changeTheme } from '../features/themeReducer';

const SideBar: React.FC<{hide?:any, setHide?:React.Dispatch<React.SetStateAction<boolean>>}> = ({ hide, setHide }) => {
  const { boards } = useAppSelector(state => state.board)
  const { boardId } = useAppSelector(state => state.ids)

  const dispatch = useAppDispatch()

  return (
    <div className={`sideBar ${hide ? 'hide' : ''}`}>
      <div className="allBoards">
        <p>All Boards ({boards.length})</p>
        <div className="eachBoard">
          {boards.map(board => (
            <span className={boardId === board._id ? 'active' : ''} key={board.title} onClick={() => dispatch(changeBoardId(board._id))}>
              <img src={iconBoard} alt="" />
              <p>{board.title}</p>
            </span>
          ))}
        </div>
        <div className="newBoard">
          <img src={iconBoard} alt="" />
          <span>
            <p onClick={() => dispatch(openModal("NewBoard"))}>+ Create New Board</p>
          </span>
        </div>
      </div>
      <div className="sideBar__footer">
        <div className="themeToggler">
          <img src={iconDarkTheme} alt="" />
          <div className="themeToggler__input">
            <label className='switch'>
              <input type="checkbox" onChange={() => dispatch(changeTheme())}/>
              <span className='slider round'></span>
            </label>
          </div>
          <img src={iconLightTheme} alt="" />
        </div>
        <div className="logout-btn">
          <button className='btn secondary-btn'>Logout</button>
        </div>
        <div className="sideBarAction" onClick={() => {if (setHide) setHide(prev => !prev)}}>
          <img src={iconHide} alt="" />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>
  )
}
export default SideBar