import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import SurveyPage from "../pages/surveys-pages/surveys-page/SurveysPage";
import { Role } from "../types/user";
import SurveyTaker from "../pages/surveys-pages/survey-taker/SurveyTaker";
import CreateSurveyPage from "../pages/surveys-pages/create-survey-page/CreateSurveyPage";
import EditSurveyPage from "../pages/surveys-pages/edit-survey-page/EditSurveyPage";

export const teacherRoutes = [
    {
        element:
            <ProtectedRoute allowedRoles={[Role.TEACHER]}>
                <PageLayout />
            </ProtectedRoute>
        ,
        children: [
            {
                path: '/surveys',
                element:
                    <SurveyPage />
            },
            {
                path: '/surveys/create',
                element:
                    <CreateSurveyPage />,
            },
            {
                path: '/surveys/take/:id',
                element:
                    <SurveyTaker />,
            },
            {
                path: '/surveys/edit/:surveyId',
                element: <EditSurveyPage />
            }
        ]
    }
]