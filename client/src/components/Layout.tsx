import SideBar from "./SideBar"

import desktopLogoLight from '../assets/logo-light.svg'
import desktopLogoDark from '../assets/logo-dark.svg';
import mobileLogo from '../assets/logo-mobile.svg';
import iconAddTask from '../assets/icon-add-task-mobile.svg';
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg';
import iconAdd from '../assets/icon-add-task-mobile.svg';
import Column from "./Column";

const Layout = () => {
  const tasks: string[] = []
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
          <button>
            <span>
              <img src={iconAddTask} alt="" />
              <p id="addNew">Add new task</p>
            </span>
          </button>
          <img src={verticalEllipsis} alt="" />
        </div>
      </header>
      <main className="overflow">
        <div className="sideBarPos">
          <SideBar />
        </div>
        <div className="column__container">
          <Column title="Project To" tasks={tasks}/>
          <Column title="Project To" tasks={tasks}/>
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