import { AxiosError } from "axios";
import { api } from "./api";

export type AuthResponse = {
    error: boolean;
    data: {
        message: string;
        payload: any;
    };
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
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

export const logout = async (): Promise<AuthResponse> => {
    try {
        await api.post('/auth/logout');
        return { error: false, data: { message: 'Success', payload: {} } };
    } catch (err) {
        const defaultMessage = "Unable to logout due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
};

const handleError = (err: unknown, defaultMessage: string): AuthResponse => {
    if (err instanceof AxiosError && err.response?.data) {
        const message = err.response.data.message || defaultMessage;
        return { error: true, data: { message, payload: {} } };
    }
    return { error: true, data: { message: defaultMessage, payload: {} } };
};

