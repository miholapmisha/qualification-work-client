import CloseIcon from "../../../../components/common/icons/CloseIcon";

type RowItemProps = {
    id: string;
    text: string;
    index: number;
    onDelete?: (id: string) => void;
    canDelete: boolean;
}

const RowItem = ({ id, text, index, onDelete, canDelete }: RowItemProps) => {
    return (
        <div className="w-full py-2 flex items-center space-x-4">
            <span className="text-primary-500">{index + 1}.</span>
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

export default RowItem