import { useLocation, useNavigate } from "react-router-dom"
import SurveyForm from "../survey-form/SurveyForm"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createSurvey } from "../../../services/api/surveys"
import { SurveyPayload } from "../../../types/survey"
import { useAlerts } from "../../../components/alert/AlertsProvider"



const CreateSurveyPage = () => {

    const { state } = useLocation()
    const { addAlert } = useAlerts()
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { mutateAsync: createSurveyMutation } = useMutation({
        mutationFn: (surveyState: SurveyPayload) => createSurvey(surveyState),
        onSuccess: async (response) => {
            if (response && !response.error) {
                await queryClient.invalidateQueries({ queryKey: ['surveys'] })
                addAlert({ id: crypto.randomUUID(), message: 'Survey created successfully', type: 'success', timeout: 2000 })
            }
        },
    })

    const handleSave = (surveyState: SurveyPayload) => {
        createSurveyMutation(surveyState)
        navigate('/surveys')
    }

    if (!state || !state.survey) {
        return <SurveyForm onSave={handleSave} />
    }

    return (
        <SurveyForm onSave={handleSave} surveyData={state.survey} />
    )
}

export default CreateSurveyPage
