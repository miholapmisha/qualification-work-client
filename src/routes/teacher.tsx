import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import SurveyPage from "../pages/surveys-pages/surveys-page/SurveysPage";
import { Role } from "../types/user";
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
                path: '/surveys/edit/:surveyId',
                element: <EditSurveyPage />
            }
        ]
    }
]