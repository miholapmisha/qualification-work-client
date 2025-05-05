import { useNavigate } from "react-router-dom";
import CopyIcon from "../../../components/common/icons/CopyIcon";
import TrashIcon from "../../../components/common/icons/TrashIcon";
import Tooltip from "../../../components/common/Tooltip";
import { Survey } from "../../../types/survey";
import { useState } from "react";
import PenIcon from "../../../components/common/icons/PenIcon";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSurvey } from "../../../services/api/surveys";
import { useAlerts } from "../../../components/alert/AlertsProvider";
import Button from "../../../components/common/Button";
import { formatDate } from "../../../util/date";


type SurveyCartProps = {
    isOwner: boolean
    survey: Survey
    onDelete?: (surveyId: string) => void
    onClickAssign: (survey: Survey) => void
}

const SurveyCard = ({ survey, isOwner, onClickAssign }: SurveyCartProps) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const queryClient = useQueryClient();
    const { addAlert } = useAlerts();
    const canModify = isOwner && survey.status === 'in_progress';

    const { mutateAsync: deleteSurveyMutation } = useMutation({
        mutationFn: (surveyId: string) => deleteSurvey(surveyId),
        onSuccess: async (response) => {
            if (response && !response.error) {
                await queryClient.invalidateQueries({ queryKey: ['surveys'] })
                addAlert({ id: crypto.randomUUID(), message: 'Survey deleted successfully', type: 'success', timeout: 2000 })
            }
        },
    })

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/surveys/edit/${survey._id}`, { state: { survey } });
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteSurveyMutation(survey._id)
        setShowDeleteModal(false);
    };

    return (
        <>
            <div
                className="border-1 border-primary-300 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col max-h-[424px] h-full"
            >
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-primary-900 font-secondary">{survey.title}</h3>

                    {isOwner &&
                        <div className="space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs ${isOwner ? 'bg-cyan-200 text-cyan-800' : 'bg-gray-100 text-gray-700'}`}>
                                Mine
                            </span>
                        </div>
                    }
                </div>
                <p className="text-primary-600 text-sm mb-4 flex-grow">{survey.description}</p>
                <div className="border-t border-primary-200 pt-4 mt-2">
                    <div className="flex justify-between items-center text-sm text-primary-500">
                        <div className="flex items-center space-x-4">
                            <span>{survey.questions.length ? survey.questions.length : 0} questions</span>

                            {survey.status === 'published' && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                                    Assigned
                                </span>
                            )}

                            <div className="flex space-x-3">
                                <Tooltip text='Use as template'>
                                    <CopyIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/surveys/create', { state: { survey } });
                                        }}
                                        width={'18px'}
                                        height={'18px'}
                                        className='cursor-pointer hover:text-cyan-600'
                                    />
                                </Tooltip>

                                {canModify && (
                                    <Tooltip text='Edit survey'>
                                        <PenIcon
                                            onClick={handleEditClick}
                                            width={'18px'}
                                            height={'18px'}
                                            className='cursor-pointer hover:text-yellow-600'
                                        />
                                    </Tooltip>
                                )}

                                {canModify && (
                                    <Tooltip text='Delete survey'>
                                        <TrashIcon
                                            onClick={handleDeleteClick}
                                            width={'18px'}
                                            height={'18px'}
                                            className='cursor-pointer hover:text-red-600'
                                        />
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                        <div className="space-x-4">
                            {isOwner && survey.status !== 'published' && (
                                <Button onClick={() => onClickAssign(survey)} classes={`hover:scale-105 transition-all hover:bg-primary-400 cursor-pointer px-3 py-1 text-xs bg-primary-300'}`}>
                                    Assign
                                </Button>
                            )}

                            <span>{formatDate(survey.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete Survey"
                message={`Are you sure you want to delete "${survey.title}"? This action cannot be undone.`}
            />}
        </>
    );
};

export default SurveyCard;