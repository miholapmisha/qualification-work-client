import { ReactNode } from "react";
import { Option, TableRow } from "../../../types/survey";
import AddItemButton from "./AddItemButton";
import OptionItem from "./OptionItem";
import RowItem from "./RowItem";

type CheckboxGridOptionsProps = {
    rows: TableRow[];
    options: Option[];
    icon: ReactNode;
    onAddRow: () => void;
    onDeleteRow: (id: string) => void;
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
    onEditOption: (option: Option) => void;
    onEditRow: (row: TableRow) => void;
}

const CheckboxGridOptions = ({
    rows,
    options,
    onAddRow,
    onDeleteRow,
    onAddOption,
    onDeleteOption,
    onEditOption,
    onEditRow,
    icon
}: CheckboxGridOptionsProps) => {
    return (
        <div className="flex space-x-12">
            <div className="flex-1">
                <h4 className="font-secondary">Rows:</h4>
                {rows.map((row, index) => (
                    <RowItem
                        row={row}
                        key={row._id}
                        index={index}
                        onDelete={onDeleteRow}
                        canDelete={rows.length > 1}
                        onEdit={onEditRow}
                    />
                ))}
                <AddItemButton
                    label="+ Add row"
                    onClick={onAddRow}
                />
            </div>

            <div className="flex-1">
                <h4 className="font-secondary">Columns:</h4>
                {options.map((column) => (
                    <OptionItem
                        key={column._id}
                        option={column}
                        icon={icon}
                        onDelete={onDeleteOption}
                        canDelete={options.length > 1}
                        onEdit={onEditOption}
                    />
                ))}

                <AddItemButton
                    label="+ Add column"
                    icon={icon}
                    onClick={onAddOption}
                />
            </div>
        </div>
    )
}

export default CheckboxGridOptions