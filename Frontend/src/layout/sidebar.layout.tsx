import { Link } from 'react-router-dom';
import logo from '../img/sidebar/logo.png';

export const Sidebar = ()=> {
    return(
        <>
        
            <div className="sidebar-container">
                <h1> <img src={logo} alt="ACE PLUS LOGO" className='sidebar-logo' /> </h1>
                <ul>
                    <li>  <Link to = '/'> <i className="fa-sharp fa-solid fa-house"></i> DASHBOARD </Link> </li>
                    <li>  <Link to = '/client-lists'><i className="fa-solid fa-handshake-simple"></i> CLIENT LISTS </Link> </li>
                    <li>  <Link to = '/projects'><i className="fa-solid fa-circle-info"></i> PROJECTS </Link> </li>
                    <li>  <Link to = '/services'><i className="fa-solid fa-sliders"></i> SERVICES </Link> </li>
                    <li>  <Link to = '/project-detail'><i className="fa-sharp fa-solid fa-right-to-bracket"></i> AUTHORIZATION </Link>  </li>
                </ul>
                <div className='system-name'>
                    <h2>CLIENT MANAGEMENT SYSTEM</h2>
                </div>
            </div>
        
        </>
    )
}