import Button from "../../../components/common/Button";
import PenIcon from "../../../components/common/icons/PenIcon";
import Loader from "../../../components/common/Loader";
import { useEditable } from "../../../hooks/useEditable";
import { TreeCategory } from "../../../types/category";
import CategoryNameInput from "./CategoryNameInput";
import { useSpecialties } from "./SpecialtyProvider";

type GroupItemProps = {
    group: TreeCategory,
    onGroupClick: (group: TreeCategory) => void
}

const GroupItem = ({ group, onGroupClick }: GroupItemProps) => {

    const { deleteCategory: deleteGroup, updateCategory: updateGroup, proceedingCategoriesIds } = useSpecialties()
    const { editInputRef: editNameInputRef, edit, setEdit } = useEditable()

    const onUpdateGroupName = (name: string) => {
        setEdit(false)
        updateGroup({ _id: group._id, data: { ...group, name } })
    }

    return (
        <div className="pl-1 rounded-xl flex items-center space-x-3 hover:bg-primary-100">
            {proceedingCategoriesIds.includes(group._id) ? (
                <div className="py-2 pl-1">
                    <Loader size={{ width: '18px', height: '18px' }} />
                </div>
            ) : (
                <div className="flex items-center justify-between w-full">
                    {edit ?
                        <CategoryNameInput editNameInputRef={editNameInputRef} category={group} onSave={(name) => onUpdateGroupName(name)} />
                        :
                        <span onClick={() => onGroupClick(group)} className="font-light text-gray-800 hover:text-primary-600 transition-colors border-b border-gray-300 hover:border-primary-400 cursor-pointer">
                            {group.name}
                        </span>}
                    <div className="flex items-center">
                        {!edit && <PenIcon onClick={() => setEdit(prevEdit => !prevEdit)} className="cursor-pointer" width={'14px'} height={'14px'} />}
                        <Button
                            className="cursor-pointer ml-4 text-sm text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded hover:bg-red-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteGroup(group._id);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GroupItem
