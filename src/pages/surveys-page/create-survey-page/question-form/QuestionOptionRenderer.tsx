import { useCallback } from "react";
import { Option, QuestionType } from "../../../../types/survey";
import { TextAnswerOption } from "./TextAnswerOption";
import MultipleChoiceOptions from "./MultipleChoiceOptions";
import CheckboxGridOptions from "./CheckboxGridOptions";
import SingleChoiceOptions from "./SingleChoiceOptions";
import SquareOptionIcon from "../../../../components/common/icons/SquareOptionIcon";
import CircleOptionIcon from "../../../../components/common/icons/CircleOptionIcon";

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
                        icon={<SquareOptionIcon width={'26px'} height={'26px'} />}
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
                        icon={<CircleOptionIcon width={'26px'} height={'26px'} />}
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