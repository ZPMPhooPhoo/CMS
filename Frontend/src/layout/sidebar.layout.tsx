import { Link } from 'react-router-dom';
import logo from '../img/sidebar/logo.png';
import { useMemo } from 'react';

const sidebar_routes = [
    {
        path: "/",
        backend_path: "dashboard",
        name: "Dashboard",
        icon: <i className="fa-sharp fa-solid fa-house"></i>
    },
    {
        path: "/client-lists",
        backend_path: "client-list",
        name: "Client Lists",
        icon: <i className="fa-solid fa-handshake-simple"></i>,
    },
    {
        path: "/projects",
        backend_path: "projects",
        name: "Projects",
        icon: <i className="fa-solid fa-circle-info"></i>
    },
    {
        path: "/services",
        backend_path: "services",
        name: "Services",
        icon: <i className="fa-solid fa-sliders"></i>
    },
    {
        path: "/project-detail",
        backend_path: "project-detail",
        name: "​Authorization",
        icon: <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
    },
    {
        path: "/users",
        backend_path: "users",
        name: "User List",
        icon: <i className="fa-sharp fa-solid fa-user"></i>
    },
]

// const backend_routes = ['dashboard', "users", "services"];

export const Sidebar = () => {
    // const avialable_routes = useMemo(() => sidebar_routes.filter(route => backend_routes.includes(route.backend_path)), []);
    const avialable_routes = useMemo(() => sidebar_routes, []);

    return (
        <>

            <div className="sidebar-container">
                <h1> <img src={logo} alt="ACE PLUS LOGO" className='sidebar-logo' /> </h1>
                <ul>

                    {
                        avialable_routes.map(route => (
                            <li key={route.path}>  <Link to={route.path}>{route.icon} {route.name} </Link> </li>
                        ))
                    }

                </ul>
                <div className='system-name'>
                    <h2>CLIENT MANAGEMENT SYSTEM</h2>
                </div>
            </div>

        </>
    )
}