import { createContext, useContext, useState, type ReactNode } from "react"
import { getToken, removeToken, saveToken } from "../services/tokenStorage"

type AuthContextType = {
    isLoggedIn: boolean
    login: (token: string) => void
    logout: () => void
}
type AuthProviderProps = {
    children: ReactNode
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : AuthProviderProps){
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()))

    function login(token: string){
        saveToken(token)
        setIsLoggedIn(true)
    }

    function logout(){
        removeToken()
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}