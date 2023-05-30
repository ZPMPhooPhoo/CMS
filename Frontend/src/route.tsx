import { Route, RouterProvider, Routes, createBrowserRouter, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Project from "./pages/projects/projects";
import { Error } from "./pages/notfound";
import ClientCreate from "./pages/client_create/clientCreate";
import { Login } from "./pages/auth/login";
import RegisterForm from "./pages/auth/register_sitebar";
import UserEditFrom from "./pages/user_list/editUser/edit_user_component";
import UserDelete from "./pages/user_list/editUser/deleteuser";
import ProjectDetail from "./pages/project_detail/projectDetail";
import ClientProjectList from "./pages/client_project_list/clientProjectList";
import ClientList from "./pages/client_list/clientList";
import ProjectCreate from "./pages/project_create/projectCreate";
import UserList from "./pages/user_list/user_list_connect";
import ClientEdit from "./pages/client_edit/client_edit_contex";
import ClientDelete from "./pages/client_edit/client_delete";
import QuotationForm from "./pages/quotation/quotation";
import { Logout } from "./pages/auth/logout";
import { useEffect, useState } from "react";
import axios from "axios";
import Category from "./pages/category_list/categoryList";
// import { useEffect, useState } from "react";
// import { redirect } from "react-router-dom";

// import CategoryList from "./pages/category_list/categoryList";
// import CategoryCreate from "./pages/category_create/categoryCreate";
// import CategoryDelete from "./pages/category_edit/category_delete";
// import CategoryEdit from "./pages/category_edit/categoryEdit";
// import PermissionList from "./pages/permission_list/permissionList";
// import RoleList from "./pages/role_list/roleList";
// import RoleEdit from "./pages/role_edit/roleEdit";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


/*
[
  {
  "route":"dashboard"
},
{
  "route":"clients-list"
}
]
*/

const backend_routes = ['dashboard', 'users', 'services']
const role_id = localStorage.getItem("role_id");
const token = localStorage.getItem("token");
// const [backend_routes, setBackendRoutes] = useState<[]>([]);

let routes = [
  {
    path: '/',
    backend_path: "dashboard",
    element: (
      <Dashboard />
    )
  },
  {
    path: '/client-lists',
    backend_path: "client-lists",
    element: (
      <ClientList />
    )
  },
  {
    path: '/client-project-lists',
    backend_path: 'client-project-lists',
    element: (
      <ClientProjectList />
    )
  },
  {
    path: '/project-detail',
    backend_path: 'project-detail',
    element: (
      <ProjectDetail />
    )
  },
  {
    path: '/add-client-project',
    backend_path: 'add-client-project',
    element: (
      <ProjectCreate />
    )
  },
  {
    path: '/projects',
    backend_path: 'projects',
    element: (
      <Project />
    )
  },
  {
    path: '/users',
    backend_path: 'users',
    element: (
      <UserList />
    )
  },
  {
    path: '/services',
    backend_path: 'services',
    element: (
      <Category />

    )
  },
  {
    path: '/client-create',
    backend_path: 'client-create',
    element: (
      <ClientCreate />
    )
  },
  {
    path: '/client-edit/:customerId',
    backend_path: 'client-edit',
    element: <ClientEdit />
  },
  {
    path: "/client-delete/:customerId",
    backend_path: "client-delete",
    element: <ClientDelete />
  },
  {
    path: '/login',
    backend_path: 'login',
    element: (
      <Login email="" password="" />
    )
  },
  {
    path: '/logout',
    backend_path: 'logout',
    element: (
      <Logout />
    )
  },
  {
    path: '/user-create',
    backend_path: 'user-create',
    element: (
      <RegisterForm />
    )
  },
  {
    path: '/user-edit/:userId',
    backend_path: 'user-edit',
    element: (
      <UserEditFrom />
    )
  },
  {
    path: '/user-delete/:userId',
    backend_path: 'user-delete',
    element: (
      <UserDelete />
    )
  },
  {
    path: '/quotation',
    backend_path: 'quotation',
    element: (
      <QuotationForm />
    )
  }, {
    path: '*',
    element: (
      <Error />
    )
  }

];



export const Routers = () => {
  const err = {
    path: '*',
    element: (
      <Error />
    )
  }

  const [roles, setRoles] = useState<any[]>([err]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/roles/${role_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const backend_routes = response.data.data.rolePermissions;

        let avialable_routes = routes.filter(route => backend_routes.includes(route.backend_path)).map(route => ({ element: route.element, path: route.path }));
        // avialable_routes = [
        //   {
        //     path: "/logout",
        //     element: <Logout />
        //   }
        // ];
        setRoles(prev => [...avialable_routes, ...prev])
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [role_id, token]);

  console.log(roles)
  console.log(routes)
  const routeList = createBrowserRouter(roles);
  if (isLoading) {
    return <p>Loading....</p>
  }
  return (
    <>
      {localStorage.getItem('token') ? (
        <RouterProvider router={routeList} />) ||
        <Router>
          <Routes>
            <Route path='/' element={(<Dashboard />)} />
          </Routes>
        </Router> : (
        <Router>
          <Routes>
            <Route path="/" element={<Login email="" password="" />} />
            <Route path="*" element={<Login email="" password="" />} />
          </Routes>
        </Router>
      )}
    </>
  )
}
