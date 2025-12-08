import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../Pages/All-tickets/AllTickets";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/dashboard/DashboardHome";
import Profile from "../Pages/dashboard/profile/Profile";
import VendorRoute from "./VendorRoute";
import AddTicket from "../Pages/dashboard/add-ticket/AddTicket";
import AddedTickets from "../Pages/dashboard/added-tickets/AddedTickets";
import Error from "../Pages/error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-tickets',
                element: <PrivateRoute>
                    <AllTickets></AllTickets>
                </PrivateRoute>
            }
        ]
    },
    {
        path: 'auth',
        Component: AuthLayout,
        errorElement: <Error></Error>,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'profile',
                Component: Profile
            },
            // Pages for Vendors
            {
                path: 'add-ticket',
                element: <VendorRoute>
                    <AddTicket></AddTicket>
                </VendorRoute>
            },
            {
                path: 'added-tickets',
                element: <VendorRoute>
                    <AddedTickets></AddedTickets>
                </VendorRoute>
            },
        ]
    }
])