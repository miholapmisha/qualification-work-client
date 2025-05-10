import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import SurveyTaker from "./survey-taker/SurveyTaker"
import { useQuery } from "@tanstack/react-query"
import { getAssignBySurveyAndUser } from "../../../services/api/assign"
import { useAuth } from "../../../components/AuthProvider"
import PageLoader from "../../../components/PageLoader"
import { Survey } from "../../../types/survey"
import { AnswersMap, AnswersObject } from "../../../types/answer"
import { ASSIGN_ID_SEPARATOR, useAssigns } from "../../../hooks/useAssigns"

const SurveyTakerPage = () => {

    const { state } = useLocation()
    const { surveyId } = useParams()
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    if (!currentUser) {
        return <PageLoader />
    }

    if (!surveyId) {
        return <Navigate to='/assigns' />
    }

    const { completeSurveyMutation } = useAssigns({ queryKey: ['assigns', currentUser._id] })


    const handleCompletionOfSurvey = (surveyId: string, answers: AnswersMap) => {
        const answersObject = Object.fromEntries(answers) as AnswersObject
        completeSurveyMutation({ assignId: currentUser._id + ASSIGN_ID_SEPARATOR + surveyId, answers: answersObject })
        navigate('/assigns')
    }

    if (state && state.survey) {
        return <SurveyTaker onSubmit={handleCompletionOfSurvey} survey={state.survey} />
    }

    const { data: surveyAssignResponse, isLoading: fetchingSurveyAssign } = useQuery({
        queryKey: ['assigns', currentUser?._id, surveyId],
        queryFn: () => getAssignBySurveyAndUser({ userId: currentUser._id, surveyId }),
        enabled: !!currentUser?._id
    })

    if (fetchingSurveyAssign) {
        return <PageLoader />
    }

    if (surveyAssignResponse?.error) {
        return <Navigate to='/assigns' />
    }

    const assign = surveyAssignResponse?.data.payload

    return (
        assign ? <SurveyTaker onSubmit={handleCompletionOfSurvey} survey={assign.survey as Survey} /> : <Navigate to='/assigns' />
    )
}

export default SurveyTakerPage