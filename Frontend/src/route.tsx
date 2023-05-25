import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";

import Project from "./pages/projects/projects";

import { Error } from "./pages/notfound";
// import Service from "./pages/service/service";
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

const routeList = createBrowserRouter([
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
        <ProjectCreate/>
    )
  },
  {
    path: '/projects',
    element: (
        <Project />
    )
  },
  {
    path:'/users',
    element:(
      <UserList/>
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
    path:"/client_delete/:customerId",
     element:<ClientDelete />
  },
  {
    path: '/login',
    element: (
      <Login email="" password="" />
    )
  },
  {
    path: '/user_create',
    element: (
      <RegisterForm />
    )
  },
  {
    path:'/user_edit/:userId',
    element:(
      <UserEditFrom/>
    )
  },
  {
    path:'/user_delete/:userId',
    element:(
      <UserDelete/>
    )
  },
  {
    path: '*',
    element: (
      <Error />
    )
  }
]);

export const Router = () => {
    return(
        <RouterProvider router={routeList}/>
    )
}