import { GeneralQuestionType } from "../../../types/survey";

type QuestionSelectorProps = {
    questions: GeneralQuestionType[]
    selectedQuestionId: string
    onQuestionChange: (questionId: string) => void
}

const QuestionSelector = ({ questions, selectedQuestionId, onQuestionChange }: QuestionSelectorProps) => {

    return (
        <div className="mb-6">
            <label htmlFor="question-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select a question to analyze:
            </label>
            <select
                id="question-select"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedQuestionId}
                onChange={(e) => onQuestionChange(e.target.value)}
            >
                {questions.map((question) => (
                    <option key={question._id} value={question._id}>
                        {question.questionText ? question.questionText : "Untitled question"}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuestionSelector