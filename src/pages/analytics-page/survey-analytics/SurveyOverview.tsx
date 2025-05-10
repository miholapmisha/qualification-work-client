import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Survey } from "../../../types/survey";

type SurveyOverviewProps = {
    survey: Survey,
    completed: number,
    uncompleted: number
}

const SurveyOverview = ({ survey, completed, uncompleted }: SurveyOverviewProps) => {
    const totalResponses = completed + uncompleted;
    const completionRate = totalResponses > 0 ? (completed / totalResponses) * 100 : 0;

    const completionData = [
        { name: 'Completed', value: completed },
        { name: 'Uncompleted', value: uncompleted },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h1 className="text-2xl font-bold mb-2 text-primary-800 font-secondary">{survey.title}</h1>
            {survey.description && <p className="text-gray-600 mb-4">{survey.description}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary-100 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-primary-700">{totalResponses}</p>
                    <p className="text-sm text-primary-600">Total Assigns</p>
                </div>
                <div className="bg-primary-100 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-primary-700">{completed}</p>
                    <p className="text-sm text-primary-600">Completed Surveys</p>
                </div>
                <div className="bg-primary-100 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-primary-700">{completionRate.toFixed(1)}%</p>
                    <p className="text-sm text-primary-600">Completion Rate</p>
                </div>
            </div>

            <div className="h-64 pb-4">
                <h2 className="text-xl font-semibold">Survey Completion</h2>
                <ResponsiveContainer >
                    <PieChart>
                        <Pie
                            data={completionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, __, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        >
                            <Cell fill="#4ade80" />
                            <Cell fill="#f87171" />
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SurveyOverview