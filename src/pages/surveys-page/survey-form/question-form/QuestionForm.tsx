import { ChangeEvent, useEffect, useState } from "react"
import { TextQuestion, SingleChoiceQuestion, MultipleChoiceQuestion, CheckboxGrid, MultipleChoiceGrid, QuestionType, QuestionState, Option, TableRow } from "../../../../types/survey"
import QuestionControls from "./QuestionControls"
import QuestionOptionsRenderer from "./QuestionOptionRenderer"
import QuestionTypeSelector from "./QuestionTypeSelector"

type QuestionFormProps = {
    question: QuestionState;
    onQuestionChange: (question: QuestionState) => void;
    onQuestionDelete: (questionId: string) => void;
    onQuestionCopy: (question: QuestionState) => void;
}

const QuestionForm = ({ question, onQuestionChange, onQuestionDelete, onQuestionCopy }: QuestionFormProps) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const handleAddOption = () => {
        const prev = question;
        if ('options' in prev) {
            const newOption = { _id: crypto.randomUUID(), text: `Option ${prev.options.length + 1}` }
            onQuestionChange({
                ...prev,
                options: [...prev.options, newOption]
            })
        }
    }

    const handleDeleteOption = (optionId: string) => {
        const prev = question
        if ('options' in prev) {
            onQuestionChange({
                ...prev,
                options: prev.options.filter((option) => option._id !== optionId)
            })
        }
    }

    const handleAddRow = () => {
        const prev = question
        if ('rows' in prev) {
            const newRow = { _id: crypto.randomUUID(), text: `Row ${prev.rows.length + 1}` }
            onQuestionChange({
                ...prev,
                rows: [...prev.rows, newRow]
            })
        }


    }

    const handleDeleteRow = (rowId: string) => {
        const prev = question
        if ('rows' in prev) {
            onQuestionChange({
                ...prev,
                rows: prev.rows.filter((row) => row._id !== rowId)
            })
        }
    }

    const handleChangeQuestionType = (type: QuestionType) => {
        const prev = question;
        switch (type) {
            case QuestionType.TEXT:
                onQuestionChange({
                    ...prev,
                    type: QuestionType.TEXT
                } as TextQuestion);
                break;

            case QuestionType.SINGLE_CHOICE:
                onQuestionChange({
                    ...prev,
                    type: QuestionType.SINGLE_CHOICE
                } as SingleChoiceQuestion);
                break;

            case QuestionType.MULTIPLE_CHOICE:
                onQuestionChange({
                    ...prev,
                    type: QuestionType.MULTIPLE_CHOICE
                } as MultipleChoiceQuestion);
                break;

            case QuestionType.CHECKBOX_GRID:
                onQuestionChange({
                    ...prev,
                    type: QuestionType.CHECKBOX_GRID,
                    rows: 'rows' in prev ? prev.rows || [{ _id: crypto.randomUUID(), text: "Row 1" }] : [{ _id: crypto.randomUUID(), text: "Row 1" }],
                } as CheckboxGrid);
                break;

            case QuestionType.MULTIPLE_CHOICE_GRID:
                onQuestionChange({
                    ...prev,
                    type: QuestionType.MULTIPLE_CHOICE_GRID,
                    rows: 'rows' in prev ? prev.rows || [{ _id: crypto.randomUUID(), text: "Row 1" }] : [{ _id: crypto.randomUUID(), text: "Row 1" }],
                } as MultipleChoiceGrid);
                break;

            default:
                onQuestionChange(prev);
                break;
        }
    };

    const handleRequiredChange = (value: boolean) => {
        const prev = question
        onQuestionChange({
            ...prev,
            required: value
        })
    };

    const handleEditOption = (option: Option) => {

        const prev = question

        if ('options' in prev) {
            const updatedOptions = prev.options
            const updateOptionIndex = updatedOptions.findIndex((itemOption) => itemOption._id === option._id)
            if (updateOptionIndex === -1) return

            updatedOptions[updateOptionIndex] = option
            onQuestionChange({
                ...prev,
                options: updatedOptions
            })
        }

    }

    const handleEditRow = (row: TableRow) => {
        const prev = question;

        if ('rows' in prev) {
            const updatedRows = prev.rows.map((existingRow) =>
                existingRow._id === row._id ? { ...existingRow, text: row.text } : existingRow
            );

            onQuestionChange({
                ...prev,
                rows: updatedRows,
            });
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const prev = question
        onQuestionChange({
            ...prev,
            questionText: event.target.value
        })
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsExpanded(true)
        }, 0)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className={`transition-all ease-in-out duration-500 border-l-4 border-l-cyan-600 w-full max-w-7xl
                            ${isExpanded ? 'opacity-100' : 'opacity-0'} rounded-lg border-2 border-primary-300 
                            bg-white shadow-sm p-4 
                            flex flex-col space-y-4`}>



            <div className="flex h-[52px] items-center justify-center space-x-4">
                <input
                    defaultValue={question.questionText}
                    onChange={handleNameChange}
                    autoFocus
                    placeholder="Question"
                    className="h-full px-2 flex-auto outline-none border-primary-400 bg-primary-100 leading-none focus:border-primary-600 transition-colors"
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
                    onEditOption={handleEditOption}
                    onEditRow={handleEditRow}
                />
            </div>

            <QuestionControls
                required={question.required}
                onCopy={() => onQuestionCopy(question)}
                onRequiredChange={handleRequiredChange}
                onDelete={() => onQuestionDelete(question._id)}
            />
        </div>
    )
}

export default QuestionForm