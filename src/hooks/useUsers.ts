import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, deleteUser, getUsers, updateUser } from "../services/api/user"
import { useState } from "react"
import { UserFormPayload } from "../types/user"

type useUsersProps = {
    queryKey: any[],
    fetchParams: any
}

export const useUsers = ({ queryKey, fetchParams }: useUsersProps) => {

    const [proceedingUsersIds, setProceedingUsersIds] = useState<string[]>([])
    const queryClient = useQueryClient()
    const { data: usersResponse, isPlaceholderData, isFetching } = useQuery({
        queryKey,
        queryFn: () => getUsers(fetchParams),
        placeholderData: (prev) => prev
    })

    const { mutateAsync: deleteUserMutation } = useMutation({
        mutationFn: (id: string) => {
            setProceedingUsersIds(prevIds => [...prevIds, id])
            return deleteUser(id)
        },
        onSuccess: async (_, context) => {
            await queryClient.invalidateQueries({ queryKey })
            const deletionId = context
            setProceedingUsersIds(prevIds => prevIds.filter(id => id !== deletionId))
        }
    })

    const { mutateAsync: createUserMutation, isPending: creatingUser } = useMutation({
        mutationFn: (userData: UserFormPayload) => createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
        }
    })

    const { mutateAsync: updateCategoryMutation } = useMutation({
        mutationFn: ({ _id, userData }: { _id: string, userData: UserFormPayload }) => {
            setProceedingUsersIds(prevIds => [...prevIds, _id])
            return updateUser({ _id, data: userData })
        },
        onSuccess: async (_, context) => {
            await queryClient.invalidateQueries({ queryKey })
            const updateId = context._id
            setProceedingUsersIds(prevIds => prevIds.filter(id => id !== updateId))
        }
    })

    return {
        error: usersResponse?.error,
        message: usersResponse?.data.message,
        proceedingUsersIds,
        deleteUser: deleteUserMutation,
        createUser: createUserMutation,
        creatingUser,
        updateUser: updateCategoryMutation,
        fetchingUsers: isFetching,
        isPlaceholderUsers: isPlaceholderData,
        users: usersResponse?.data?.payload?.data,
        paginationData: usersResponse?.data?.payload?.metaData
    }
}