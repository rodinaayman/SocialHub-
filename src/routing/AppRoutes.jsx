import React from 'react'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout/MainLayout'
import Home from '../pages/Home/Home'
import Profile from './../pages/Profile/Profile';
import NotFound from './../pages/NotFound/NotFound';
import AuthLayout from './../Layouts/AuthLayout/AuthLayout';
import Login from './../pages/Auth/Login/Login';
import Register from './../pages/Auth/Register/Register';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedAuthRoutes from './ProtectedAuthRoutes';
import PostDetails from '../pages/PostDetails/PostDetails';
import Settings from '../pages/Settings/Settings';
 

export const router = createHashRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (<ProtectedRoutes>
                    <Home />
                </ProtectedRoutes>)
            },
            {
                path: 'profile/:id?',

                element: (<ProtectedRoutes>
                    <Profile />
                </ProtectedRoutes>
                )
            },
            {
                path: 'post-details/:postId',

                element: (<ProtectedRoutes>
                    <PostDetails />
                </ProtectedRoutes>
                )
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoutes>
                        <Settings />
                    </ProtectedRoutes>
                )
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: (<ProtectedAuthRoutes>
                    <Login />            </ProtectedAuthRoutes>
                )
            },
            {
                path: 'register',
                element: (<ProtectedAuthRoutes><Register /></ProtectedAuthRoutes>)
            },
        ]
    }
])
export default function AppRoutes() {
    return (
        <>

        </>
    )
}
