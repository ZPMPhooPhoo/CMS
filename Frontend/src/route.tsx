import React from "react";
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
import CategoryList from "./pages/category_list/categoryList";
import CategoryCreate from "./pages/category_create/categoryCreate";
import CategoryDelete from "./pages/category_edit/category_delete";
import CategoryEdit from "./pages/category_edit/categoryEdit";
import PermissionList from "./pages/permission_list/permissionList";
import RoleList from "./pages/role_list/roleList";
import RoleEdit from "./pages/role_edit/roleEdit";

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
    path:'/quotation',
    element:(
      <QuotationForm/>
    )
  },
  {
    path:'/category-list',
    element:(
      <CategoryList/>
    )
  },
  {
    path:'/category-create',
    element:(
      <CategoryCreate/>
    )
  },
  {
    path:'/category-edit/:categoryId',
    element:(
      <CategoryEdit />
    )
  },
  {
    path:'/category-delete/:categoryId',
    element:(
      <CategoryDelete />
    )
  },
  {
    path:'/permission-list',
    element:(
      <PermissionList />
    )
  },
  {
    path:'/role-list',
    element:(
      <RoleList />
    )
  },
  {
    path:'/role-edit/:roleId',
    element:(
      <RoleEdit />
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