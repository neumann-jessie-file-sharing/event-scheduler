import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getToken, removeToken, saveToken } from "../services/tokenStorage"
import type { User } from "../types"
import { getProfile } from "../services/eventsApi"


type AuthContextType = {
    isLoggedIn: boolean
    user: User | null
    isAuthLoading: boolean
    login: (token: string) => Promise<void>
    logout: () => void
}
type AuthProviderProps = {
    children: ReactNode
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : AuthProviderProps){
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()))
    const [user, setUser] = useState<User | null>(null)
    const [isAuthLoading, setIsAuthLoading] = useState(true)

     useEffect(() => {
    async function restoreAuth() {
      const token = getToken()

      if (!token) {
        setIsAuthLoading(false)
        return
      }

      try {
        const profile = await getProfile()

        setUser(profile)
        setIsLoggedIn(true)
      } catch (error) {
        console.error(
          "Failed to restore authentication:",
          error
        )

        removeToken()
        setUser(null)
        setIsLoggedIn(false)
      } finally {
        setIsAuthLoading(false)
      }
    }

    restoreAuth()
  }, [])

    async function login(token: string){
        saveToken(token)
        const profile = await getProfile()
        setUser(profile)
        setIsLoggedIn(true)
        
    }

    function logout(){
        removeToken()
        setUser(null)
        setIsLoggedIn(false)
        
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, user, isAuthLoading, login, logout}}>
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