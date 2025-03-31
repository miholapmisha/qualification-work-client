import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../services/api/user";
import { useState } from "react";
import { User, UserFormPayload } from "../types/user";
import { ApiResponse } from "../services/api/common";
import { NetworkError } from "../types/error";

type useUsersProps = {
    queryKey: any[];
    fetchParams: any;
};

export const useUsers = ({ queryKey, fetchParams }: useUsersProps) => {
    const queryClient = useQueryClient();
    const [proceedingUsersIds, setProceedingUsersIds] = useState<string[]>([]);
    const [lastErrorMessage, setLastErrorMessage] = useState<NetworkError | undefined>(undefined);

    const { data: usersResponse, isFetching: fetchingUsers, isPlaceholderData: isPlaceholderUsers } = useQuery({
        queryFn: async () => {
            const response = await getUsers(fetchParams)
            if (response.error) {
                setLastErrorMessage({ id: crypto.randomUUID(), message: response.data.message })
            }

            return response
        },
        queryKey
    });

    const { mutateAsync: createUserMutation, isPending: isUserCreating } = useMutation({
        mutationFn: (userData: UserFormPayload) => createUser(userData),
        onSettled: (response) => {
            if (response?.error) {
                setLastErrorMessage({ message: response.data.message, id: crypto.randomUUID() });
            } else {
                queryClient.setQueryData(queryKey, (oldData: ApiResponse<any>) => {
                    if (!response?.error && response?.data.payload && oldData?.data?.payload?.data) {
                        return {
                            ...oldData,
                            data: {
                                ...oldData.data,
                                message: response.data.message,
                                payload: {
                                    ...oldData.data.payload,
                                    data: [...oldData.data.payload.data, response.data.payload],
                                },
                            },
                        };
                    }
                    return oldData;
                });
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

            if (response?.error) {
                setLastErrorMessage({ message: response.data.message, id: crypto.randomUUID() });
            } else {
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
        mutationFn: ({ _id, userData }: { _id: string; userData: UserFormPayload }) => {
            setProceedingUsersIds((prevIds) => [...prevIds, _id]);
            return updateUser({ _id, data: userData });
        },
        onSettled: (response, _, context) => {
            const updateId = context._id;
            setProceedingUsersIds((prevIds) => prevIds.filter((id) => id !== updateId));

            if (response?.error) {
                setLastErrorMessage({ message: response.data.message, id: crypto.randomUUID() });
            } else {
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
        users: usersResponse?.data?.payload?.data,
        error: lastErrorMessage,
        message: usersResponse?.data?.message,
        proceedingUsersIds,
        createUser: createUserMutation,
        isUserCreating,
        deleteUser: deleteUserMutation,
        updateUser: updateUserMutation,
        isPlaceholderUsers,
        paginationData: usersResponse?.data?.payload?.metaData,
    };
};