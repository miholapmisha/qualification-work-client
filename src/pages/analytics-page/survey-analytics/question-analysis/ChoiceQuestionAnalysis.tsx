import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell, PieChart, Pie, Legend } from "recharts";
import ResponseStats from "../ResponseStats";
import { OptionAnalisysData } from "../../../../types/analytics";
import { truncate } from "../../../../util";

type ChoiceQuestionAnalysisProps = {
    title: string,
    answered: number,
    unanswered: number,
    totalResponses: number
    optionData: OptionAnalisysData[]
}

const ChoiceQuestionAnalysis = ({
    title,
    answered,
    unanswered,
    totalResponses,
    optionData
}: ChoiceQuestionAnalysisProps) => {
    return (
        <div className="bg-white p-6 rounded-lg border-black border-1">
            <h3 className="text-lg font-semibold mb-4">{truncate(title, 48)}{title.length > 48 && (
                <span className="ml-2 text-xs text-gray-400" title={title}>[full]</span>
            )} Analysis</h3>

            <ResponseStats
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart with better text handling */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={optionData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                        >
                            <XAxis type="number" />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={110}
                                tick={({ x, y, payload }) => (
                                    <g transform={`translate(${x},${y})`}>
                                        <title>{payload.value}</title>
                                        <text
                                            x={0}
                                            y={0}
                                            dy={4}
                                            textAnchor="end"
                                            fontSize={11}
                                            fill="#374151"
                                        >
                                            {truncate(payload.value, 16)}
                                        </text>
                                    </g>
                                )}
                            />
                            <Tooltip
                                wrapperStyle={{ maxWidth: '300px' }}
                                formatter={(value, _, props) => {
                                    const item = props.payload;
                                    return [
                                        `${value} responses (${item.percentage?.toFixed(1) ?? 0}%)`,
                                        <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.name}</span>
                                    ];
                                }}
                                labelFormatter={() => ''}
                            />
                            <Bar dataKey="count" name="Responses">
                                {optionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart with better tooltip and legend */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <Pie
                                data={optionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="count"
                                nameKey="name"
                                label={({ percentage }) => `${percentage.toFixed(1)}%`}
                            >
                                {optionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                                wrapperStyle={{ fontSize: '11px', maxHeight: '100%', overflowY: 'auto' }}
                                formatter={(value) => (
                                    <span title={value} style={{ color: '#374151' }}>
                                        {truncate(value, 12)}
                                    </span>
                                )}
                            />
                            <Tooltip
                                wrapperStyle={{ maxWidth: '300px' }}
                                formatter={(value, _, props) => {
                                    const item = props.payload;
                                    return [
                                        `${value} (${item.percentage?.toFixed(1) ?? 0}%)`,
                                        <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.name}</span>
                                    ];
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ChoiceQuestionAnalysis;