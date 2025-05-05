import { Navigate, useLocation, useParams } from "react-router-dom"
import SurveyTaker from "./survey-taker/SurveyTaker"
import { useQuery } from "@tanstack/react-query"
import { getAssignBySurveyAndUser } from "../../../services/api/assign"
import { useAuth } from "../../../components/AuthProvider"
import PageLoader from "../../../components/PageLoader"
import { Survey } from "../../../types/survey"

const SurveyTakerPage = () => {

    const { state } = useLocation()
    const { surveyId } = useParams()
    const { currentUser } = useAuth()

    if (!currentUser) {
        return <PageLoader />
    }

    if (!surveyId) {
        return <Navigate to='/assigns' />
    }

    if (state && state.survey) {
        return <SurveyTaker survey={state.survey} />
    }

    const { data: surveyAssignResponse, isLoading: fetchingSurveyAssign } = useQuery({
        queryKey: ['assign', currentUser?._id, surveyId],
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
        assign ? <SurveyTaker survey={assign.survey as Survey} /> : <Navigate to='/assigns' />
    )
}

export default SurveyTakerPage