import { useState, useEffect } from "react";
import ChevronIcon from "../../../components/common/icons/ChevonIcon";
import CircleOptionIcon from "../../../components/common/icons/CircleOptionIcon";
import SquareOptionIcon from "../../../components/common/icons/SquareOptionIcon";
import MultipleChoiceIcon from "../../../components/common/icons/MultipleChoiceIcon";
import TextOptionIcon from "../../../components/common/icons/TextOptionIcon";
import { QuestionType } from "../../../types/survey";
import CheckboxGridIcon from "../../../components/common/icons/CheckboxGridIcon";


const QuestionTypeOptions = [
    {
        id: 1,
        text: 'Single choice',
        type: QuestionType.SINGLE_CHOICE,
        icon: <CircleOptionIcon fill="#d1d5db" width={'26px'} height={'26px'} />
    },
    {
        id: 2,
        text: 'Multiple choice',
        type: QuestionType.MULTIPLE_CHOICE,
        icon: <SquareOptionIcon fill="#d1d5db" width={'26px'} height={'26px'} />
    },
    {
        id: 3,
        text: 'Text',
        type: QuestionType.TEXT,
        icon: <TextOptionIcon width={'26px'} height={'26px'} />
    },
    {
        id: 4,
        text: 'Checkbox grid',
        type: QuestionType.CHECKBOX_GRID,
        icon: <CheckboxGridIcon width={'26px'} height={'26px'} />
    },
    {
        id: 5,
        text: 'Multiple choice grid',
        type: QuestionType.MULTIPLE_CHOICE_GRID,
        icon: <MultipleChoiceIcon width={'26px'} height={'26px'} />
    }
]

type QuestionTypeSelectorProps = {
    currentType: QuestionType;
    onTypeChange: (type: QuestionType) => void;
}

const QuestionTypeSelector = ({ currentType, onTypeChange }: QuestionTypeSelectorProps) => {
    const [showOptions, setShowOptions] = useState(false)

    const currentOption = QuestionTypeOptions.find(option => option.type === currentType) || QuestionTypeOptions[0]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.id !== "dropdown" && !target.closest("#dropdown")) {
                setShowOptions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <div id="dropdown" className="max-w-[256px] w-full h-full relative">
            <button
                onClick={() => setShowOptions(true)}
                className="cursor-pointer border-1 w-full h-full py-2 px-4 flex items-center space-x-2"
            >
                <ChevronIcon
                    className={`${showOptions ? 'rotate-180' : ''} transition-all ease-in-out duration-300`}
                    width={'16px'}
                    height={'16px'}
                />
                <span>{currentOption.text}</span>
            </button>

            {showOptions && (
                <div className="z-10 absolute translate-y-1/4 right-0 top-0 w-full bg-white border border-gray-300 rounded shadow-lg p-4">
                    <div className="flex flex-col">
                        {QuestionTypeOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => {
                                    onTypeChange(option.type);
                                    setShowOptions(false);
                                }}
                                className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2"
                            >
                                {option.icon}
                                <span>{option.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionTypeSelector