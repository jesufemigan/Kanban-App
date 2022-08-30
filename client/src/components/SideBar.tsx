import desktopLogoLight from '../assets/logo-light.svg'
import desktopLogoDark from '../assets/logo-dark.svg';
import iconBoard from '../assets/icon-board.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import iconDarkTheme from '../assets/icon-dark-theme.svg'
import iconLightTheme from '../assets/icon-light-theme.svg';
import iconHide from '../assets/icon-hide-sidebar.svg';

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className='desktopLogo'>
        <img src={desktopLogoLight} alt="" />
      </div>
      <div className="allBoards">
        <p>All Boards (2)</p>
        <div className="eachBoard">
          <span className='active'>
          <img src={iconBoard} alt="" />
          <p>Platform Launch</p>
          </span>
          <span>
          <img src={iconBoard} alt="" />
          <p>Marketing Plan</p>
          </span>
          <span>
          <img src={iconBoard} alt="" />
          <p>Roadmap</p>
          </span>
        </div>
        <div className="newBoard">
          <img src={iconBoard} alt="" />
          <span>
            <img src={iconAddTask} alt="" />
            <p>Create New Board</p>
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