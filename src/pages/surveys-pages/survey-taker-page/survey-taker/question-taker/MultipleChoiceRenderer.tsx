import { MultipleChoiceQuestion } from "../../../../../types/survey";
import Checkbox from "../Checkbox";
import ClearAnswerButton from "./ClearAnswerButton";

type MultipleChoiceRendererProps = {
    question: MultipleChoiceQuestion;
    onChooseAnswer: (questionId: string, answer: string[] | undefined) => void;
}

const MultipleChoiceRenderer = ({ question, onChooseAnswer }: MultipleChoiceRendererProps) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const optionId = event.target.value;
        const isChecked = event.target.checked;

        const currentAnswers = question.answer || [];
        let newAnswers: string[] = [];

        if (isChecked) {
            newAnswers = [...currentAnswers, optionId];
        } else {
            newAnswers = currentAnswers.filter(id => id !== optionId);
        }

        onChooseAnswer(question._id, newAnswers);
    }


    return (
        <>
            <div className="flex flex-col space-y-2">
                {question.options.map((option) => (
                    <Checkbox
                        key={`${question._id}-${option._id}`}
                        checked={question.answer?.includes(option._id) || false}
                        name={`${question._id}-${option._id}`}
                        onChange={handleCheckboxChange}
                        value={option._id}
                        label={option.text}
                    />
                ))}
            </div>
            {question.answer && question.answer.length > 0 && (
                <ClearAnswerButton label="Clear selection" onClear={() => onChooseAnswer(question._id, undefined)} />
            )}
        </>
    );
};

export default MultipleChoiceRenderer