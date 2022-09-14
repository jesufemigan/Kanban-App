import iconDarkTheme from '../assets/icon-dark-theme.svg'
import iconLightTheme from '../assets/icon-light-theme.svg';
import iconHide from '../assets/icon-hide-sidebar.svg';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import { changeBoardId } from '../features/currentBoardReducer';
import { changeTheme } from '../features/themeReducer';
import { logout } from '../features/auth/authSlice';

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
            <span className={boardId === board._id ? 'active' : ''} key={board._id} onClick={() => dispatch(changeBoardId(board._id))}>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
              <p>{board.title}</p>
            </span>
          ))}
        </div>
        <div className="newBoard">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#635FC7"/></svg>
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
          <button className='btn secondary-btn' onClick={() => dispatch(logout())}>Logout</button>
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