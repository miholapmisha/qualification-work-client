import { api } from "./api";
import { User } from "../../types/user";
import { ApiResponse, handleError } from "./common";

export const login = async (email: string, password: string): Promise<ApiResponse<User>> => {
    try {
        const response = await api.post("/auth/login", { email, password });

        return {
            error: false,
            data: {
                message: 'Success',
                payload: response.data,
            },
        };
    } catch (err) {
        const defaultMessage = "Unable to login due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
};

export const logout = async (): Promise<ApiResponse<User>> => {
    try {
        await api.post('/auth/logout');
        return { error: false, data: { message: 'Success' } };
    } catch (err) {
        const defaultMessage = "Unable to logout due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
};

