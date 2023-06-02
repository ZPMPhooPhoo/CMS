import { ProjectCreateContent } from './projectCreateContent'
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
const ProjectCreate = () => {
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
          <div className='board-div top'><ProjectCreateContent /></div>
        </div>
      </div>
    </>
  )
}

export default ProjectCreate;