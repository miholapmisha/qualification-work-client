import { useState } from "react";
import QuestionSelector from "./QuestionSelector";
import SurveyOverview from "./SurveyOverview";
import { AnalyticsResult } from "../../../types/analytics";
import { Survey } from "../../../types/survey";
import QuestionAnalysisRenderer from "./QuestionAnalysisRenderer";

type SurveyAnalyticsProps = {
    analyticsData: AnalyticsResult,
    survey: Survey
}

const SurveyAnalytics = ({ analyticsData, survey }: SurveyAnalyticsProps) => {

    const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
        analyticsData?.questionsDistributions?.[0]?.questionId || ''
    );

    if (!analyticsData || !survey) {
        return (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
                <p className="text-lg text-gray-500">No analytics data available</p>
            </div>
        );
    }

    const { completed, uncompleted, questionsDistributions } = analyticsData;
    const totalResponses = completed + uncompleted;

    const findQuestionById = (questionId: string) => {
        return survey.questions.find(q => q._id === questionId);
    };

    const getQuestionDistribution = (questionId: string) => {
        return questionsDistributions.find(q => q.questionId === questionId);
    };

    const selectedQuestion = findQuestionById(selectedQuestionId);
    const selectedQuestionDist = getQuestionDistribution(selectedQuestionId);

    return (
        <div className="w-full flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
            <SurveyOverview
                survey={survey}
                completed={completed}
                uncompleted={uncompleted}
            />
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-3">Question Analysis</h2>

                <QuestionSelector
                    questions={survey.questions}
                    selectedQuestionId={selectedQuestionId}
                    onQuestionChange={setSelectedQuestionId}
                />

                <QuestionAnalysisRenderer
                    selectedQuestion={selectedQuestion}
                    selectedQuestionDist={selectedQuestionDist}
                    totalResponses={totalResponses}
                    surveyId={survey._id}
                />
            </div>
        </div>
    );
};

export default SurveyAnalytics;