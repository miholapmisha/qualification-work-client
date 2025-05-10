import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../services/api/user";
import { useState } from "react";
import { User, UserPayload } from "../types/user";
import { ApiResponse } from "../services/api/common";
import { FilterObject } from "../types/filtering";

type useUsersProps = {
    queryKey: any[];
    fetchParams: { pagination?: { take: number, page: number }, searchParams?: FilterObject[] };
};

export const useUsers = ({ queryKey, fetchParams }: useUsersProps) => {
    const queryClient = useQueryClient();
    const [proceedingUsersIds, setProceedingUsersIds] = useState<string[]>([]);

    const { data: usersResponse, isFetching: fetchingUsers, isPlaceholderData: isPlaceholderUsers } = useQuery({
        queryFn: async () => await getUsers(fetchParams),
        queryKey
    });

    const { mutateAsync: createUserMutation, isPending: isUserCreating } = useMutation({
        mutationFn: (userData: UserPayload) => createUser(userData),
        onSettled: (response) => {
            if (!response?.error) {
                queryClient.invalidateQueries({ queryKey })
            }
        },
    });

    const { mutateAsync: deleteUserMutation } = useMutation({
        mutationFn: (id: string) => {
            setProceedingUsersIds((prevIds) => [...prevIds, id]);
            return deleteUser(id);
        },
        onSettled: (response, _, context) => {
            const deletionId = context;
            setProceedingUsersIds((prevIds) => prevIds.filter((id) => id !== deletionId));

            if (!response?.error) {
                queryClient.setQueryData(queryKey, (oldData: ApiResponse<any>) => {
                    if (!response?.error && oldData?.data?.payload?.data) {
                        return {
                            ...oldData,
                            data: {
                                ...oldData.data,
                                message: response?.data.message,
                                payload: {
                                    ...oldData.data.payload,
                                    data: oldData.data.payload?.data?.filter((user: User) => user._id !== deletionId),
                                },
                            },
                        };
                    }
                    return oldData;
                });
            }
        },
    });

    const { mutateAsync: updateUserMutation } = useMutation({
        mutationFn: ({ _id, userData }: { _id: string; userData: UserPayload }) => {
            setProceedingUsersIds((prevIds) => [...prevIds, _id]);
            return updateUser({ _id, data: userData });
        },
        onSettled: (response, _, context) => {
            const updateId = context._id;
            setProceedingUsersIds((prevIds) => prevIds.filter((id) => id !== updateId));

            if (!response?.error) {
                queryClient.setQueryData(queryKey, (oldData: ApiResponse<any>) => {
                    if (!response?.error && oldData?.data?.payload?.data) {
                        const updatedUsers = [...oldData.data.payload.data];
                        const index = updatedUsers.findIndex((user) => user._id === updateId);
                        if (index !== -1) {
                            updatedUsers[index] = response?.data.payload;
                        }
                        return {
                            ...oldData,
                            data: {
                                ...oldData.data,
                                message: response?.data.message,
                                payload: {
                                    ...oldData.data.payload,
                                    data: updatedUsers,
                                },
                            },
                        };
                    }
                    return oldData;
                });
            }
        },
    });

    return {
        fetchingUsers,
        users: Array.isArray(usersResponse?.data?.payload)
            ? usersResponse?.data?.payload
            : usersResponse?.data?.payload?.data,
        message: usersResponse?.data?.message,
        proceedingUsersIds,
        createUser: createUserMutation,
        isUserCreating,
        deleteUser: deleteUserMutation,
        updateUser: updateUserMutation,
        isPlaceholderUsers,
        paginationData: !Array.isArray(usersResponse?.data?.payload)
            ? usersResponse?.data?.payload?.metaData
            : undefined,
    };
};