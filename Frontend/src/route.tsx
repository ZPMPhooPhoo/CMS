import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Clientlist from "./pages/client-list/clientlist";
import Project from "./pages/projects/projects";
import Projectdetail from "./pages/project-detail/projectdetail";
import Clientprojectlist from "./pages/client-project-list/clientprojectlist";
import { Error } from "./pages/notfound";
// import Service from "./pages/service/service";
import ClientCreate from "./pages/client_create/clientCreate";
import { LoginPage } from "./pages/auth/loginn";
import { SignupPage } from "./pages/auth/registerr";


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
       <Clientlist />
    )
  },
  {
    path: '/client-project-lists',
    element: (
       <Clientprojectlist />
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
        <Projectdetail />
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
      <LoginPage email="" password="" />
    )
  },
  {
    path: '/register',
    element: (
      <SignupPage />
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