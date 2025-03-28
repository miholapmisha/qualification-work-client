import { PaginationObject } from "../../types/pagination";
import { User, UserFormPayload } from "../../types/user";
import { api } from "./api";
import { handleSuccess, handleError, ApiResponse } from "./common";

export const getUsers = async (params: any): Promise<ApiResponse<PaginationObject<User>>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get("/user", { params });
        return handleSuccess(response.data, 'Users fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch users due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

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

export const createUser = async (userData: UserFormPayload): Promise<ApiResponse<User>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 4000) });
        const response = await api.post('/user/create', { ...userData })
        return handleSuccess(response.data, 'User created successfully')
    } catch (err) {
        const defaultMessage = "Unable to create user due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const updateUser = async ({ _id, data }: { _id: string, data: UserFormPayload }) => {
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