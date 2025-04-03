import PenIcon from "../../../components/common/icons/PenIcon"
import TrashIcon from "../../../components/common/icons/TrashIcon"

type ActionOnUserCellProps = {
    onEditClick: () => void
    onDeleteClick: () => void
}

const ActionOnUserCell = ({ onEditClick, onDeleteClick }: ActionOnUserCellProps) => {

    return (
        <div className="flex space-x-2 text-xs">
            <button onClick={onEditClick} className="transition-color ease-in-out duration-300 hover:bg-primary-900 hover:text-white cursor-pointer rounded-full px-4 py-1 border-1 flex items-center space-x-2">
                <PenIcon fill="currentColor" width={'10px'} height={'10px'} />
                <span>Edit</span>
            </button>
            <button onClick={onDeleteClick} className="transition-color ease-in-out duration-300 hover:bg-primary-900 hover:text-white cursor-pointer rounded-full px-4 py-1 border-1 flex items-center space-x-2">
                <TrashIcon fill="currentColor" width={'10px'} height={'10px'} />
                <span>Delete</span>
            </button>
        </div>
    )
}

export default ActionOnUserCell