import { useQuery } from "@tanstack/react-query"
import { useParams, Navigate } from "react-router-dom"
import PageLoader from "../../components/PageLoader"
import { getSurveyAnalytics } from "../../services/api/analytics"
import SurveyAnalytics from "./survey-analytics/SurveyAnalytics"
import { buildCategoryTree } from "../../util/category"
import { Category, CategoryType } from "../../types/category"
import { useSelectedAnalysisCategoriess } from "./SelectedAnalyticsCategoriesProvider"

const AnalyticsPage = () => {

    const { surveyId } = useParams()
    const { selectedAnalysisCategories } = useSelectedAnalysisCategoriess()

    if (!surveyId) {
        return <Navigate to='/surveys' />
    }

    const groupIds = selectedAnalysisCategories
        .filter(category => category.categoryType === CategoryType.GROUP)
        .map((category) => category._id)
        
    const { data: surveyToAnalyseResponse, isLoading: fetchingSurveyToEdit } = useQuery({
        queryKey: ['surveys', 'survey_to_analyize', surveyId, groupIds],
        queryFn: () => getSurveyAnalytics(surveyId, groupIds),
    })

    if (fetchingSurveyToEdit) {
        return <PageLoader />
    }

    if (surveyToAnalyseResponse?.error) {
        return <Navigate to='/surveys' />
    }

    const analyticsData = surveyToAnalyseResponse?.data.payload

    return (
        analyticsData ?

            <SurveyAnalytics
                categories={buildCategoryTree((analyticsData.categories) as Category[])}
                analyticsData={analyticsData.analytics} survey={analyticsData.survey} />
            :
            <Navigate to="/surveys" />
    )
}

export default AnalyticsPage