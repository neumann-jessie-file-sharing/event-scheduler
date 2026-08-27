import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


export function ProtectedLayout(){

    const { isLoggedIn: isAuthenticated } = useAuth()
    const location = useLocation()

    if(!isAuthenticated){
        return <Navigate to="/signin" replace state={{ from: location }} />
    }

    return <Outlet />
}
