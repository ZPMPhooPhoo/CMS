import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";

import Project from "./pages/projects/projects";

import { Error } from "./pages/notfound";
// import Service from "./pages/service/service";
import ClientCreate from "./pages/client_create/clientCreate";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import ClientList from "./pages/client_list/clientList";

import ProjectDetail from "./pages/project_detail/projectDetail";
import ClientProjectList from "./pages/client_project_list/clientProjectList";
import QuotationForm from "./pages/quotation/quotation";

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
    path: '/projects',
    element: (
        <Project />
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
    path: '/login',
    element: (
      <Login email="" password="" />
    )
  },
  {
    path: '/register',
    element: (
      <Register />
    )
  },
  {
    path: '/quotation',
    element: (
      <QuotationForm />
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