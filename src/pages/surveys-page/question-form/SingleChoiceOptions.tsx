import CircleOptionIcon from "../../../components/common/icons/CircleOptionIcon";
import { Option } from "../../../types/survey";
import AddItemButton from "./AddItemButton";
import OptionItem from "./OptionItem";

type SingleChoiceOptionsProps = {
    options: Option[];
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
    onEditOption: (option: Option) => void
}

const SingleChoiceOptions = ({ options, onAddOption, onDeleteOption, onEditOption }: SingleChoiceOptionsProps) => {
    return (
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <OptionItem
                    key={option._id}
                    option={option}
                    icon={<CircleOptionIcon width={'26px'} height={'26px'} />}
                    onDelete={onDeleteOption}
                    canDelete={options.length > 1}
                    onEdit={onEditOption}
                />
            ))}

            <AddItemButton
                label="+ Add option"
                icon={<CircleOptionIcon width={'26px'} height={'26px'} />}
                onClick={onAddOption}
            />
        </div>
    )
}

export default SingleChoiceOptions