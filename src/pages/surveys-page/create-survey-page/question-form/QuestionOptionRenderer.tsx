import { useCallback } from "react";
import { Option, QuestionType } from "../../../../types/survey";
import { TextAnswerOption } from "./TextAnswerOption";
import MultipleChoiceOptions from "./MultipleChoiceOptions";
import CheckboxGridOptions from "./CheckboxGridOptions";
import SingleChoiceOptions from "./SingleChoiceOptions";

type QuestionOptionsRendererProps = {
    type: QuestionType;
    options: Option[];
    rows?: Option[];
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
    onAddRow?: () => void;
    onDeleteRow?: (id: string) => void;
}

const QuestionOptionsRenderer = ({
    type,
    options,
    rows = [],
    onAddOption,
    onDeleteOption,
    onAddRow,
    onDeleteRow
}: QuestionOptionsRendererProps) => {

    const renderOptions = useCallback(() => {
        switch (type) {
            case QuestionType.SINGLE_CHOICE:
                return (
                    <SingleChoiceOptions
                        options={options}
                        onAddOption={onAddOption}
                        onDeleteOption={onDeleteOption}
                    />
                );

            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <MultipleChoiceOptions
                        options={options}
                        onAddOption={onAddOption}
                        onDeleteOption={onDeleteOption}
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
                    />
                );

            case QuestionType.TEXT:
                return <TextAnswerOption />;

            default:
                return null;
        }
    }, [type, options, rows, onAddOption, onDeleteOption, onAddRow, onDeleteRow]);

    return renderOptions();
}

export default QuestionOptionsRenderer