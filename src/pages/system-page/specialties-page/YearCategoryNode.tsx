import { useRef, useState } from "react"
import { Category, CategoryType, TreeCategory } from "../../../types/category"
import Button from "../../../components/ui/Button"
import Loader from "../../../components/ui/Loader"
import { defaultPathSeparator } from "../common"

type YearCategoryNodeProps = {
    yearCategory: TreeCategory,
    createCategory: any
}

const mock: TreeCategory[] = [
    { _id: crypto.randomUUID(), name: "Group SE-201", categoryType: CategoryType.GROUP, children: [], path: '' },
    { _id: crypto.randomUUID(), name: "Group SE-202", categoryType: CategoryType.GROUP, children: [], path: '' },
]

const YearCategoryNode = ({ yearCategory, createCategory }: YearCategoryNodeProps) => {

    const [showGroupNameInput, setShowGroupNameInput] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const groupNameInputRef = useRef<HTMLInputElement>(null)

    const groups = yearCategory.children

    const handleSaveGroup = async (name: string) => {
        setShowLoader(true);
        setShowGroupNameInput(false)

        const group: Category = {
            _id: crypto.randomUUID(),
            categoryType: CategoryType.GROUP,
            name,
            path: yearCategory.path + defaultPathSeparator + yearCategory._id
        }

        await createCategory([group])
        setShowLoader(false);
    }

    return (
        <div className="py-4 pl-10 pr-4 space-y-5 border-primary-300 rounded-l-2xl border-y-1 border-l-1 border-dashed flex flex-col bg-gray-50 shadow-inner">
            {groups.length > 0 &&
                <div className="space-y-3">
                    {groups.map((group, index) => (
                        <div key={index} className="cursor-pointer font-light text-gray-800 hover:text-primary-600 transition-colors">
                            <span className="border-b border-gray-300 hover:border-primary-400 pb-1">{group.name}</span>
                            {<a className="text-red-600 hover:underline" onClick={(e) => { e.stopPropagation(); console.log("delete") }}>Delete</a>}
                        </div>
                    ))}
                </div>
            }


            {showLoader && (
                <div className="flex justify-center">
                    <Loader size={{ width: '28px', height: '28px' }} />
                </div>
            )}

            {showGroupNameInput && (
                <div className="flex flex-row space-x-3 space-y-3 max-w-[420px] items-start">
                    <input
                        ref={groupNameInputRef}
                        placeholder="Enter group name here..."
                        className="w-full transition-all ease-in-out duration-300 outline-none border-b-1 border-primary-300 focus:border-black bg-transparent"
                        autoFocus
                    />
                    <div className="flex space-x-3">
                        <Button
                            className="cursor-pointer px-4 bg-primary-50 border border-primary-300 rounded text-primary-600 hover:bg-primary-100 transition-colors"
                            onClick={() => {
                                if (groupNameInputRef.current) {
                                    handleSaveGroup(groupNameInputRef.current.value)
                                }
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            className="cursor-pointer px-4 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowGroupNameInput(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {!showGroupNameInput && !showLoader && (
                <div className="flex-auto">
                    <span
                        onClick={() => { setShowGroupNameInput(true) }}
                        className="inline-flex items-center text-cyan-600 hover:text-cyan-800 cursor-pointer transition-colors"
                    >
                        + Add group
                    </span>
                </div>
            )}
        </div>
    );
}

export default YearCategoryNode