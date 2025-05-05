import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { Assign } from "../../types/assign";
import { formatDate } from "../../util/date";

type AssignCardProps = {
    assign: Assign
}

const AssignCard = ({ assign }: AssignCardProps) => {

    const navigate = useNavigate()
    const survey = assign.survey

    return (
        <div
            className="border-1 border-primary-300 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col max-h-[224px]"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-primary-900 font-secondary">{survey.title}</h3>
            </div>
            <p className="text-primary-600 text-sm mb-4 flex-grow">{survey.description}</p>
            <div className="border-t border-primary-200 pt-4 mt-2 space-y-4">
                <div className="flex justify-between items-center text-sm text-primary-500">
                    <div className="flex items-center space-x-4">
                        <span>{survey.questions.length ? survey.questions.length : 0} questions</span>

                        {survey.status === 'published' && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                                Assigned
                            </span>
                        )}
                    </div>
                    <div className="space-x-4">
                        <span>Assigned at {formatDate(assign.assignedAt)}</span>
                    </div>
                </div>
                <Button classes="w-full" onClick={() => navigate(`/surveys/take/${assign.survey._id}`, { state: { survey: assign.survey } })}>Start survey</Button>
            </div>
        </div>
    )
}

export default AssignCard