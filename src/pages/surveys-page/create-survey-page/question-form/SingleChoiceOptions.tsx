import CircleOptionIcon from "../../../../components/common/icons/CircleOptionIcon";
import { Option } from "../../../../types/survey";
import AddItemButton from "./AddItemButton";
import OptionItem from "./OptionItem";

type SingleChoiceOptionsProps = {
    options: Option[];
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
}

const SingleChoiceOptions = ({ options, onAddOption, onDeleteOption }: SingleChoiceOptionsProps) => {
    return (
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <OptionItem
                    key={option._id}
                    id={option._id}
                    text={option.text}
                    icon={<CircleOptionIcon width={'26px'} height={'26px'} />}
                    onDelete={onDeleteOption}
                    canDelete={options.length > 1}
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