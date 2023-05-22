// import { useState } from 'react'
// import { Footer, Header } from "./layout"
// import { Task } from './interface'
// import { Btn, Txt } from './components'

// import ClientList from "./components/pages/client-list"

import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useContext, useEffect, useState } from 'react'
import { ProjectDetailContent } from './projectdetailContent';

// type BurgerPropsType = {
//   onClick :() => void;
// }
const ProjectDetail = () => {

  const [sidebarOpen , setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <> 
     {/* <ClientList /> */}
     <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '': 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Dashboard' /> </div>
          <div className='board-div'><ProjectDetailContent /></div>
        </div>
        
     </div>
    </>
  )
}

export default ProjectDetail;