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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivatePageWrapper from './private page wrapper/PrivatePageWrapper.jsx';

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
    element: <PrivatePageWrapper><Dashboard></Dashboard></PrivatePageWrapper>,
    children: [
      {
        path: '/dashboard',
        element: ""
      },
      {
        path: '/dashboard/profile',
        element: <PrivatePageWrapper><Profile></Profile></PrivatePageWrapper>
      },
      {
        path: '/dashboard/tasks',
        element: <PrivatePageWrapper><Tasks></Tasks></PrivatePageWrapper>
      },
    ]
  }
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </MyContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
