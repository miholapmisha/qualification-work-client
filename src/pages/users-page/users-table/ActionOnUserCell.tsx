import Button from "../../../components/ui/Button"
import PenIcon from "../../../components/ui/icons/PenIcon"
import TrashIcon from "../../../components/ui/icons/TrashIcon"

type ActionOnUserCellProps = {
    onEditClick: () => void
    onDeleteClick: () => void
}

const ActionOnUserCell = ({ onEditClick, onDeleteClick }: ActionOnUserCellProps) => {

    return (
        <div className="flex space-x-2 text-white text-xs">
            <Button onClick={onEditClick} classes="flex items-center space-x-2">
                <PenIcon width={'10px'} height={'10px'} fill={"white"} />
                <span>Edit</span>
            </Button>
            <Button onClick={onDeleteClick} classes="flex items-center space-x-2">
                <TrashIcon width={'10px'} height={'10px'} fill={"white"} />
                <span>Delete</span>
            </Button>
        </div>
    )
}

export default ActionOnUserCell