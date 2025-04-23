import UncheckedCheckboxIcon from "../../../../components/common/icons/UncheckedCheckboxIcon";
import { Option } from "../../../../types/survey";
import AddItemButton from "./AddItemButton";
import OptionItem from "./OptionItem";

type MultipleChoiceOptionsProps = {
    options: Option[];
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
    onEditOption: (option: Option) => void
}

const MultipleChoiceOptions = ({ options, onAddOption, onDeleteOption, onEditOption }: MultipleChoiceOptionsProps) => {
    return (
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <OptionItem
                    key={option._id}
                    option={option}
                    icon={<UncheckedCheckboxIcon width={'26px'} height={'26px'} />}
                    onDelete={onDeleteOption}
                    canDelete={options.length > 1}
                    onEdit={onEditOption}
                />
            ))}

            <AddItemButton
                label="+ Add option"
                icon={<UncheckedCheckboxIcon width={'26px'} height={'26px'} />}
                onClick={onAddOption}
            />
        </div>
    )
}

export default MultipleChoiceOptions