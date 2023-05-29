import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

import CategoryList from "./pages/category_list/categoryList";
import CategoryCreate from "./pages/category_create/categoryCreate";
import CategoryDelete from "./pages/category_edit/category_delete";
import CategoryEdit from "./pages/category_edit/categoryEdit";
import PermissionList from "./pages/permission_list/permissionList";
import RoleList from "./pages/role_list/roleList";
import RoleEdit from "./pages/role_edit/roleEdit";


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

// const backend_routes = ['dashboard', 'users', 'services']

// const routes = [
//   {
//     path: '/',
//     backend_path: "dashboard",
//     element: (
//       <Dashboard />
//     )
//   },
//   {
//     path: '/client-lists',
//     backend_path: "clients-lists",
//     element: (
//       <ClientList />
//     )
//   },
//   {
//     path: '/client-project-lists',
//     backend_path: 'client-project-lists',
//     element: (
//       <ClientProjectList />
//     )
//   },
//   {
//     path: '/client-projects',
//     backend_path: 'client-projects',
//     element: (
//       <Project />
//     )
//   },
//   {
//     path: '/project-detail',
//     backend_path: 'project-detail',
//     element: (
//       <ProjectDetail />
//     )
//   },
//   {
//     path: '/add-client-project',
//     backend_path: 'add-client-project',
//     element: (
//       <ProjectCreate />
//     )
//   },
//   {
//     path: '/projects',
//     backend_path: 'projects',
//     element: (
//       <Project />
//     )
//   },
//   {
//     path: '/users',
//     backend_path: 'users',
//     element: (
//       <UserList />
//     )
//   },
//   {
//     path: '/services',
//     backend_path: 'services',
//     element: (
//       // <Service/>
//       <h1>Service</h1>
//     )
//   },
//   {
//     path: '/client-create',
//     backend_path: 'client-create',
//     element: (
//       <ClientCreate />
//     )
//   },
//   {
//     path: '/client_edit/:customerId',
//     backend_path: 'client_edit',
//     element: <ClientEdit />
//   },
//   {
//     path: "/client_delete/:customerId",
//     backend_path: "client_delete",
//     element: <ClientDelete />
//   },
//   {
//     path: '/login',
//     backend_path: 'login',
//     element: (
//       <Login email="" password="" />
//     )
//   },
//   {
//     path: '/logout',
//     backend_path: 'logout',
//     element: (
//       <Logout />
//     )
//   },
//   {
//     path: '/user_create',
//     backend_path: 'user_create',
//     element: (
//       <RegisterForm />
//     )
//   },
//   {
//     path: '/user_edit/:userId',
//     backend_path: 'user_edit',
//     element: (
//       <UserEditFrom />
//     )
//   },
//   {
//     path: '/user_delete/:userId',
//     backend_path: 'user_delete',
//     element: (
//       <UserDelete />
//     )
//   },
//   {
//     path: '/quotation',
//     backend_path: 'quotation',
//     element: (
//       <QuotationForm />
//     )
//   },

// ];

const routes = [
  {
    path: '/',
    element: (
      <Dashboard />
    )
  },
  {
    path: '/client-lists',
    element: (
      <ClientList />
    )
  },
  {
    path: '/client-project-lists',
    element: (
      <ClientProjectList />
    )
  },
  {
    path: '/client-projects',
    element: (
      <Project />
    )
  },
  {
    path: '/project-detail',
    element: (
      <ProjectDetail />
    )
  },
  {
    path: '/add-client-project',
    element: (
      <ProjectCreate />
    )
  },
  {
    path: '/projects',
    element: (
      <Project />
    )
  },
  {
    path: '/users',
    element: (
      <UserList />
    )
  },
  {
    path: '/services',
    element: (

      // <Service/>
      <h1>Service</h1>
    )
  },
  {
    path: '/client-create',
    element: (
      <ClientCreate />
    )
  },
  {
    path: '/client_edit/:customerId',
    element: <ClientEdit />
  },
  {
    path: "/client_delete/:customerId",
    element: <ClientDelete />
  },
  {
    path: '/login',
    element: (
      <Login email="" password="" />
    )
  },
  {
    path: '/logout',
    element: (
      <Logout />
    )
  },
  {
    path: '/user_create',
    element: (
      <RegisterForm />
    )
  },
  {
    path: '/user_edit/:userId',
    element: (
      <UserEditFrom />
    )
  },
  {
    path: '/user_delete/:userId',
    element: (
      <UserDelete />
    )
  },
  {
    path: '/quotation',
    element: (
      <QuotationForm />
    )
  },
  {
    path: '/category-list',
    element: (
      <CategoryList />
    )
  },
  {
    path: '/category-create',
    element: (
      <CategoryCreate />
    )
  },
  {
    path: '/category-edit/:categoryId',
    element: (
      <CategoryEdit />
    )
  },
  {
    path: '/category-delete/:categoryId',
    element: (
      <CategoryDelete />
    )
  },
  {
    path: '/permission-list',
    element: (
      <PermissionList />
    )
  },
  {
    path: '/role-list',
    element: (
      <RoleList />
    )
  },
  {
    path: '/role-edit/:roleId',
    element: (
      <RoleEdit />
    )
  },
  {
    path: '*',
    element: (
      <Error />
    )
  }

];

const notFoundRoute = {
  path: '*',
  element: (
    <Error />
  )
}

export const Router = () => {

  /*
   1. fetch avialable route for logged in user from the backend.
  
  */
  // const [roles, setRoles] = useState<any[]>([notFoundRoute]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   async function fetchRoles() {
  //     try {
  //       // const response = await fetch("/roles");
  //       // const roles = await response.json()
  //       const avialable_routes = routes.filter(route => backend_routes.includes(route.backend_path)).map(route => ({ element: route.element, path: route.path }))
  //       console.log(avialable_routes)
  //       setRoles(prev => [...avialable_routes, ...prev,]);
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchRoles();
  // }, [])
  // if (isLoading) {
  //   return <p>Loading..........</p>;
  // }
  // console.log({ roles })
  console.log(routes)
  const routeList = createBrowserRouter(routes);
  return (
    <RouterProvider router={routeList} />
  )
}