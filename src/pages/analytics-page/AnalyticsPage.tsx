import { useQuery } from "@tanstack/react-query"
import { useParams, Navigate } from "react-router-dom"
import PageLoader from "../../components/PageLoader"
import { getSurveyAnalytics } from "../../services/api/analytics"
import SurveyAnalytics from "./survey-analytics/SurveyAnalytics"

const AnalyticsPage = () => {

    const { surveyId } = useParams()

    if (!surveyId) {
        return <Navigate to='/surveys' />
    }

    const { data: surveyToAnalyseResponse, isLoading: fetchingSurveyToEdit } = useQuery({
        queryKey: ['surveys', 'survey_to_analyize', surveyId],
        queryFn: () => getSurveyAnalytics(surveyId),
    })

    if (fetchingSurveyToEdit) {
        return <PageLoader />
    }

    if (surveyToAnalyseResponse?.error) {
        return <Navigate to='/surveys' />
    }

    const analyticsData = surveyToAnalyseResponse?.data.payload

    return (
        analyticsData ? <SurveyAnalytics analyticsData={analyticsData.analytics} survey={analyticsData.survey} /> : <Navigate to="/surveys" />
    )
}

export default AnalyticsPage