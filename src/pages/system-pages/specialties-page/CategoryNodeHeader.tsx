import { useState } from "react"
import PenIcon from "../../../components/common/icons/PenIcon"
import { CategoryType, TreeCategory } from "../../../types/category"
import { useSpecialties } from "./SpecialtyProvider"
import { useEditable } from "../../../hooks/useEditable"
import CategoryNameInput from "./CategoryNameInput"
import ConfirmationModal from "../../../components/common/ConfirmationModal"

type CategoryNodeHeader = {
    category: TreeCategory
}

const CategoryNodeHeader = ({ category }: CategoryNodeHeader) => {

    const [showHiddenOptions, setShowHiddenOptions] = useState(false)
    const { deleteCategory, updateCategory } = useSpecialties()
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

    const { editInputRef: editNameInputRef, edit, setEdit } = useEditable()

    const onUpdateSpecialtyName = (name: string) => {
        setEdit(false)
        updateCategory({ _id: category._id, data: { ...category, name } })
    }

    return (
        <>
            <div className={`w-full py-2 px-4 flex justify-between items-center `}
                onMouseEnter={() => setShowHiddenOptions(true)}
                onMouseLeave={() => setShowHiddenOptions(false)} >

                {edit ?
                    <CategoryNameInput category={category} editNameInputRef={editNameInputRef} onSave={onUpdateSpecialtyName} />
                    :
                    <span>{category.name}</span>}

                <div className="z-10 flex justify-start space-x-4 font-main" onClick={(e) => { e.stopPropagation() }}>
                    {showHiddenOptions &&
                        <div className="flex items-center space-x-4">
                            {category.categoryType === CategoryType.SPECIALTY && !edit && <PenIcon onClick={() => {
                                setEdit(prevEdit => !prevEdit)
                            }} className="hover:fill-primary-500" width={'16px'} height={'16px'} />}
                            <a className="text-red-600 hover:underline" onClick={(e) => {
                                e.stopPropagation();
                                setOpenConfirmationModal(true)
                            }}>Delete</a>
                        </div>}
                </div>
            </div>
            {openConfirmationModal &&
                <ConfirmationModal
                    message="All descendants categories, survey group assigns will be deleted, this operation cannot be undone"
                    onConfirm={() => { deleteCategory(category._id) }}
                    isOpen={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)} />}
        </>
    )
}

export default CategoryNodeHeader