import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import SurveyForm from "../survey-form/SurveyForm"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { editSurvey, getSurvey } from "../../../services/api/surveys"
import { Survey, SurveyPayload } from "../../../types/survey"
import { useAlerts } from "../../../components/alert/AlertsProvider"
import PageLoader from "../../../components/PageLoader"

const EditSurveyPage = () => {

    const { state } = useLocation()
    const { surveyId } = useParams()
    const queryClient = useQueryClient()
    const { addAlert } = useAlerts()
    const navigate = useNavigate()

    if (!surveyId) {
        return <Navigate to='/surveys' />
    }

    const { mutateAsync: editSurveyMutationFunction } = useMutation({
        mutationFn: async (surveyData: SurveyPayload) => editSurvey(surveyId, surveyData),
        onSuccess: async (response) => {
            if (response && !response.error) {
                await queryClient.invalidateQueries({ queryKey: ['surveys'] })
                addAlert({ id: crypto.randomUUID(), message: 'Survey updated successfully', type: 'success', timeout: 2000 })
            }
        },
    })

    const handleEdit = (surveyData: SurveyPayload) => {
        editSurveyMutationFunction(surveyData)
        navigate('/surveys')
    }

    if (state && state.survey) {
        return <SurveyForm onSave={handleEdit} surveyData={state.survey} />
    }

    const { data: surveyToEditResponse, isLoading: fetchingSurveyToEdit } = useQuery({
        queryKey: ['surveys', 'survey_to_edit', surveyId],
        queryFn: () => getSurvey(surveyId),
    })

    if (fetchingSurveyToEdit) {
        return <PageLoader />
    }

    if (surveyToEditResponse?.error) {
        return <Navigate to='/surveys' />
    }

    const surveyToEdit = surveyToEditResponse?.data?.payload

    return (
        <SurveyForm surveyData={surveyToEdit as Survey} onSave={handleEdit} />
    )
}

export default EditSurveyPage