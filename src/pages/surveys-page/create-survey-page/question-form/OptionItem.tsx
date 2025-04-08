import { ReactNode } from "react"
import CloseIcon from "../../../../components/common/icons/CloseIcon";

type OptionItemProps = {
    id: string;
    text: string;
    icon: ReactNode;
    onDelete?: (id: string) => void;
    canDelete: boolean;
}

const OptionItem = ({ id, text, icon, onDelete, canDelete }: OptionItemProps) => {
    return (
        <div className="w-full py-2 flex items-center space-x-4">
            {icon}
            <input 
                autoFocus 
                defaultValue={text} 
                className="w-full hover:border-b-1 focus:border-b-1 focus:border-primary-500 transition-colors border-primary-300 outline-none" 
            />
            {canDelete && onDelete && (
                <CloseIcon className="cursor-pointer" onClick={() => onDelete(id)} />
            )}
        </div>
    )
}

export default OptionItem