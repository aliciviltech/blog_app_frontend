import Home from "../pages/Home/Home";
import UserDashboard from "../pages/UserDashboard/UserDashboard";

export const routes = [
    {
        id: 'route1', 
        path: '/',
        element: <Home/>
    },
    {
        id: 'route2', 
        path: '/user-dashboard',
        element: <UserDashboard/>
    },
]