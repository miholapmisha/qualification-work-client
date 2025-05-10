import { useEffect, useState } from 'react'
import Modal from '../../../components/common/Modal'
import { buildCategoryTree, getAllDescendantIds } from '../../../util/category'
import AssignCategoryNode from './AssignCategoryNode'
import { TreeCategory } from '../../../types/category'
import Button from '../../../components/common/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoriesAssignSurvey } from '../../../services/api/surveys'
import { Survey } from '../../../types/survey'
import { useAlerts } from '../../../components/alert/AlertsProvider'
import Loader from '../../../components/common/Loader'
import InfoIcon from '../../../components/common/icons/InfoIcon'
import Tooltip from '../../../components/common/Tooltip'
import { getGroupCategoriesTree } from '../../../services/api/category'
import { useProceedingIds } from '../../../hooks/useProcessingIds'

type AssignSurveyModalProps = {
    isOpen: boolean
    onClose: () => void
    surveyToAssign: Survey
}

export const SURVEY_ASSIGN_CACHE_KEY = 'surveyAssignCacheKey'

const AssignSurveyModal = ({
    isOpen,
    onClose,
    surveyToAssign
}: AssignSurveyModalProps) => {

    const { data: categoriesResponse, isLoading: fetchingCategories } = useQuery({
        queryKey: ['categories', 'assign'],
        queryFn: () => getGroupCategoriesTree()
    })
    const { setProceedingIds } = useProceedingIds({ queryKey: [SURVEY_ASSIGN_CACHE_KEY] })
    const categories = categoriesResponse?.data?.payload

    const [assignCategoriesIds, setAssignCategoriesIds] = useState<string[]>([])
    const { addAlert } = useAlerts()
    const [categoryTree, setCategoryTree] = useState<TreeCategory[]>([]);
    const queryClient = useQueryClient()

    useEffect(() => {
        if (categories && categories?.length > 0) {
            setCategoryTree(buildCategoryTree(categories));
        }
    }, [categories]);

    const { mutateAsync: groupAssignMutation } = useMutation({
        mutationFn: async ({ survey, assignCategoriesIds }: { survey: Survey; assignCategoriesIds: string[] }) => categoriesAssignSurvey(survey, assignCategoriesIds),
        onMutate: async (context) => {
            setProceedingIds((prev) => [...prev, context.survey._id])   
        },
        onSettled: async (response, _, context) => {
            if (response && !response.error) {
                addAlert({ id: crypto.randomUUID(), type: 'success', message: "Surveys successfully assigned to students" })
                await queryClient.refetchQueries({ queryKey: ['surveys'] })
            }
            setProceedingIds((prev) => prev.filter(id => id !== context.survey._id))
        }
    })

    const handleAssignCategory = (categoryId: string) => {
        setAssignCategoriesIds((prev) => {
            const data = categories ? categories : []
            if (prev.includes(categoryId)) {
                const descendantIds = getAllDescendantIds(categoryId, data);
                return prev.filter((id) => id !== categoryId && !descendantIds.includes(id));
            } else {

                const descendantIds = getAllDescendantIds(categoryId, data);
                return [...new Set([...prev, categoryId, ...descendantIds])];
            }
        });
    };

    const handleSurveyAssign = () => {
        groupAssignMutation({ assignCategoriesIds, survey: surveyToAssign })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="min-w-[768px] w-[768px] h-[564px]">
                <div className="p-6">

                    <div className="mb-6 flex flex-col">
                        <div className="text-xl text-primary-800 mb-4 flex items-center space-x-2">
                            <span>
                                Assign <span className='font-semibold underline'>{surveyToAssign.title}</span>
                            </span>
                            <Tooltip position='right' text='this categories will be used in survey analytics'>
                                <InfoIcon />
                            </Tooltip>
                        </div>
                        <div className={`${fetchingCategories && 'flex items-center justify-center'} space-y-1 overflow-auto h-[360px]`}>
                            {fetchingCategories &&
                                <div className='w-fit h-fit'>
                                    <Loader classes='w-fit h-fit m-auto' size={{ width: '54px', height: '54px' }} />
                                </div>}
                            {categoryTree && categoryTree?.length > 0 && categoryTree.map((category) =>
                                <AssignCategoryNode assignedCategoriesIds={assignCategoriesIds} handleAssign={handleAssignCategory} category={category} key={category._id} initial={true} />)}
                        </div>

                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 border border-primary-300 rounded-md text-primary-700 hover:bg-primary-50"
                    >
                        Cancel
                    </button>
                    <Button onClick={() => {
                        handleSurveyAssign()
                    }}>
                        Save Changes
                    </Button>
                </div>
            </div>

        </Modal>
    )
}

export default AssignSurveyModal;