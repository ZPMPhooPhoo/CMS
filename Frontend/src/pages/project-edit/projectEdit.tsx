import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
import { ProjectEditContent } from './projectEditContent';

// type BurgerPropsType = {
//   onClick :() => void;
// }
const ProjectEdit = () => {

  //hello

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
          <div> <Header clickHandler={handleBurgerClick}  text='Project Edit'/> </div>
          <div className='board-div top'><ProjectEditContent /></div>
        </div>
        
     </div>
    </>
  )
}

export default ProjectEdit;