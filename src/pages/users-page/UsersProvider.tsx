import { createContext, PropsWithChildren, useContext } from "react"
import { useUsers } from "../../hooks/useUsers"
import { User, UserPayload } from "../../types/user"
import { ApiResponse } from "../../services/api/common"
import { useSearchParams } from "react-router-dom"

type UsersContextType = {
    fetchingUsers: boolean,
    users: User[] | undefined,
    error: boolean | undefined,
    message: string | undefined,
    proceedingUsers: string[],
    createUser: (userData: UserPayload) => Promise<ApiResponse<User | undefined>>,
    deleteUser: (userId: string) => Promise<ApiResponse<any>>,
    updateUser: (user: { _id: string, userData: UserPayload }) => Promise<ApiResponse<any>>
}

type UsersProviderProps = PropsWithChildren

const UsersContext = createContext<UsersContextType>({
    fetchingUsers: false,
    users: undefined,
    error: undefined,
    message: undefined,
    proceedingUsers: [],
    createUser: async (userData: UserPayload) => {
        return { data: { message: '', payload: undefined }, error: false } as ApiResponse<any>
    },
    deleteUser: async (userId: string): Promise<ApiResponse<any>> => {
        return { data: { message: '', payload: userId }, error: false } as ApiResponse<any>
    },
    updateUser: async (user: { _id: string, userData: UserPayload }) => {
        return { data: { message: '', payload: user }, error: false } as ApiResponse<any>
    }
})

const UsersProvider = ({ children }: UsersProviderProps) => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') || 1

    const {
        fetchingUsers,
        users,
        error,
        message,
        proceedingUsers,
        createUser,
        deleteUser,
        updateUser
    } = useUsers({ fetchParams: { page }, queryKey: ['users', page] })

    return (
        <UsersContext.Provider value={{
            fetchingUsers,
            users,
            error,
            message,
            proceedingUsers,
            createUser,
            deleteUser,
            updateUser
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => {
    const context = useContext(UsersContext)

    if (context === undefined) {
        throw new Error("useUsersContext must be used within a UsersProvider")
    }

    return context
}

export default UsersProvider