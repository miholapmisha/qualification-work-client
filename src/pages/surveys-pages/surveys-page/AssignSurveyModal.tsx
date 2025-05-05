import { useEffect, useState } from 'react'
import Modal from '../../../components/common/Modal'
import { buildCategoryTree, getAllDescendantIds } from '../../../util/category'
import { useCategory } from '../../../hooks/useCategory'
import AssignCategoryNode from './AssignCategoryNode'
import { CategoryType, TreeCategory } from '../../../types/category'
import Button from '../../../components/common/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesAssignSurvey } from '../../../services/api/surveys'
import { Survey } from '../../../types/survey'
import { useAlerts } from '../../../components/alert/AlertsProvider'
import Loader from '../../../components/common/Loader'
import { defaultPathSeparator } from '../../system-pages/common'

type TabType = 'categories' | 'users' | 'exclusions'

type AssignSurveyModalProps = {
    isOpen: boolean
    onClose: () => void
    surveyToAssign: Survey
}

const AssignSurveyModal = ({
    isOpen,
    onClose,
    surveyToAssign
}: AssignSurveyModalProps) => {

    const [activeTab, setActiveTab] = useState<TabType>('categories')
    const { categories, fetchingCategories } = useCategory({ fetchParams: {}, queryKey: ['categories', 'assign'] })
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
        onSettled: (response) => {
            if (response && !response.error) {
                addAlert({ id: crypto.randomUUID(), type: 'success', message: "Surveys successfully assigned to students" })
                queryClient.invalidateQueries({ queryKey: ['survey'] })
            }
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
        // const groupCategories = categories
        //     ?.filter((category) => assignCategoriesIds.includes(category._id) && category.categoryType === CategoryType.GROUP) || []

        // // const groupCategories = as?.filter(category =>
        // //     category.categoryType === CategoryType.GROUP
        // // ) || [];

        // console.log("Group categories: ", groupCategories)

        // // Get all the paths of group categories to identify valid ancestor categories
        // const groupPaths = groupCategories.map(group => group.path);

        // const ancestorIds = new Set<string>();
        // groupPaths.forEach(path => {
        //     if (path) {
        //         const pathParts = path.split(defaultPathSeparator);
        //         pathParts.forEach(id => ancestorIds.add(id));
        //     }
        // });

        // // Add the group IDs themselves
        // groupCategories.forEach(group => ancestorIds.add(group._id));

        // // Filter the selected category IDs to only include valid ones
        // // (those that are either groups or ancestors of groups)
        // const validSelectedCategoryIds = assignCategoriesIds.filter(id =>
        //     ancestorIds.has(id)
        // );

        // console.log("Result: ", validSelectedCategoryIds)

        // if (groupsIds && groupsIds.length > 0) {
        //     groupAssignMutation({ groupsIds, survey: surveyToAssign })
        // } else {
        //     addAlert({ id: crypto.randomUUID(), type: 'warning', message: "There is no groups under selected categories" })
        // }

        // onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="min-w-[768px] w-[768px] h-[564px]">
                <div className="p-6">

                    <div className="mb-6 flex flex-col">
                        <h2 className="text-xl text-primary-800 mb-4">Assign <span className='font-semibold'> {surveyToAssign.title} </span></h2>

                        <div className="flex border-b border-primary-200">
                            <button
                                className={`flex items-center cursor-pointer py-2 px-4 font-medium text-sm -mb-px ${activeTab === "categories"
                                    ? "border-b-2 text-cyan-600 border-cyan-600"
                                    : "text-primary-500 hover:text-primary-700"
                                    }`}
                                onClick={() => setActiveTab("categories")}
                            >
                                Categories


                            </button>
                            <button
                                className={`cursor-pointer py-2 px-4 font-medium text-sm -mb-px ${activeTab === "users"
                                    ? "border-b-2 text-cyan-600 border-cyan-600"
                                    : " hover:text-primary-700"
                                    }`}
                                onClick={() => setActiveTab("users")}
                            >
                                Users
                            </button>
                            <button
                                className={`cursor-pointer py-2 px-4 font-medium text-sm -mb-px ${activeTab === "exclusions"
                                    ? "border-b-2 text-cyan-600 border-cyan-600"
                                    : " hover:text-primary-700"
                                    }`}
                                onClick={() => setActiveTab("exclusions")}
                            >
                                Exclusions
                            </button>
                        </div>
                        {activeTab === "categories" && (
                            <div className={`${fetchingCategories && 'flex items-center justify-center'} space-y-1 overflow-auto h-[360px]`}>
                                {fetchingCategories &&
                                    <div className='w-fit h-fit'>
                                        <Loader classes='w-fit h-fit m-auto' size={{ width: '54px', height: '54px' }} />
                                    </div>}
                                {categoryTree && categoryTree?.length > 0 && categoryTree.map((category) =>
                                    <AssignCategoryNode assignedCategoriesIds={assignCategoriesIds} handleAssign={handleAssignCategory} category={category} key={category._id} initial={true} />)}
                            </div>
                        )}

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