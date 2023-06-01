import { Route, RouterProvider, Routes, createBrowserRouter, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Project from "./pages/projects/project";
import { Error } from "./pages/notfound";
import ClientCreate from "./pages/client_create/clientCreate";
import { Login } from "./pages/auth/login";
import UserEditFrom from "./pages/user_edit/userEdit";
import UserDelete from "./pages/user_edit/userDelete";
import ProjectDetail from "./pages/project_detail/projectDetail";
import ClientProjectList from "./pages/client_project_list/clientProjectList";
import ClientList from "./pages/client_list/clientList";
import ProjectCreate from "./pages/project_create/projectCreate";
import UserList from "./pages/user_list/userList";
import ClientEdit from "./pages/client_edit/clientEdit";
import ClientDelete from "./pages/client_edit/client_delete";
import Quotation from "./pages/quotation_list/quotationList";
import { Logout } from "./pages/auth/logout";
import { useEffect, useState } from "react";
import axios from "axios";
import Category from "./pages/category_list/categoryList";
import ContractCreate from "./pages/contract/contractCreate";
import CategoryCreate from "./pages/category_create/categoryCreate";
import CategoryEdit from "./pages/category_edit/categoryEdit";
import CategoryDelete from "./pages/category_edit/category_delete";
import ProjectEdit from "./pages/project-edit/projectEdit";
import UserCreate from "./pages/user_create/userCreate";

const role_id = localStorage.getItem("role_id");
const token = localStorage.getItem("token");

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
    path: '/project-edit',
    backend_path: 'project-edit',
    element: (
      <ProjectEdit />
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
    path: '/category-create',
    backend_path: 'category-create',
    element: (
      <CategoryCreate />
    )
  },
  {
    path: '/category-edit/:categoryId',
    backend_path: 'category-edit',
    element: (
      <CategoryEdit />
    )
  },
  {
    path: '/category-delete/:categoryId',
    backend_path: 'category-delete',
    element: (
      <CategoryDelete />
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
      <UserCreate />
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
    path: '/quotation-create',
    backend_path: 'quotation-create',
    element: (
      <Quotation />
    )
  },
  {
    path: '/contract-create',
    backend_path: 'contract-create',
    element: (
      <ContractCreate />
    )
  },
  {
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