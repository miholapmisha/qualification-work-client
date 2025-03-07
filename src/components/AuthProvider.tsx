import { createContext, PropsWithChildren, useContext, useEffect, useLayoutEffect, useState } from "react";
import { User } from "../types/user";
import { api } from "../services/api/api";

type AuthContext = {
    currentUser?: User | null;
    handleLogin: (email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>
}
type AuthProviderProps = PropsWithChildren

const AuthContext = createContext<AuthContext | undefined>(undefined)

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [currentUser, setCurrentUser] = useState<User | null>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/current')
                setCurrentUser(response.data)

            } catch {
                setCurrentUser(null)
            }
        }

        fetchUser()
    }, [])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequestConfig = error.config;

                if (error.response.status === 401) {
                    originalRequestConfig._retry = true

                    try {
                        await api.post('/auth/refresh')
                        return api(originalRequestConfig)
                    } catch {
                        setCurrentUser(null)
                    }
                }

                return Promise.reject(error)
            })

        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [])

    const handleLogin = async (email: string, password: string) => {

        try {
            const response = await api.post("/auth/login", { email, password })
            setCurrentUser(response.data)
        } catch {
            setCurrentUser(null)
        }
    }

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')
            setCurrentUser(null)
        } catch { }
    }

    const authProvierValues = {
        currentUser,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={authProvierValues}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuthContext should be used inside of AuthProvider")
    }

    return context
}

export default AuthProvider