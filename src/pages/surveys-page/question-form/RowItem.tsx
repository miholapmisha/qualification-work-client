import { ChangeEvent } from "react";
import CloseIcon from "../../../components/common/icons/CloseIcon";
import { TableRow as TableRow } from "../../../types/survey";

type RowItemProps = {
    row: TableRow;
    onEdit: (editRow: TableRow) => void
    index: number;
    onDelete?: (id: string) => void;
    canDelete: boolean;
}

const RowItem = ({ row, index, onDelete, canDelete, onEdit }: RowItemProps) => {

    const handleOptionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onEdit && event.target.value !== '') {
            onEdit({
                ...row,
                text: event.target.value,
            });
        }
    };

    return (
        <div className="w-full py-2 flex items-center space-x-4">
            <span className="text-primary-500">{index + 1}.</span>
            <input
                autoFocus
                onChange={handleOptionNameChange}
                defaultValue={row.text}
                className="w-full hover:border-b-1 focus:border-b-1 focus:border-primary-500 transition-colors border-primary-300 outline-none"
            />
            {canDelete && onDelete && (
                <CloseIcon className="cursor-pointer" onClick={() => onDelete(row._id)} />
            )}
        </div>
    )
}

export default RowItem