import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import PageLoader from "../../../components/PageLoader"
import { getSurveyTextAnswers } from "../../../services/api/analytics"
import SurveyTextAnswersViewer from "./SurveyTextAnswersViewer"

const TextAnswersPage = () => {

    const { surveyId } = useParams()

    if (!surveyId) {
        return <Navigate to='/surveys' />
    }

    const { data: textAnswersResponse, isLoading: fetchingSurveyToEdit } = useQuery({
        queryKey: ['surveys', 'survey_to_analyize', 'text-answers', surveyId],
        queryFn: () => getSurveyTextAnswers(surveyId),
    })

    if (fetchingSurveyToEdit) {
        return <PageLoader />
    }

    if (textAnswersResponse?.error) {
        return <Navigate to='/surveys' />
    }

    const textAnswers = textAnswersResponse?.data.payload

    return (
        textAnswers ? <SurveyTextAnswersViewer textAnswers={textAnswers} /> : <Navigate to="/surveys" />
    )

}

export default TextAnswersPage