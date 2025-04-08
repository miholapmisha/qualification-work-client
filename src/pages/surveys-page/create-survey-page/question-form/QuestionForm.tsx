import { useState } from "react"
import { TextQuestion, SingleChoiceQuestion, MultipleChoiceQuestion, CheckboxGrid, MultipleChoiceGrid, QuestionType } from "../../../../types/survey"
import QuestionControls from "./QuestionControls"
import QuestionOptionsRenderer from "./QuestionOptionRenderer"
import QuestionTypeSelector from "./QuestionTypeSelector"

type QuestionState = TextQuestion | SingleChoiceQuestion | MultipleChoiceQuestion | CheckboxGrid | MultipleChoiceGrid

const QuestionForm = () => {
    const [question, setQuestion] = useState<QuestionState>({
        _id: crypto.randomUUID(),
        question: '',
        type: QuestionType.SINGLE_CHOICE,
        required: false,
        options: [
            { _id: crypto.randomUUID(), text: 'Option 1' },
        ]
    } as SingleChoiceQuestion)

    const handleAddOption = () => {
        setQuestion((prev) => {
            if ('options' in prev) {
                return {
                    ...prev,
                    options: [...prev.options, { _id: crypto.randomUUID(), text: `Option ${prev.options.length + 1}` }]
                }
            }
            return prev;
        })
    }

    const handleDeleteOption = (optionId: string) => {
        setQuestion((prev) => {
            if ('options' in prev) {
                return {
                    ...prev,
                    options: prev.options.filter((option) => option._id !== optionId)
                }
            }
            return prev;
        })
    }

    const handleAddRow = () => {
        setQuestion((prev) => {
            if ('rows' in prev) {
                return {
                    ...prev,
                    rows: [...prev.rows, { _id: crypto.randomUUID(), text: `Row ${prev.rows.length + 1}` }]
                }
            }
            return prev;
        })
    }

    const handleDeleteRow = (rowId: string) => {
        setQuestion((prev) => {
            if ('rows' in prev) {
                return {
                    ...prev,
                    rows: prev.rows.filter((row) => row._id !== rowId)
                }
            }
            return prev;
        })
    }

    const handleChangeQuestionType = (type: QuestionType) => {
        setQuestion((prev) => {
            switch (type) {
                case QuestionType.TEXT:
                    return {
                        ...prev,
                        type: QuestionType.TEXT,
                    } as TextQuestion;

                case QuestionType.SINGLE_CHOICE:
                    return {
                        ...prev,
                        type: QuestionType.SINGLE_CHOICE,
                    } as SingleChoiceQuestion;

                case QuestionType.MULTIPLE_CHOICE:
                    return {
                        ...prev,
                        type: QuestionType.MULTIPLE_CHOICE,
                    } as MultipleChoiceQuestion;

                case QuestionType.CHECKBOX_GRID:
                    return {
                        ...prev,
                        type: QuestionType.CHECKBOX_GRID,
                        rows: 'rows' in prev ? prev.rows || [{ _id: crypto.randomUUID(), text: "Row 1" }] : [{ _id: crypto.randomUUID(), text: "Row 1" }],
                    } as CheckboxGrid;

                case QuestionType.MULTIPLE_CHOICE_GRID:
                    return {
                        ...prev,
                        type: QuestionType.MULTIPLE_CHOICE_GRID,
                        rows: 'rows' in prev ? prev.rows || [{ _id: crypto.randomUUID(), text: "Row 1" }] : [{ _id: crypto.randomUUID(), text: "Row 1" }]
                    } as MultipleChoiceGrid;

                default:
                    return prev;
            }
        });
    };

    const handleRequiredChange = (value: boolean) => {
        setQuestion(prev => ({ ...prev, required: value }));
    };

    return (
        <div className="w-full min-h-[284px] rounded-lg border-2 border-primary-300 bg-white shadow-sm p-4 flex flex-col space-y-4">
            <div className="flex h-[52px] items-center justify-center space-x-4">
                <input
                    autoFocus
                    placeholder="Question"
                    className="h-full px-2 flex-auto outline-none border-b-1 border-primary-400 bg-primary-100 leading-none focus:border-primary-600 transition-colors"
                />

                <QuestionTypeSelector
                    currentType={question.type}
                    onTypeChange={handleChangeQuestionType}
                />
            </div>

            <div className="flex-grow">
                <QuestionOptionsRenderer
                    type={question.type}
                    options={'options' in question ? question.options : []}
                    rows={'rows' in question ? question.rows : []}
                    onAddOption={handleAddOption}
                    onDeleteOption={handleDeleteOption}
                    onAddRow={handleAddRow}
                    onDeleteRow={handleDeleteRow}
                />
            </div>

            <QuestionControls
                required={question.required}
                onRequiredChange={handleRequiredChange}
            />
        </div>
    )
}

export default QuestionForm