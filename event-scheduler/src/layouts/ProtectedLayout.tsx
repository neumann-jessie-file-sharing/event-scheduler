import { Navigate, Outlet } from "react-router-dom"
import { isTokenPresent } from "../services/tokenStorage"


export function ProtectedLayout(){

    const isAuthenticated = isTokenPresent()

    if(!isAuthenticated){
        return <Navigate to="/signin" replace />
    }

    return <Outlet />
}
