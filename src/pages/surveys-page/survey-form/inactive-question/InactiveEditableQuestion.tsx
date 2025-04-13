import { useCallback } from "react"
import { QuestionState, QuestionType } from "../../../../types/survey"
import OptionItem from "../question-form/OptionItem"
import UncheckedRadioIcon from "../../../../components/common/icons/UncheckedRadioIcon"
import UncheckedCheckboxIcon from "../../../../components/common/icons/UncheckedCheckboxIcon"
import { TextAnswerOption } from "../question-form/TextAnswerOption"
import InactiveOptionsGrid from "./InactiveOptionsGrid"

type InactiveQuestionRendererProps = {
    question: QuestionState,
    onSetEditable: (editQuestionId: string) => void
}

const InactiveEditableQuestion = ({ question, onSetEditable }: InactiveQuestionRendererProps) => {

    const renderOptions = useCallback(() => {
        switch (question.type) {
            case QuestionType.TEXT:
                return <TextAnswerOption />
            case QuestionType.SINGLE_CHOICE:
                return (
                    <div className="flex flex-col space-y-2">
                        {question.options.map((option) => (
                            <OptionItem
                                key={option._id}
                                canDelete={false}
                                option={option}
                                icon={<UncheckedRadioIcon width={'26px'} height={'26px'} />}
                                editable={false}
                            />
                        ))}
                    </div>
                )
            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <div className="flex flex-col space-y-2">
                        {question.options.map((option) => (
                            <OptionItem
                                key={option._id}
                                canDelete={false}
                                icon={<UncheckedCheckboxIcon width={'26px'} height={'26px'} />}
                                option={option}
                                editable={false}
                            />
                        ))}
                    </div>
                )
            case QuestionType.CHECKBOX_GRID:
                return <InactiveOptionsGrid icon={<UncheckedCheckboxIcon width={'26px'} height={'26px'} />} rows={question.rows} options={question.options} />

            case QuestionType.MULTIPLE_CHOICE_GRID:
                return <InactiveOptionsGrid icon={<UncheckedRadioIcon width={'26px'} height={'26px'} />} rows={question.rows} options={question.options} />
        }
    }, [question])

    return (
        <div onClick={() => onSetEditable(question._id)} className="max-w-7xl hover:scale-101 transition-all duration-300 ease-in-out w-full min-h-[184px] rounded-lg border-2 border-primary-300 bg-white shadow-sm p-4 flex flex-col space-y-6 px-10">
            <div className="flex space-x-4 px-12 pt-4 font-secondary">
                {question.questionText ? question.questionText : 'Question'}
            </div>
            {renderOptions()}
        </div>
    )
}

export default InactiveEditableQuestion