import PageLayout from "../components/PageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import SurveyPage from "../pages/surveys-pages/surveys-page/SurveysPage";
import { Role } from "../types/user";
import CreateSurveyPage from "../pages/surveys-pages/create-survey-page/CreateSurveyPage";
import EditSurveyPage from "../pages/surveys-pages/edit-survey-page/EditSurveyPage";
import AnalyticsPage from "../pages/analytics-page/AnalyticsPage";
import TextAnswersPage from "../pages/analytics-page/text-answers-page/TextAnswersPage";
import SelectedAnalyticsCategoriesProvider from "../pages/analytics-page/SelectedAnalyticsCategoriesProvider";

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
            },
            {
                path: '/surveys/analytics/:surveyId',
                element:
                    <SelectedAnalyticsCategoriesProvider>
                        <AnalyticsPage />
                    </SelectedAnalyticsCategoriesProvider>
            },
            {
                path: '/surveys/analytics/text-answers/:surveyId',
                element: <TextAnswersPage />
            }
        ]
    }
]