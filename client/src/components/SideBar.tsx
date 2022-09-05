
import iconBoard from '../assets/icon-board.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import iconDarkTheme from '../assets/icon-dark-theme.svg'
import iconLightTheme from '../assets/icon-light-theme.svg';
import iconHide from '../assets/icon-hide-sidebar.svg';
import boardService from '../features/board/boardService';

import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import { useEffect } from 'react'
import { changeBoardId } from '../features/currentBoardReducer';

const SideBar = () => {
  const { boards } = useAppSelector(state => state.board)

  const dispatch = useDispatch()

  useEffect(() => {
    if (boards.length > 0) {
      dispatch(changeBoardId(boards[0]._id))
    }
  }, [dispatch, boards])
  
  return (
    <div className="sideBar">
      <div className="allBoards">
        <p>All Boards (2)</p>
        <div className="eachBoard">
          {boards.map(board => (
            <span className='active' key={board.title}>
              <img src={iconBoard} alt="" />
              <p>{board.title}</p>
            </span>
          ))}
        </div>
        <div className="newBoard">
          <img src={iconBoard} alt="" />
          <span>
            <img src={iconAddTask} alt="" />
            <p onClick={() => dispatch(openModal("NewBoard"))}>Create New Board</p>
          </span>
        </div>
      </div>
      <div className="sideBar__footer">
        <div className="themeToggler">
          <img src={iconDarkTheme} alt="" />
          <div className="themeToggler__input">
            <label className='switch'>
              <input type="checkbox" />
              <span className='slider round'></span>
            </label>
          </div>
          <img src={iconLightTheme} alt="" />
        </div>
        <div className="sideBarAction">
          <img src={iconHide} alt="" />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>
  )
}
export default SideBar