import { SingleChoiceQuestion } from "../../../../types/survey";
import Radio from "../Radio";
import ClearAnswerButton from "./ClearAnswerButton";

type SingleChoiceRendererProps = {
    question: SingleChoiceQuestion;
    onChooseAnswer: (questionId: string, answer: string | undefined) => void;
}

const SingleChoiceRenderer = ({ question, onChooseAnswer }: SingleChoiceRendererProps) => {
    return (
        <>
            <div className="flex flex-col space-y-2">
                {question.options.map((option) => (
                    <Radio
                        key={option._id}
                        checked={option._id === question.answer}
                        name={question._id}
                        onChange={(event) => {
                            const optionId = event.target.value;
                            onChooseAnswer(question._id, optionId);
                        }}
                        value={option._id}
                        label={option.text}
                    />
                ))}
            </div>
            {question.answer && (
                <ClearAnswerButton label="Clear selection" onClear={() => onChooseAnswer(question._id, undefined)} />
            )}
        </>
    );
};

export default SingleChoiceRenderer