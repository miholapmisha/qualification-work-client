type ClearAnswerButtonProps = {
    onClear: () => void;
    label?: string;
};

const ClearAnswerButton = ({ onClear, label = "Clear answer" }: ClearAnswerButtonProps) => {
    return (
        <div className="flex justify-end mt-4">
            <button
                className="ml-auto hover:bg-primary-300 text-sm text-primary-600 rounded-2xl cursor-pointer px-4 py-2 bg-primary-200"
                onClick={onClear}
            >
                {label}
            </button>
        </div>
    );
};

export default ClearAnswerButton;