import { useState } from "react";
import QuestionSelector from "./QuestionSelector";
import SurveyOverview from "./SurveyOverview";
import { AnalyticsResult } from "../../../types/analytics";
import { Survey } from "../../../types/survey";
import QuestionAnalysisRenderer from "./QuestionAnalysisRenderer";
import SurveyCategoriesModal from "./SurveyCategoriesModal";
import { TreeCategory } from "../../../types/category";
import PlusIcon from "../../../components/common/icons/PlusIcon";
import { useSelectedAnalysisCategoriess } from "../SelectedAnalyticsCategoriesProvider";

type SurveyAnalyticsProps = {
    analyticsData: AnalyticsResult,
    survey: Survey,
    categories: TreeCategory[],
}

const SurveyAnalytics = ({ analyticsData, survey, categories }: SurveyAnalyticsProps) => {

    const { selectedAnalysisCategories } = useSelectedAnalysisCategoriess()
    const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
        analyticsData?.questionsDistributions?.[0]?.questionId || ''
    );
    const [showCategoriesModal, setShowCategoriesModal] = useState(false)

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
        <>
            <div className="w-full flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
                <div onClick={() => { setShowCategoriesModal(true) }} className=" fixed top-12 right-12 z-20 w-fit cursor-pointer">
                    <PlusIcon width={'38px'} height={'38px'} />
                    <div className="rounded-full w-[20px] h-[20px] flex justify-center items-center p-1 text-sm bg-red-600 z-21 text-white absolute right-0 top-6">
                        {selectedAnalysisCategories.length}
                    </div>
                </div>
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
            {showCategoriesModal && <SurveyCategoriesModal onClose={() => setShowCategoriesModal(false)} isOpen={showCategoriesModal} categories={categories}></SurveyCategoriesModal>}
        </>
    );
};

export default SurveyAnalytics;