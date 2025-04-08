import { ReactNode } from "react"

type AddItemButtonProps = {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
}

const AddItemButton = ({ label, icon, onClick }: AddItemButtonProps) => {
    return (
        <div className="w-full py-2 flex items-center space-x-4 text-primary-400">
            {icon}
            <span 
                onClick={onClick} 
                className="hover:border-b-1 border-primary-400 cursor-pointer"
            >
                {label}
            </span>
        </div>
    )
}

export default AddItemButton