import { AxiosError } from "axios";

export type ApiResponse<T = any> = {
    error: boolean;
    data: {
        message: string;
        payload?: T;
    };
}

export const handleError = (err: unknown, defaultMessage: string, payload?: any): ApiResponse => {
    if (err instanceof AxiosError && err.response?.data) {
        const message = err.response.data.message || defaultMessage;
        return { error: true, data: { message, payload: { payload } } };
    }

    return { error: true, data: { message: defaultMessage, payload: {} } };
}

export const handleSuccess = <T>(data: T, message: string): ApiResponse<T> => {
    return { error: false, data: { message, payload: data } };
}