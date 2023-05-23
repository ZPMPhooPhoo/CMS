// import { useState } from 'react'
// import { Footer, Header } from "./layout"
// import { Task } from './interface'
// import { Btn, Txt } from './components'

// import ClientList from "./components/pages/client-list"
import { ProjectCreateContent } from './projectCreateContent'
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'

// type BurgerPropsType = {
//   onClick :() => void;
// }
const ProjectCreate = () => {

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
          <div> <Header clickHandler={handleBurgerClick}  text='Client Lists'/> </div>
          <div className='board-div'><ProjectCreateContent /></div>
        </div>
        
     </div>
    </>
  )
}

export default ProjectCreate;