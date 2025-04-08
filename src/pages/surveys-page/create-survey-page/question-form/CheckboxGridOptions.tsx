import { ReactNode } from "react";
import { Option } from "../../../../types/survey";
import AddItemButton from "./AddItemButton";
import OptionItem from "./OptionItem";
import RowItem from "./RowItem";

type CheckboxGridOptionsProps = {
    rows: Option[];
    options: Option[];
    icon: ReactNode;
    onAddRow: () => void;
    onDeleteRow: (id: string) => void;
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
}

const CheckboxGridOptions = ({
    rows,
    options,
    onAddRow,
    onDeleteRow,
    onAddOption,
    onDeleteOption,
    icon
}: CheckboxGridOptionsProps) => {
    return (
        <div className="flex space-x-12">
            <div className="flex-1">
                <h4 className="font-secondary">Rows:</h4>
                {rows.map((row, index) => (
                    <RowItem
                        key={row._id}
                        id={row._id}
                        text={row.text}
                        index={index}
                        onDelete={onDeleteRow}
                        canDelete={rows.length > 1}
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
                        id={column._id}
                        text={column.text}
                        icon={icon}
                        onDelete={onDeleteOption}
                        canDelete={options.length > 1}
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