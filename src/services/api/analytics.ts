import { AnalyticsData, SurveyTextAnswers } from "../../types/analytics";
import { api } from "./api";
import { handleSuccess, handleError, ApiResponse } from "./common";

export const getSurveyAnalytics = async (surveyId: string, groupsIds?: string[]): Promise<ApiResponse<AnalyticsData>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.post(`/analytics/${surveyId}`, { groupsIds });
        return handleSuccess(response.data, 'Analytics fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch analytics due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}

export const getSurveyTextAnswers = async (surveyId: string): Promise<ApiResponse<SurveyTextAnswers[]>> => {
    try {
        await new Promise((resolve) => { setTimeout(resolve, 2000) });
        const response = await api.get(`/analytics/text-questions/${surveyId}`);
        return handleSuccess(response.data, 'Analytics fetched successfully');
    } catch (err) {
        const defaultMessage = "Unable to fetch analytics due to some internal reasons, please try again later";
        return handleError(err, defaultMessage);
    }
}