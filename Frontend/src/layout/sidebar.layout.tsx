import { Link } from 'react-router-dom';
import logo from '../img/sidebar/logo.png';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

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
    const [role, setRoles] = useState<string[]>([]);
    const role_id = localStorage.getItem("role_id");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/roles/${role_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setRoles(response.data.data.rolePermissions);


            } catch (error: any) {

            }

        }
        fetchData();

    }, []);

    //const backend_routes = role.map((item: any) => item.backend_path);
    //console.log({ sidebar_routes, backend_routes, role });
    const avialable_routes: any[] = useMemo(() => sidebar_routes.filter(route => role.includes(route.backend_path)), [role]);
    console.log({ sidebar_routes, role });


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