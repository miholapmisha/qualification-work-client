import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import ResponseStats from "../ResponseStats";
import { COLORS } from "../../../../types/analytics";
import { truncate } from "../../../../util";

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
            <h3 className="text-lg font-semibold mb-4">
                {truncate(title, 48)}
                {title.length > 48 && (
                    <span className="ml-2 text-xs text-gray-400" title={title}>[full]</span>
                )}
            </h3>

            <ResponseStats
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
            />

            {mostSelectedColumn && (
                <div className="bg-primary-50 p-4 rounded-md mb-4">
                    <p className="font-medium">
                        Most Selected Column:{" "}
                        <span className="text-primary-700" title={optionsMap[mostSelectedColumn._id] || 'Unknown'}>
                            {truncate(optionsMap[mostSelectedColumn._id] || 'Unknown', 32)}
                            {" "}({mostSelectedColumn.selectedCount} selections)
                        </span>
                    </p>
                </div>
            )}

            {/* Enhanced bar chart for grid data */}
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                        data={rowData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                        barGap={2}
                        barSize={optionNames.length > 3 ? 15 : 25}
                    >
                        <XAxis
                            dataKey="rowName"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            tick={({ x, y, payload }) => (
                                <g transform={`translate(${x},${y})`}>
                                    <title>{payload.value}</title>
                                    <text
                                        x={0}
                                        y={0}
                                        dy={16}
                                        fontSize={11}
                                        fill="#374151"
                                        textAnchor="end"
                                    >
                                        {truncate(payload.value, 20)}
                                    </text>
                                </g>
                            )}
                        />
                        <YAxis />
                        <Tooltip
                            wrapperStyle={{ maxWidth: '500px' }}
                            formatter={(value, name) => [
                                value, 
                                name.toString().length >= 60 ? truncate(name.toString(), 60) : name
                            ]}
                            labelFormatter={label => (
                                <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    Row: {label}
                                </span>
                            )}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ 
                                paddingTop: '20px', 
                                fontSize: '11px',
                                maxHeight: '80px',
                                overflowY: 'auto',
                                width: '100%'
                            }}
                            formatter={(value) => {
                                return (
                                    <span title={value} style={{ color: '#374151' }}>
                                        {truncate(value, 15)}
                                    </span>
                                );
                            }}
                        />
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

export default GridQuestionAnalysis;