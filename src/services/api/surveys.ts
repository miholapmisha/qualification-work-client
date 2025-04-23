import { FetchParams } from "../../types/filtering";
import { PaginationObject } from "../../types/pagination";
import { Survey, SurveyPayload } from "../../types/survey";
import { api } from "./api";
import { ApiResponse, handleError, handleSuccess } from "./common";

export const searchSurveys = async (surveyParams: FetchParams): Promise<ApiResponse<PaginationObject<Survey> | Survey[]>> => {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });

        const pagination = surveyParams.pagination
        const url = pagination
            ? `/survey/search?page=${pagination.page}&take=${pagination.take}`
            : `/survey/search`;

        const response = await api.post(url, surveyParams.searchParams ? surveyParams.searchParams : {});

        return handleSuccess(response.data, 'Surveys fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch surveys due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const getSurvey = async (surveyId: string): Promise<ApiResponse<Survey>> => {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        const response = await api.get(`/survey/${surveyId}`);
        return handleSuccess(response.data, 'Survey fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch survey due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const createSurvey = async (survey: SurveyPayload): Promise<ApiResponse<Survey>> => {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        const response = await api.post('/survey/create', survey);
        return handleSuccess(response.data, 'Survey created successfully');
    } catch (err) {
        const defaultMessage = "Unable to create survey due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const editSurvey = async (surveyId: string, survey: SurveyPayload): Promise<ApiResponse<Survey>> => {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        const response = await api.put(`/survey/${surveyId}`, survey);
        return handleSuccess(response.data, 'Survey updated successfully');
    } catch (err) {
        const defaultMessage = "Unable to update survey due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const deleteSurvey = async (surveyId: string): Promise<ApiResponse<any>> => {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        const response = await api.delete(`/survey/${surveyId}`);
        return handleSuccess(response.data, 'Survey deleted successfully');
    } catch (err) {
        const defaultMessage = "Unable to delete survey due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}