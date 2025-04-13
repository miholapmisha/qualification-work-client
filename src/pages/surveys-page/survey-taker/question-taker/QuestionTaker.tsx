import { QuestionState, QuestionType } from "../../../../types/survey"
import CheckboxGridRenderer from "./CheckboxGridRenderer"
import MultipleChoiceGridRenderer from "./MultipleChoiceGridRenderer"
import MultipleChoiceRenderer from "./MultipleChoiceRenderer"
import SingleChoiceRenderer from "./SingleChoiceRenderer"
import TextQuestionRenderer from "./TextQuestionRenderer"

type QuestionTakerProps = {
    question: QuestionState
    onChooseAnswer: (questionId: string, answer: any) => void,
    error?: boolean
}

const QuestionTaker = ({ question, onChooseAnswer, error }: QuestionTakerProps) => {
    const renderQuestionContent = () => {
        switch (question.type) {
            case QuestionType.TEXT:
                return <TextQuestionRenderer question={question} onChooseAnswer={onChooseAnswer} />;
                
            case QuestionType.SINGLE_CHOICE:
                return <SingleChoiceRenderer question={question} onChooseAnswer={onChooseAnswer} />;
                
            case QuestionType.MULTIPLE_CHOICE:
                return <MultipleChoiceRenderer question={question} onChooseAnswer={onChooseAnswer} />;
                
            case QuestionType.CHECKBOX_GRID:
                return <CheckboxGridRenderer question={question} onChooseAnswer={onChooseAnswer} />;
                
            case QuestionType.MULTIPLE_CHOICE_GRID:
                return <MultipleChoiceGridRenderer question={question} onChooseAnswer={onChooseAnswer} />;
                
            default:
                return <div>Unsupported question type</div>;
        }
    };

    return (
        <div className={`${error ? 'border-red-600 text-red-600' : 'border-primary-300'} max-w-7xl w-full min-h-[184px] rounded-lg border-2 bg-white shadow-sm p-4 flex flex-col space-y-6 px-10`}>
            <div className="flex space-x-2 px-8 pt-4 font-secondary">
                {question.required && (
                    <span className="text-red-600 font-bold text-xl leading-none">*</span>
                )}
                <span className="text-base">{question.questionText}</span>
            </div>
            {renderQuestionContent()}
        </div>
    );
};
export default QuestionTaker