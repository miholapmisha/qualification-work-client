import { ReactNode } from "react";
import UncheckedRadioIcon from "../../../../components/common/icons/UncheckedRadioIcon";
import UncheckedCheckboxIcon from "../../../../components/common/icons/UncheckedCheckboxIcon";
import MultipleChoiceIcon from "../../../../components/common/icons/MultipleChoiceIcon";
import TextOptionIcon from "../../../../components/common/icons/TextOptionIcon";
import CheckboxGridIcon from "../../../../components/common/icons/CheckboxGridIcon";
import { QuestionType } from "../../../../types/survey";
import Dropdown, { DropdownOption } from "../../../../components/common/Drowdown";

const questionTypeOptions: DropdownOption<QuestionType>[] = [
    {
        id: 1,
        label: "Single choice",
        value: QuestionType.SINGLE_CHOICE,
        icon: <UncheckedRadioIcon fill="#d1d5db" width="26px" height="26px" />
    },
    {
        id: 2,
        label: "Multiple choice",
        value: QuestionType.MULTIPLE_CHOICE,
        icon: <UncheckedCheckboxIcon fill="#d1d5db" width="26px" height="26px" />
    },
    {
        id: 3,
        label: "Text",
        value: QuestionType.TEXT,
        icon: <TextOptionIcon width="26px" height="26px" />
    },
    {
        id: 4,
        label: "Checkbox grid",
        value: QuestionType.CHECKBOX_GRID,
        icon: <CheckboxGridIcon width="26px" height="26px" />
    },
    {
        id: 5,
        label: "Multiple choice grid",
        value: QuestionType.MULTIPLE_CHOICE_GRID,
        icon: <MultipleChoiceIcon width="26px" height="26px" />
    }
];

type QuestionTypeSelectorProps = {
    currentType: QuestionType;
    onTypeChange: (type: QuestionType) => void;
    className?: string;
    disabled?: boolean;
};

const QuestionTypeSelector = ({ currentType, onTypeChange, className = "", disabled = false }: QuestionTypeSelectorProps) => {
    
    return (
        <Dropdown
            options={questionTypeOptions}
            value={currentType}
            onChange={onTypeChange}
            placeholder="Select question type"
            className={className}
            disabled={disabled}
            renderOption={(option: DropdownOption<QuestionType>) => (
                <div className="flex items-center space-x-4">
                    {option.icon as ReactNode}
                    <span>{option.label}</span>
                </div>
            )}
        />
    );
};

export default QuestionTypeSelector;