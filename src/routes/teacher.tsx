import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import SurveyPage from "../pages/surveys-page/SurveysPage";
import { Role } from "../types/user";
import SurveyForm from "../pages/surveys-page/survey-form/SurveyForm";
import SurveyTaker from "../pages/surveys-page/survey-taker/SurveyTaker";

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
                    <SurveyForm />,
            },
            {
                path: '/surveys/take/:id',
                element:
                    <SurveyTaker />,
            }
        ]
    }
]