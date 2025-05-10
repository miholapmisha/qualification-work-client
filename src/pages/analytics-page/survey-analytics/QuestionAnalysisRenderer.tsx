import { COLORS, GridCheckboxAnalytics, OptionDistribution, QuestionDistibution } from "../../../types/analytics";
import { GeneralQuestionType, QuestionType } from "../../../types/survey";
import ChoiceQuestionAnalysis from "./question-analysis/ChoiceQuestionAnalysis";
import GridQuestionAnalysis from "./question-analysis/GridQuestionAnalysis";
import TextQuestionAnalysis from "./question-analysis/TextQuestionAnalysis";

type QuestionAnalysisRendererProps = {
    selectedQuestion?: GeneralQuestionType
    selectedQuestionDist?: QuestionDistibution
    totalResponses: number,
    surveyId: string
}

const QuestionAnalysisRenderer = ({
    selectedQuestion,
    selectedQuestionDist,
    totalResponses,
    surveyId
}: QuestionAnalysisRendererProps) => {

    if (!selectedQuestion || !selectedQuestionDist) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">No question selected or no data available.</p>
            </div>
        );
    }

    const { type } = selectedQuestion;
    const { answered, unanswered, analytics } = selectedQuestionDist;

    if (type === QuestionType.TEXT) {
        return (
            <TextQuestionAnalysis
                surveyId={surveyId}
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
            />
        );
    }

    if ((type === QuestionType.SINGLE_CHOICE || type === QuestionType.MULTIPLE_CHOICE) && analytics) {
        const optionData = (analytics as OptionDistribution[]).map((opt, index) => ({
            name: selectedQuestion.options.find(o => o._id === opt._id)?.text || 'Unknown',
            count: opt.selectedCount,
            percentage: opt.percentage,
            color: COLORS[index % COLORS.length]
        }));

        return (
            <ChoiceQuestionAnalysis
                title={type === 'single_choice' ? 'Single Choice' : 'Multiple Choice'}
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
                optionData={optionData}
            />
        );
    }

    if ((type === QuestionType.CHECKBOX_GRID || type === QuestionType.MULTIPLE_CHOICE_GRID) &&
        analytics && 'gridOptionsDistribution' in analytics) {

        const { mostSelectedColumn, gridOptionsDistribution } = analytics as GridCheckboxAnalytics;
        const optionsMap: Record<string, string> = {};

        selectedQuestion.options.forEach(opt => {
            optionsMap[opt._id] = opt.text;
        });

        const rowsMap: Record<string, string> = {};
        selectedQuestion.rows.forEach(row => {
            rowsMap[row._id] = row.text;
        });

        const rowData = gridOptionsDistribution.map(row => {
            const rowName = rowsMap[row.rowId] || 'Unknown Row';

            const optionCounts: Record<string, number> = {};
            row.rowOptionsDistribution.forEach(opt => {
                const optionName = optionsMap[opt._id];
                if (optionName) {
                    optionCounts[optionName] = opt.selectedCount;
                }
            });

            return {
                rowName,
                ...optionCounts
            };
        });

        const optionNames = selectedQuestion.options.map(opt => opt.text);

        return (
            <GridQuestionAnalysis
                title={type === 'checkbox_grid' ? 'Checkbox Grid Analysis' : 'Multiple Choice Grid Analysis'}
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
                mostSelectedColumn={mostSelectedColumn}
                rowData={rowData}
                optionNames={optionNames}
                optionsMap={optionsMap}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">No detailed analytics available for this question type.</p>
        </div>
    );
};

export default QuestionAnalysisRenderer