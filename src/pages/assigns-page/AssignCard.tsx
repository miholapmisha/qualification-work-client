import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { Assign } from "../../types/assign";
import { formatDate } from "../../util";

type AssignCardProps = {
    assign: Assign
}

const AssignCard = ({ assign }: AssignCardProps) => {
    const navigate = useNavigate()
    const survey = assign.survey

    const isCompleted = assign.answers !== undefined && assign.answers >= 0

    return (
        <div
            className={`border-1 ${isCompleted ? 'border-gray-300' : 'border-primary-300'} 
                        ${isCompleted ? 'bg-gray-50' : 'bg-white'} 
                        rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col max-h-[324px]
                        ${isCompleted ? 'opacity-75' : ''}`}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-bold ${isCompleted ? 'text-gray-700' : 'text-primary-900'} font-secondary`}>{survey.title}</h3>
            </div>
            <p className={`${isCompleted ? 'text-gray-500' : 'text-primary-600'} text-sm mb-4 flex-grow truncate`}>{survey.description}</p>
            <div className={`border-t ${isCompleted ? 'border-gray-200' : 'border-primary-200'} pt-4 mt-2 space-y-4`}>

                <div className={`flex justify-between items-center text-sm ${isCompleted ? 'text-gray-500' : 'text-primary-500'}`}>
                    <div className="flex items-center space-x-4">
                        <span>{survey.questions.length ? survey.questions.length : 0} questions</span>

                        {survey.status === 'published' && !isCompleted && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                                Assigned
                            </span>
                        )}
                    </div>

                    <div className="space-x-4">
                        <span>Assigned at {formatDate(assign.assignedAt)}</span>
                    </div>
                </div>

                {isCompleted ? (
                    <div className="flex justify-between items-center">
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs">
                            Completed
                        </span>
                    </div>
                ) : (
                    <Button
                        classes="w-full"
                        onClick={() => navigate(`/surveys/take/${assign.survey._id}`, { state: { survey: assign.survey } })}>
                        Take a survey
                    </Button>
                )}
            </div>
        </div>
    )
}

export default AssignCard