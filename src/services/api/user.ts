import { FilterObject } from "../../types/filtering";
import { PaginationObject } from "../../types/pagination";
import { User, UserPayload } from "../../types/user";
import { api } from "./api";
import { handleSuccess, handleError, ApiResponse } from "./common";

type GetUsersParams = {
    searchParams?: FilterObject[],
    pagination?: { page: number; take: number }
}

export const getUsers = async (usersParams: GetUsersParams): Promise<ApiResponse<PaginationObject<User> | User[]>> => {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        console.log("Pagination: ", usersParams)
        const pagination = usersParams.pagination
        const url = pagination
            ? `/user/search?page=${pagination.page}&take=${pagination.take}`
            : `/user/search`;

        const response = await api.post(url, usersParams.searchParams ? usersParams.searchParams : {});

        return handleSuccess(response.data, 'Users fetched successfully');
    } catch (err) {
        const defaultMessage =
            'Unable to fetch users due to some internal reasons, please try again later';
        return handleError(err, defaultMessage);
    }
};

export const deleteUser = async (id: string): Promise<ApiResponse<any>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 4000) });
        const response = await api.delete(`/user/${id}`);
        return handleSuccess(response.data, 'User deleted successfully');
    } catch (err) {
        const defaultMessage = "Unable to delete user due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const createUser = async (userData: UserPayload): Promise<ApiResponse<User>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 4000) });
        const response = await api.post('/user/create', { ...userData })
        return handleSuccess(response.data, 'User created successfully')
    } catch (err) {
        const defaultMessage = "Unable to create user due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const updateUser = async ({ _id, data }: { _id: string, data: UserPayload }) => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.put(`/user/${_id}`, { ...data });
        return handleSuccess(response.data, 'User updated successfully');
    } catch (err) {
        console.log("Error:", err)
        const defaultMessage = "Unable to update user due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const assignUsersToGroup = async ({ userIds, groupId }: { userIds: string[], groupId: string }) => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.put(`/user/assign`, { userIds, groupId });
        return handleSuccess(response.data, 'User assigned successfully');
    } catch (err) {
        console.log("Error:", err)
        const defaultMessage = "Unable to assign users to group due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}