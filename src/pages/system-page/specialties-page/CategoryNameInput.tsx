import { RefObject } from "react"
import Button from "../../../components/ui/Button"
import { TreeCategory } from "../../../types/category"

type CategoryNameInputProps = {
    editNameInputRef: RefObject<HTMLInputElement | null>,
    category: TreeCategory,
    onSave: (name: string) => void
}

const CategoryNameInput = ({ editNameInputRef, category, onSave }: CategoryNameInputProps) => {
    
    return (
        <div className="w-full max-w-1/2 flex space-x-6">
            <input ref={editNameInputRef} defaultValue={category.name} className="flex-auto outline-none border-b-1">
            </input>
            <Button
                className="hover:bg-black hover:text-white cursor-pointer px-4 bg-primary-50 border border-primary-300 rounded text-primary-600 transition-colors ease-in-out duration-300"
                onClick={(e) => {
                    e.stopPropagation()
                    if (editNameInputRef.current) {
                        onSave(editNameInputRef.current.value)
                    }
                }}
            >
                Save
            </Button>
        </div>
    )
}

export default CategoryNameInput