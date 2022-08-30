import SideBar from "./SideBar"

import mobileLogo from '../assets/logo-mobile.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg';

const Layout = () => {
  return (
    <>
      <nav>
        <div className="mobileLogo">
          <img src={mobileLogo} alt="" />
        </div>
        <div className="boardTitle">
          <h1>Platform Launch</h1>
        </div>
        <div className="actionHeader">
          <button>
            <span>
              <img src={iconAddTask} alt="" />
              <p id="addNew">Add new task</p>
            </span>
          </button>
          <img src={verticalEllipsis} alt="" />
        </div>
      </nav>
      <div className="sideBarPos">
        <SideBar />
      </div>
      <main>
        <p>this is themain page</p>
      </main>
    </>
  )
}
export default Layout