import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import ResponseStats from "../ResponseStats";
import { COLORS } from "../../../../types/analytics";

type GridQuestionAnalysisProps = {
    title: string,
    answered: number,
    unanswered: number,
    totalResponses: number,
    mostSelectedColumn?: { _id: string; selectedCount: number },
    rowData: { rowName: string }[],
    optionNames: string[],
    optionsMap: Record<string, string>
}

const GridQuestionAnalysis = ({
    title,
    answered,
    unanswered,
    totalResponses,
    mostSelectedColumn,
    rowData,
    optionNames,
    optionsMap
}: GridQuestionAnalysisProps) => {
    return (
        <div className="bg-white p-6 rounded-lg border-black border-1">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>

            <ResponseStats
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
            />

            {mostSelectedColumn && (
                <div className="bg-primary-50 p-4 rounded-md mb-4">
                    <p className="font-medium">Most Selected Column: <span className="text-primary-700">
                        {optionsMap[mostSelectedColumn._id] || 'Unknown'}
                        ({mostSelectedColumn.selectedCount} selections)
                    </span></p>
                </div>
            )}

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rowData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                        <XAxis dataKey="rowName" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {optionNames.map((option, index) => (
                            <Bar
                                key={option}
                                dataKey={option}
                                name={option}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GridQuestionAnalysis