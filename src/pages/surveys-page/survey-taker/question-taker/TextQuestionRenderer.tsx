import { TextQuestion } from "../../../../types/survey";
import ClearAnswerButton from "./ClearAnswerButton";

type TextQuestionRendererProps = {
    question: TextQuestion;
    onChooseAnswer: (questionId: string, answer: string | undefined) => void;
}

const TextQuestionRenderer = ({ question, onChooseAnswer }: TextQuestionRendererProps) => {
    return (
        <div>
            <textarea
                defaultValue={question.answer ? question.answer : ''}
                value={question.answer ? question.answer : ''}
                onChange={(event) => {
                    const value = event.target.value;
                    onChooseAnswer(question._id, value);
                }}
                placeholder="Enter your answer here"
                className="w-full border border-primary-300 rounded-xl p-4 resize-none outline-none font-main text-primary-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all min-h-24"
            />
            {question.answer && (
                <ClearAnswerButton label="Clear answer" onClear={() => onChooseAnswer(question._id, undefined)}
                />
            )}
        </div>
    );
};

export default TextQuestionRenderer