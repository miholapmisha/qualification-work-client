import { Assign, AssignId, AssingPayload } from "../../types/assign";
import { api } from "./api";
import { handleSuccess, handleError, ApiResponse } from "./common";

export const getAssigns = async (userId: string): Promise<ApiResponse<Assign[]>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get(`/survey/assign/user/${userId}`);
        return handleSuccess(response.data, 'Assigns fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch assigns due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const getAssignBySurveyAndUser = async (assing: AssignId): Promise<ApiResponse<Assign>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get(`/survey/assign/by-query`, {
            params: { userId: assing.userId, surveyId: assing.surveyId }
        });
        return handleSuccess(response.data, 'Assign fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch assign due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const editAssign = (assignId: AssignId, assign: AssingPayload) => {
    
}