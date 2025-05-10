import { AnswersObject } from "../../types/answer";
import { Assign, AssignId } from "../../types/assign";
import { FetchParams } from "../../types/filtering";
import { PaginationObject } from "../../types/pagination";
import { api } from "./api";
import { handleSuccess, handleError, ApiResponse } from "./common";

const basePath = '/survey/assign'

export const searchAssigns = async (assignParams: FetchParams): Promise<ApiResponse<PaginationObject<Assign> | Assign[]>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });

        const pagination = assignParams.pagination
        const url = pagination
            ? `${basePath}/search?page=${pagination.page}&take=${pagination.take}`
            : `${basePath}/search`;

        const response = await api.post(url, assignParams.searchParams ? assignParams.searchParams : {});
        return handleSuccess(response.data, 'Assigns fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch assigns due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const getAssignBySurveyAndUser = async (assing: AssignId): Promise<ApiResponse<Assign>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get(`${basePath}/by-query`, {
            params: { userId: assing.userId, surveyId: assing.surveyId }
        });
        return handleSuccess(response.data, 'Assign fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch assign due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const completeSurveyAssign = async (assing: AssignId, answers: AnswersObject): Promise<ApiResponse<Assign>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.post(`${basePath}/complete?userId=${assing.userId}&surveyId=${assing.surveyId}`, {
            answers
        });
        return handleSuccess(response.data, 'Assign fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch assign due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}