import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell, PieChart, Pie, Legend } from "recharts";
import ResponseStats from "../ResponseStats";
import { OptionAnalisysData } from "../../../../types/analytics";

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
            <h3 className="text-lg font-semibold mb-4">{title} Analysis</h3>

            <ResponseStats
                answered={answered}
                unanswered={unanswered}
                totalResponses={totalResponses}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={optionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                            <Tooltip
                                formatter={(value, _) => [`${value} responses`, 'Count']}
                                labelFormatter={(value) => `Option: ${value}`}
                            />
                            <Bar dataKey="count" name="Responses">
                                {optionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={optionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                                nameKey="name"
                                label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                            >
                                {optionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip
                                formatter={(value, _, props) => {
                                    const item = props.payload;
                                    return [`${value} (${item.percentage.toFixed(1)}%)`, 'Responses'];
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ChoiceQuestionAnalysis