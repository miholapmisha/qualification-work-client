import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import SurveyPage from "../pages/surveys-page/SurveysPage";
import { Role } from "../types/user";
import CreateSurveyPage from "../pages/surveys-page/create-survey-page/CreateSurveyPage";

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
                    <SurveyPage />,
            },
            {
                path: '/surveys/create',
                element:
                    <CreateSurveyPage />,
            }
        ]
    }
]