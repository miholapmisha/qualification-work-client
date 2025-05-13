import { useState, useMemo } from "react"
import Modal from "../../../components/common/Modal"
import { CategoryType, TreeCategory, Category } from "../../../types/category"
import Button from "../../../components/common/Button"
import InfoIcon from "../../../components/common/icons/InfoIcon"
import {
    flattenCategoryTree,
    getAllDescendantIds
} from "../../../util/category"
import AlertBlock from "../../../components/common/AlertBlock"
import { useSelectedAnalysisCategoriess } from "../SelectedAnalyticsCategoriesProvider"

type SurveyCategoriesModalProps = {
    isOpen: boolean
    onClose: () => void
    categories: TreeCategory[]
}

const CATEGORY_LABELS: Record<CategoryType, string> = {
    [CategoryType.FACULTY]: "Faculties",
    [CategoryType.SPECIALTY]: "Specialties",
    [CategoryType.DEGREE]: "Degrees",
    [CategoryType.YEAR]: "Years",
    [CategoryType.GROUP]: "Groups"
}

const SurveyCategoriesModal = ({ isOpen, onClose, categories }: SurveyCategoriesModalProps) => {

    const flatCategories = useMemo(() => flattenCategoryTree(categories), [categories])
    const { setSelectedAnalysisCategories, selectedAnalysisCategories } = useSelectedAnalysisCategoriess()

    const grouped = useMemo(() => {
        return Object.values(CategoryType).reduce((acc, type) => {
            acc[type] = flatCategories.filter(cat => cat.categoryType === type)
            return acc
        }, {} as Record<CategoryType, Category[]>)
    }, [flatCategories])

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(
        selectedAnalysisCategories.map(category => category._id)
    ))
    const [showAlert, setShowAlert] = useState(false)

    const isSelected = (id: string) => selectedIds.has(id)

    const handleToggle = (category: Category) => {
        const allIds = [category._id, ...getAllDescendantIds(category._id, flatCategories)]
        const next = new Set(selectedIds)
        const shouldSelect = !allIds.every(id => next.has(id))
        if (shouldSelect) {
            allIds.forEach(id => next.add(id))
        } else {
            allIds.forEach(id => next.delete(id))
        }
        setSelectedIds(next)
    }

    const handleSaveSelectedCategories = () => {

        const selectedCategories = flatCategories.filter(cat => selectedIds.has(cat._id))
        const selectedGroups = flatCategories.filter(
            cat => cat.categoryType === CategoryType.GROUP && selectedIds.has(cat._id)
        )

        if (selectedGroups.length === 0 && selectedCategories.length !== 0) {
            setShowAlert(true)
            return
        }

        setSelectedAnalysisCategories(
            selectedCategories
        )
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="min-w-[768px] w-[768px] min-h-[594px] h-full flex flex-col justify-between">
                <div>
                    <div className="space-x-4  mb-1 flex justify-between">
                        <h2 className="text-2xl font-bold text-primary-800">Select groups for analysis</h2>
                    </div>
                    <div className="flex space-x-2 my-2 items-center">
                        <InfoIcon fill="#6b7280" width={'16px'} height={'16px'} />
                        <p className="font-secondary text-primary-500">at least 1 group category should be selected</p>
                    </div>
                    <div className="space-y-6 pr-2">
                        {Object.entries(CATEGORY_LABELS).map(([type, label], idx, arr) => (
                            <div
                                key={type}
                                className={`flex space-x-4  p-4 rounded-xl bg-primary-50 shadow-sm border border-primary-200 ${idx < arr.length - 1 ? "mb-2" : ""}`}
                            >
                                <div className="flex items-center font-semibold text-primary-700 text-lg">{label}</div>
                                <div className="flex flex-wrap gap-3">
                                    {grouped[type as CategoryType]?.map(cat => (
                                        <Button
                                            key={cat._id}
                                            className={`
                                            px-4 py-2 rounded-lg border text-sm font-medium transition duration-500
                                            ${isSelected(cat._id)
                                                    ? "bg-primary-600 text-white border-primary-700 shadow"
                                                    : "bg-white border-primary-300 text-primary-800 hover:bg-primary-100 hover:border-primary-400"}
                                            focus:outline-none focus:ring-2 focus:ring-primary-400
                                        `}
                                            onClick={() => handleToggle(cat)}
                                            type="button"
                                        >
                                            {cat.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showAlert &&
                    <AlertBlock alertMessage={"Please select at least one group category before saving."} onCloseAlert={() => { setShowAlert(false) }} />
                }
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 border border-primary-300 rounded-md text-primary-700 hover:bg-primary-50"
                    >
                        Cancel
                    </button>
                    <Button onClick={handleSaveSelectedCategories}>
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default SurveyCategoriesModal