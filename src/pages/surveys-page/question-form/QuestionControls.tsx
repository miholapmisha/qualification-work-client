import CopyIcon from "../../../components/common/icons/CopyIcon";
import TrashIcon from "../../../components/common/icons/TrashIcon";
import Switch from "../../../components/common/Switch";

type QuestionControlsProps = {
    required: boolean;
    onRequiredChange: (value: boolean) => void;
    onCopy?: () => void;
    onDelete?: () => void;
}

const QuestionControls = ({ required, onRequiredChange, onCopy, onDelete }: QuestionControlsProps) => {
    return (
        <div className="flex justify-end border-t-1 border-primary-300 pt-2 space-x-4 px-4">
            <div className="flex space-x-2">
                <span className="font-secondary">Required</span>
                <Switch 
                    switchOn={required} 
                    onChangeSwitchState={onRequiredChange} 
                />
            </div>
            <CopyIcon className="cursor-pointer" onClick={onCopy} />
            <TrashIcon className="cursor-pointer" onClick={onDelete} />
        </div>
    )
}

export default QuestionControls