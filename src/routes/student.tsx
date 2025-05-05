import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AssignsPage from "../pages/assigns-page/AssignPage";
import SurveyTakerPage from "../pages/surveys-pages/survey-taker-page/SurveyTakerPage";
import { Role } from "../types/user";

export const studentsRoutes = [
    {
        element:
            <ProtectedRoute allowedRoles={[Role.STUDENT]}>
                <PageLayout />
            </ProtectedRoute>,
        children: [
            {
                path: '/assigns',
                element:
                    <AssignsPage />

            },
            {
                path: '/surveys/take/:surveyId',
                element:
                    <SurveyTakerPage/>
            },
        ]
    }
]