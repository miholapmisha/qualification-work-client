import React from "react";
import { MultipleChoiceGrid, MultipleChoiceGridAnswer } from "../../../../../types/survey";
import Radio from "../Radio";
import ClearAnswerButton from "./ClearAnswerButton";

type MultipleChoiceGridRendererProps = {
    question: MultipleChoiceGrid;
    onChooseAnswer: (questionId: string, answer: MultipleChoiceGridAnswer[] | undefined) => void;
}

const MultipleChoiceGridRenderer = ({ question, onChooseAnswer }: MultipleChoiceGridRendererProps) => {
    const gridTemplateColumns = `minmax(80px, 1fr) repeat(${question.options.length}, 1fr)`

    const handleGridChange = (rowId: string, optionId: string) => {
        const currentAnswers = question.answer || [];
        let newAnswers: MultipleChoiceGridAnswer[] = [];

        const existingAnswerIndex = currentAnswers.findIndex(answer => answer.row === rowId);

        if (existingAnswerIndex >= 0) {
            newAnswers = [...currentAnswers];
            newAnswers[existingAnswerIndex] = { row: rowId, column: optionId };
        } else {
            newAnswers = [...currentAnswers, { row: rowId, column: optionId }];
        }

        onChooseAnswer(question._id, newAnswers);
    }

    return (
        <>
            <div
                className="w-full overflow-auto"
                style={{
                    display: 'grid',
                    gridTemplateColumns,
                    gap: '1rem',
                    alignItems: 'center'
                }}
            >
                <div className="font-medium text-primary-600">
                </div>

                {question.options.map(option => (
                    <div key={`header-${option._id}`} className="text-center font-medium py-2">
                        {option.text}
                    </div>
                ))}

                {question.rows.map(row => (
                    <React.Fragment key={`row-${row._id}`}>
                        <div>
                            {row.text}
                        </div>

                        {question.options.map(option => (
                            <div key={`cell-${row._id}-${option._id}`} className="flex justify-center">
                                <Radio
                                    checked={question.answer?.some(answer =>
                                        answer.row === row._id && answer.column === option._id
                                    ) || false}
                                    name={`${question._id}-row-${row._id}`}
                                    onChange={() => handleGridChange(row._id, option._id)}
                                    value={option._id}
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {question.answer && question.answer.length > 0 && (
                <ClearAnswerButton label="Clear selection" onClear={() => onChooseAnswer(question._id, undefined)} />
            )}
        </>
    );
};

export default MultipleChoiceGridRenderer;