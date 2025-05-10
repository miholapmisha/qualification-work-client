type ResponseStatsProps = {
    answered: number,
    unanswered: number,
    totalResponses: number
}

const ResponseStats = ({ answered, unanswered, totalResponses }: ResponseStatsProps) => {
    const responseRate = totalResponses > 0 ? (answered / totalResponses) * 100 : 0;

    return (
        <div className="flex justify-between text-center mb-4">
            <div className="bg-primary-100 rounded-lg p-4 flex-1 mr-2">
                <p className="text-2xl font-bold text-primary-700">{answered}</p>
                <p className="text-sm text-primary-600">Responses</p>
            </div>
            <div className="bg-primary-100 rounded-lg p-4 flex-1 ml-2">
                <p className="text-2xl font-bold text-primary-700">{responseRate.toFixed(1)}%</p>
                <p className="text-sm text-primary-600">Response Rate</p>
            </div>
        </div>
    );
};

export default ResponseStats