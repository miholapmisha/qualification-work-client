import { useCallback } from "react";
import { Option, QuestionType, TableRow } from "../../../../types/survey";
import { TextAnswerOption } from "./TextAnswerOption";
import MultipleChoiceOptions from "./MultipleChoiceOptions";
import CheckboxGridOptions from "./CheckboxGridOptions";
import SingleChoiceOptions from "./SingleChoiceOptions";
import UncheckedCheckboxIcon from "../../../../components/common/icons/UncheckedCheckboxIcon";
import UncheckedRadioIcon from "../../../../components/common/icons/UncheckedRadioIcon";

type QuestionOptionsRendererProps = {
    type: QuestionType;
    options: Option[];
    rows?: TableRow[];
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
    onAddRow?: () => void;
    onDeleteRow?: (id: string) => void;
    onEditOption: (option: Option) => void;
    onEditRow: (Row: TableRow) => void
}

const QuestionOptionsRenderer = ({
    type,
    options,
    rows = [],
    onAddOption,
    onDeleteOption,
    onAddRow,
    onDeleteRow,
    onEditOption,
    onEditRow
}: QuestionOptionsRendererProps) => {

    const renderOptions = useCallback(() => {
        switch (type) {
            case QuestionType.SINGLE_CHOICE:
                return (
                    <SingleChoiceOptions
                        options={options}
                        onAddOption={onAddOption}
                        onDeleteOption={onDeleteOption}
                        onEditOption={onEditOption}
                    />
                );

            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <MultipleChoiceOptions
                        options={options}
                        onAddOption={onAddOption}
                        onDeleteOption={onDeleteOption}
                        onEditOption={onEditOption}
                    />
                );

            case QuestionType.CHECKBOX_GRID:
                return (
                    <CheckboxGridOptions
                        rows={rows}
                        options={options}
                        onAddRow={onAddRow!}
                        onDeleteRow={onDeleteRow!}
                        onAddOption={onAddOption}
                        onDeleteOption={onDeleteOption}
                        onEditOption={onEditOption}
                        onEditRow={onEditRow}
                        icon={<UncheckedCheckboxIcon width={'26px'} height={'26px'} />}
                    />
                );

            case QuestionType.MULTIPLE_CHOICE_GRID:
                return (
                    <CheckboxGridOptions
                        rows={rows}
                        options={options}
                        onAddRow={onAddRow!}
                        onDeleteRow={onDeleteRow!}
                        onAddOption={onAddOption}
                        onDeleteOption={onDeleteOption}
                        onEditOption={onEditOption}
                        onEditRow={onEditRow}
                        icon={<UncheckedRadioIcon width={'26px'} height={'26px'} />}
                    />
                )

            case QuestionType.TEXT:
                return <TextAnswerOption />;

            default:
                return null;
        }
    }, [type, options, rows, onAddOption, onDeleteOption, onAddRow, onDeleteRow]);

    return renderOptions();
}

export default QuestionOptionsRenderer