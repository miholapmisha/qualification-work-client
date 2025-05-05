import React from "react";
import { CheckboxGrid, CheckboxGridAnswer } from "../../../../../types/survey";
import Checkbox from "../Checkbox";

type CheckboxGridRendererProps = {
    question: CheckboxGrid;
    onChooseAnswer: (questionId: string, answer: CheckboxGridAnswer[] | undefined) => void;
}

const CheckboxGridRenderer = ({ question, onChooseAnswer }: CheckboxGridRendererProps) => {
    
    const gridTemplateColumns = `minmax(80px, 1fr) repeat(${question.options.length}, 1fr)`;

    const handleGridChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: string, optionId: string) => {
        const isChecked = event.target.checked;
        const currentAnswers = question.answer || [];
        let newAnswers: CheckboxGridAnswer[] = [];

        if (isChecked) {
            const existingAnswer = currentAnswers.find(answer => answer.row === rowId);

            if (existingAnswer) {
                const updatedColumns = [...existingAnswer.columns, optionId];
                newAnswers = currentAnswers.map(answer =>
                    answer.row === rowId ? { ...answer, columns: updatedColumns } : answer
                );
            } else {
                newAnswers = [...currentAnswers, { row: rowId, columns: [optionId] }];
            }
        } else {
            newAnswers = currentAnswers.map(answer => {
                if (answer.row === rowId) {
                    const updatedColumns = answer.columns.filter(column => column !== optionId);
                    return { ...answer, columns: updatedColumns };
                }
                return answer;
            }).filter(answer => answer.columns.length > 0);
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
                                <Checkbox
                                    checked={question.answer?.some(answer =>
                                        answer.row === row._id && answer.columns.includes(option._id)
                                    ) || false}
                                    name={`${question._id}-${row._id}-${option._id}`}
                                    onChange={(event) => handleGridChange(event, row._id, option._id)}
                                    value={option._id}
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {question.answer && question.answer.length > 0 && (
                <div className="flex justify-end mt-4">
                    <button
                        className="ml-auto hover:bg-primary-300 text-sm text-primary-600 rounded-2xl cursor-pointer px-4 py-2 bg-primary-200"
                        onClick={() => onChooseAnswer(question._id, undefined)}
                    >
                        Clear selection
                    </button>
                </div>
            )}
        </>
    );
};

export default CheckboxGridRenderer;