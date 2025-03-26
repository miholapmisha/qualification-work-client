import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteUser, getUsers } from "../services/api/user"
import { useState } from "react"

type useUsersProps = {
    queryKey: any[],
    fetchParams: any
}

export const useUsers = ({ queryKey, fetchParams }: useUsersProps) => {

    const [proceedingUsers, setProceedingUsers] = useState<string[]>([])
    const queryClient = useQueryClient()
    const { data: usersResponse, isPlaceholderData, isFetching } = useQuery({
        queryKey,
        queryFn: () => getUsers(fetchParams),
        placeholderData: (prev) => prev
    })

    const { mutateAsync: deleteUserMutation } = useMutation({
        mutationFn: (id: string) => {
            setProceedingUsers(prevIds => [...prevIds, id])
            return deleteUser(id)
        },
        onSuccess: (_, context) => {
            const deletionId = context
            setProceedingUsers(prevIds => prevIds.filter(id => id !== deletionId))
            queryClient.invalidateQueries({ queryKey })
        }
    })

    return {
        proceedingUsers,
        deleteUser: deleteUserMutation,
        fetchingUsers: isFetching,
        isPlaceholderUsers: isPlaceholderData,
        users: usersResponse?.data?.payload?.data,
        paginationData: usersResponse?.data?.payload?.metaData
    }
}