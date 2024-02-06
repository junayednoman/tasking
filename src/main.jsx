import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import SignUp from './pages/sign up/SignUp.jsx';
import MyContextProvider from './context api/MyContext.jsx';
import Login from './pages/login/Login.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './dashboard/Dashboard.jsx';
import Profile from './dashboard/profile/Profile.jsx';
import Tasks from './dashboard/tasks/Tasks.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/sign-up',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
    ]
  },
  // dashboard routes
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard',
        element: ""
      },
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      },
      {
        path: '/dashboard/tasks',
        element: <Tasks></Tasks>
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </MyContextProvider>
  </React.StrictMode>,
)
