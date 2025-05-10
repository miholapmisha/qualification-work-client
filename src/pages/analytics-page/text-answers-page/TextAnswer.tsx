type TextAnswerProps = {
    answer: string,
    index: number
}

const TextAnswer = ({ answer, index }: TextAnswerProps) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow mb-2 border-1 border-l-4 border-primary-400">
            <div className="flex justify-between mb-1">
                <span className="text-xs text-primary-500 font-medium">Response {index + 1}</span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
        </div>
    );
};

export default TextAnswer