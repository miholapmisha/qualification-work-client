import { ChangeEvent, ReactNode } from "react"
import CloseIcon from "../../../components/common/icons/CloseIcon";
import { Option } from "../../../types/survey";

type OptionItemProps = {
    option: Option;
    icon: ReactNode;
    onDelete?: (id: string) => void;
    onEdit?: (option: Option) => void;
    canDelete: boolean;
    editable?: boolean
}

const OptionItem = ({ option, icon, onDelete, onEdit, canDelete, editable = true }: OptionItemProps) => {

    const handleOptionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onEdit && event.target.value !== '') {
            onEdit({
                ...option,
                text: event.target.value,
            });
        }
    };

    return (
        <div className="w-full py-2 flex items-center space-x-4">
            {icon}
            {editable ? (
                <input
                    onChange={handleOptionNameChange}
                    autoFocus
                    defaultValue={option.text}
                    className="w-full hover:border-b-1 focus:border-b-1 focus:border-primary-500 transition-colors border-primary-300 outline-none"
                />
            ) : (
                <h1 className="text-gray-700 font-medium">{option.text || ''}</h1>
            )}

            {canDelete && onDelete && editable && (
                <CloseIcon className="cursor-pointer" onClick={() => onDelete(option._id)} />
            )}
        </div>
    )
}

export default OptionItem