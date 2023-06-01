import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState ,useEffect} from 'react'
import UserProfileContent from './userProfileContent'

// type BurgerPropsType = {
//   onClick :() => void;
// }
const UserProfile = () => {

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
          <div> <Header clickHandler={handleBurgerClick}  text='User Profile'/> </div>
          <div className='board-div'><UserProfileContent /></div>
        </div>
        
     </div>
    </>
  )
}

export default UserProfile;