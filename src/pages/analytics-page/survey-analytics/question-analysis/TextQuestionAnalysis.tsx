import { Link } from "react-router-dom";
import Button from "../../../../components/common/Button";
import ResponseStats from "../ResponseStats";

type TextQuestionAnalysisProps = {
    answered: number,
    unanswered: number,
    totalResponses: number
    surveyId: string
}

const TextQuestionAnalysis = ({ answered, unanswered, totalResponses, surveyId }: TextQuestionAnalysisProps) => {

    return (
        <div className="bg-white p-6 rounded-lg border border-black min-h-72 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Text Question Analysis</h3>
            <ResponseStats
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
            />
            <p className="text-gray-500">Text responses can't be visualized in charts but are available for qualitative analysis.</p>
            <Link to={`/surveys/analytics/text-answers/${surveyId}`} target="_blank" rel="noopener noreferrer"><Button>See all text answers</Button></Link>
        </div>
    );
};

export default TextQuestionAnalysis

