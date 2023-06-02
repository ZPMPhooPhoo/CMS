import { UserCreateContent } from "./userCreateContent";
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
const UserCreate = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Client Lists' /> </div>
          <div className='board-div'><UserCreateContent /></div>
        </div>

      </div>
    </>
  )
}

export default UserCreate;